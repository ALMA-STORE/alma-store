import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { translations, getCategoryName, getProductTitle, formatPrice } from '../i18n/translations';
import { Filter, SlidersHorizontal, LayoutGrid, List, Search, X, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const ProductsView: React.FC = () => {
  const {
    products,
    categories,
    brands,
    selectedCategorySlug,
    setSelectedCategorySlug,
    searchQuery,
    setSearchQuery,
    language,
  } = useStore();

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const t = translations[language];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategorySlug && p.categorySlug !== selectedCategorySlug) {
          return false;
        }
        // Brand filter
        if (selectedBrand && p.brand !== selectedBrand) {
          return false;
        }
        // Price filter
        if (p.price > maxPrice) {
          return false;
        }
        // Stock filter
        if (inStockOnly && !p.inStock) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const title = getProductTitle(p, language).toLowerCase();
          const desc = (language === 'ar' ? p.descriptionAr : language === 'fr' ? (p.descriptionFr || p.descriptionEn) : p.descriptionEn).toLowerCase();
          const tagsMatch = p.tags.some((tag) => tag.toLowerCase().includes(q));
          return title.includes(q) || desc.includes(q) || tagsMatch || p.sku.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default featured order
      });
  }, [products, selectedCategorySlug, selectedBrand, maxPrice, inStockOnly, searchQuery, sortBy, language]);

  const clearFilters = () => {
    setSelectedCategorySlug(null);
    setSelectedBrand(null);
    setMaxPrice(3000);
    setSearchQuery('');
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {selectedCategorySlug
              ? getCategoryName(categories.find((c) => c.slug === selectedCategorySlug) || categories[0], language)
              : t.allProducts}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'ar'
              ? `تم العثور على ${filteredProducts.length} منتج مطابق لاختياراتك`
              : `Found ${filteredProducts.length} items matching your filter criteria`}
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile filter toggle button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-amber-400 flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{language === 'ar' ? 'التصفية والفلترة' : 'Filters'}</span>
          </button>

          {/* Sort selector */}
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
          >
            <option value="featured">{language === 'ar' ? 'الترتيب: الموصى به' : 'Sort: Featured'}</option>
            <option value="price-asc">{language === 'ar' ? 'السعر: من الأقل إلى الأعلى' : 'Price: Low to High'}</option>
            <option value="price-desc">{language === 'ar' ? 'السعر: من الأعلى إلى الأقل' : 'Price: High to Low'}</option>
            <option value="rating">{language === 'ar' ? 'الأعلى تقييماً' : 'Top Rated'}</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`lg:block ${
            isFilterOpen ? 'block' : 'hidden'
          } space-y-6 p-6 rounded-3xl bg-slate-900 border border-slate-800 h-fit`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-400" />
              <span>{language === 'ar' ? 'الفلاتر المتقدمة' : 'Refine Results'}</span>
            </h3>
            <button
              onClick={clearFilters}
              className="text-[11px] text-amber-400 hover:underline font-medium"
            >
              {language === 'ar' ? 'إعادة ضبط' : 'Reset All'}
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t.categories}</h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategorySlug(null)}
                className={`w-full text-right ltr:text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                  selectedCategorySlug === null
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span>{t.allProducts}</span>
                <span className="text-[10px] opacity-60">{products.length}</span>
              </button>

              {categories.map((cat) => {
                const catName = getCategoryName(cat, language);
                const isSelected = selectedCategorySlug === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategorySlug(cat.slug)}
                    className={`w-full text-right ltr:text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <span>{catName}</span>
                    <span className="text-[10px] opacity-60">{cat.itemCount}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t.brands}</h4>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              <button
                onClick={() => setSelectedBrand(null)}
                className={`w-full text-right ltr:text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedBrand === null
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {language === 'ar' ? 'جميع العلامات' : 'All Brands'}
              </button>
              {brands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(b.name)}
                  className={`w-full text-right ltr:text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    selectedBrand === b.name
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">{language === 'ar' ? 'أقصى سعر:' : 'Max Price:'}</span>
              <span className="font-extrabold text-amber-400">{formatPrice(maxPrice, language)}</span>
            </div>
            <input
              type="range"
              min="100"
              max="3000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-950 cursor-pointer"
            />
          </div>

          {/* In Stock Toggle */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 cursor-pointer">
              {language === 'ar' ? 'المنتجات المتوفرة فقط' : 'In-Stock Only'}
            </label>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded accent-amber-500 bg-slate-950 border-slate-800 cursor-pointer"
            />
          </div>
        </aside>

        {/* Product Cards List / Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-slate-900/50 rounded-3xl border border-slate-800">
              <Search className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-white">{t.noResults}</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {language === 'ar'
                  ? 'جرّب تغيير عبارات البحث أو الفلاتر المختارة للعثور على نتائج مطابقة'
                  : 'Try adjusting your search terms or clearing selected filter criteria'}
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                {language === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
