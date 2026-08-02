import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Moon,
  Sun,
  Globe,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  PackageCheck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    currentView,
    setCurrentView,
    cart,
    wishlist,
    setIsCartOpen,
    user,
    logout,
    setIsAuthModalOpen,
    searchQuery,
    setSearchQuery,
    products,
    categories,
    selectedCategorySlug,
    setSelectedCategorySlug,
    setSelectedProductId,
    setIsAiDrawerOpen,
    settings,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Filter products for predictive search dropdown
  const filteredSearchProducts = searchQuery.trim()
    ? products
        .filter((p) => {
          const q = searchQuery.toLowerCase();
          const title = (language === 'ar' ? p.titleAr : language === 'fr' ? (p.titleFr || p.titleEn) : p.titleEn).toLowerCase();
          const desc = (language === 'ar' ? p.descriptionAr : language === 'fr' ? (p.descriptionFr || p.descriptionEn) : p.descriptionEn).toLowerCase();
          const tagMatch = p.tags.some((t) => t.toLowerCase().includes(q));
          return title.includes(q) || desc.includes(q) || tagMatch || p.sku.toLowerCase().includes(q);
        })
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSearchProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-100 dark:bg-slate-950 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full text-[11px] font-medium border border-amber-500/30">
              <Sparkles className="w-3 h-3" />
              {language === 'ar' ? 'تشكيلة 2026 الحصرية' : 'Exclusive 2026 Collection'}
            </span>
            <span className="hidden sm:inline text-slate-300">
              {language === 'ar'
                ? 'توصيل مجاني داخل الرباط، تمارة وسلا — وخارجها 20 د.م.'
                : 'Free delivery in Rabat, Temara & Salé — 20 MAD outside these cities'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => {
                setCurrentView('track-order');
                setIsMobileMenuOpen(false);
              }}
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تتبع طلبك' : 'Track Order'}</span>
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 font-medium hover:text-amber-400 transition-colors py-1 px-2 rounded-md hover:bg-slate-800/60"
                title="Select Language / اختر اللغة"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {language === 'ar' && '🇲🇦 العربية'}
                  {language === 'fr' && '🇫🇷 Français'}
                  {language === 'en' && '🇬🇧 English'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 ltr:left-0 top-full mt-1.5 w-36 bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden z-50 text-xs py-1"
                  >
                    <button
                      onClick={() => {
                        setLanguage('ar');
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-right hover:bg-slate-800 transition-colors ${
                        language === 'ar' ? 'text-amber-400 font-bold bg-slate-800/50' : 'text-slate-200'
                      }`}
                    >
                      <span className="text-base">🇲🇦</span>
                      <span>العربية</span>
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('fr');
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-800 transition-colors ${
                        language === 'fr' ? 'text-amber-400 font-bold bg-slate-800/50' : 'text-slate-200'
                      }`}
                    >
                      <span className="text-base">🇫🇷</span>
                      <span>Français</span>
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-800 transition-colors ${
                        language === 'en' ? 'text-amber-400 font-bold bg-slate-800/50' : 'text-slate-200'
                      }`}
                    >
                      <span className="text-base">🇬🇧</span>
                      <span>English</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1 hover:text-amber-400 transition-colors rounded-full"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
       {/* Brand Logo */}
<div className="flex items-center min-w-[320px]">
  <button
    onClick={() => {
      setCurrentView('home');
      setSelectedCategorySlug(null);
    }}
    className="group flex items-center"
    aria-label="ALMA STORE - Home"
  >
    {/* TEST LOGO REMOVED */}
  </button>
</div>

{/* Desktop Categories Links */}
<nav className="hidden lg:flex items-center gap-8 text-sm font-medium flex-1">
            <button
              onClick={() => {
                setCurrentView('home');
                setSelectedCategorySlug(null);
              }}
              className={`hover:text-indigo-600 dark:hover:text-amber-400 transition-colors ${
                currentView === 'home' ? 'text-indigo-600 dark:text-amber-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </button>

            <button
              onClick={() => {
                setCurrentView('products');
                setSelectedCategorySlug(null);
              }}
              className={`hover:text-indigo-600 dark:hover:text-amber-400 transition-colors ${
                currentView === 'products' && !selectedCategorySlug
                  ? 'text-indigo-600 dark:text-amber-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {language === 'ar' ? 'جميع المنتجات' : 'All Products'}
            </button>

            {/* Categories dropdown menu */}
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategorySlug(cat.slug);
                  setCurrentView('products');
                }}
                className={`hover:text-indigo-600 dark:hover:text-amber-400 transition-colors ${
                  selectedCategorySlug === cat.slug ? 'text-indigo-600 dark:text-amber-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {language === 'ar' ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </nav>
        </div>

        {/* Instant Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-xs sm:max-w-md hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              placeholder={language === 'ar' ? 'ابحث عن حامل هاتف، ساعة، أساور، محولات...' : 'Search car holders, watches, bracelets, adapters...'}
              className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute top-3 left-3 rtl:left-auto rtl:right-3 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-2.5 right-3 rtl:right-auto rtl:left-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Dropdown Modal */}
          <AnimatePresence>
            {isSearchFocused && searchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
              >
                <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>{language === 'ar' ? 'نتائج البحث المقترحة' : 'Suggested Products'}</span>
                  <span>{filteredSearchProducts.length} {language === 'ar' ? 'منتج' : 'items'}</span>
                </div>

                {filteredSearchProducts.length > 0 ? (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
                    {filteredSearchProducts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectSearchProduct(p.id)}
                        className="w-full p-2.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-colors text-left rtl:text-right"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.titleEn}
                          className="w-12 h-12 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {language === 'ar' ? p.titleAr : p.titleEn}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            <span className="font-bold text-amber-600 dark:text-amber-400">
                              {p.price} {language === 'ar' ? settings.currencySymbolAr : settings.currencySymbolEn}
                            </span>
                            {p.originalPrice && (
                              <span className="line-through text-slate-400">
                                {p.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                    {language === 'ar' ? 'لم يتم العثور على منتجات مطابقة للبحث' : 'No matching products found'}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 order-first">
          {/* AI Assistant Button */}
          {settings.enableAiAssistant && (
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="relative group p-2 rounded-xl bg-gradient-to-r from-amber-500/10 to-indigo-500/10 hover:from-amber-500/20 hover:to-indigo-500/20 text-slate-800 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1.5 text-xs font-semibold transition-all shadow-sm"
              title="ALMA AI Personal Assistant"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="hidden xl:inline">{language === 'ar' ? 'المساعد الذكي' : 'AI Advisor'}</span>
            </button>
          )}

          {/* Wishlist Icon */}
          <button
            onClick={() => {
              setCurrentView('account');
            }}
            className="relative p-2 text-slate-700 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-900 text-amber-400 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-md"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="font-bold text-xs px-1.5 py-0.2 bg-amber-400 text-slate-950 dark:bg-slate-950 dark:text-amber-400 rounded-full">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* User Profile / Admin Menu */}
          <div className="relative order-first">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-900 dark:text-white hidden sm:inline max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute ltr:right-0 rtl:left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 p-2"
                    >
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-1">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase">
                          {user.role}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentView('account');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        <span>{language === 'ar' ? 'حسابي والطلبات' : 'My Account & Orders'}</span>
                      </button>

                      {/* Admin View Switcher Toggle */}
                      <button
                        onClick={() => {
                          setCurrentView('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 transition-colors my-1"
                      >
                        <LayoutDashboard className="w-4 h-4 text-amber-500" />
                        <span>{language === 'ar' ? 'لوحة تحكم الأدمن' : 'Admin Dashboard'}</span>
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{language === 'ar' ? 'تسجيل الخروج' : 'Log Out'}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-800"
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'ar' ? 'دخول / حساب' : 'Sign In'}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-300 lg:hidden rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3"
          >
            {/* Search Input for Mobile */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'ابحث في المتجر...' : 'Search store...'}
                className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
              />
              <Search className="w-4 h-4 text-slate-400 absolute top-3 left-3 rtl:left-auto rtl:right-3" />
            </div>

            <div className="flex flex-col gap-2 pt-2 text-sm font-medium">
              <button
                onClick={() => {
                  setCurrentView('home');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left rtl:text-right p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </button>
              <button
                onClick={() => {
                  setCurrentView('products');
                  setSelectedCategorySlug(null);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left rtl:text-right p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {language === 'ar' ? 'جميع المنتجات' : 'All Products'}
              </button>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase">
                {language === 'ar' ? 'التصنيفات' : 'Categories'}
              </div>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategorySlug(cat.slug);
                    setCurrentView('products');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left rtl:text-right p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  {language === 'ar' ? cat.nameAr : cat.nameEn}
                </button>
              ))}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setCurrentView('admin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2 text-amber-600 dark:text-amber-400 font-semibold"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{language === 'ar' ? 'لوحة تحكم الأدمن' : 'Admin Dashboard'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
