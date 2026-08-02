import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { translations, getCategoryName, getBrandDescription } from '../i18n/translations';
import { ArrowRight, ArrowLeft, Sparkles, Flame, Award, ShieldCheck, Truck, RefreshCw, Headphones, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const HomeView: React.FC = () => {
  const {
    language,
    products,
    categories,
    brands,
    setSelectedCategorySlug,
    setCurrentView,
    activeTab,
  } = useStore();

  const t = translations[language];

  const featuredProducts = products.filter((p) => p.isFeatured);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const flashSaleProducts = products.filter((p) => p.originalPrice && p.originalPrice > p.price);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <HeroBanner />

      {/* Categories Horizontal Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{t.categories}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'ar' ? 'تصفح تشكيلاتنا الفاخرة حسب الفئة' : 'Browse signature collections by category'}
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategorySlug(null);
              setCurrentView('products');
            }}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>{t.allProducts}</span>
            {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const catName = getCategoryName(cat, language);
            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -4 }}
                onClick={() => {
                  setSelectedCategorySlug(cat.slug);
                  setCurrentView('products');
                }}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer p-4 text-center space-y-3 transition-all"
              >
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform">
                  <img src={cat.image} alt={catName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                    {catName}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-medium">{cat.itemCount} {t.itemsCount}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Flash Sale Banner Section */}
      {flashSaleProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-bold">
                  <Flame className="w-6 h-6 fill-slate-950 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">{t.flashSale}</h3>
                  <p className="text-xs text-amber-300">
                    {language === 'ar' ? 'خصومات تصل إلى 35% لفترة محدودة جداً' : 'Limited time offers up to 35% off'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.slice(0, 4).map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>{t.bestSellers}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'ar' ? 'المنتجات الأكثر طلبًا وتفضيلاً من عملائنا VIP' : 'Most preferred items by our VIP clientele'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{t.featuredProducts}</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Luxury Brands Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-white">{t.brands}</h2>
          <p className="text-xs text-slate-400">
            {language === 'ar' ? 'نحن الوكيل الحصري المعتمد لأرقى الدور العالمية' : 'Authorized partner for world-class luxury houses'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((b) => {
            const desc = getBrandDescription(b, language);
            return (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center space-y-2 hover:border-amber-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center">
                  <img src={b.logo} alt={b.name} className="max-h-full max-w-full object-contain filter invert" />
                </div>
                <h4 className="text-xs font-bold text-white">{b.name}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-2">{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Value Proposition Features Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="flex items-start gap-4 p-2">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{t.expressDelivery}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{t.expressDeliveryDesc}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{t.authenticGuaranteed}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{t.authenticGuaranteedDesc}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{t.easyReturns}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{t.easyReturnsDesc}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{t.customerCare}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{t.customerCareDesc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
