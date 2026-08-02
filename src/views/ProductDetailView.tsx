import React, { useState } from 'react';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, ArrowLeft, ArrowRight, Share2, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { translations, getProductTitle, getProductDescription, formatPrice } from '../i18n/translations';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';

export const ProductDetailView: React.FC = () => {
  const {
    activeProductId,
    products,
    language,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    setSelectedProductId,
    showToast,
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const product = products.find((p) => p.id === activeProductId) || products[0];
  const t = translations[language];

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const title = getProductTitle(product, language);
  const description = getProductDescription(product, language);
  const images = (product.images && product.images.length > 0)
    ? product.images
    : (product.gallery && product.gallery.length > 0)
    ? product.gallery
    : [product.image || '/assets/images/placeholder.jpg'];

  const handleAddToCart = () => {
    addToCart(product, selectedVariant || undefined);
    showToast(language === 'ar' ? 'تمت إضافة المنتج إلى السلة!' : 'Added to cart!', 'success');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(language === 'ar' ? 'تم نسخ رابط المنتج إلى الحافظة' : 'Product link copied to clipboard', 'info');
  };

  const relatedProducts = products.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-white">
      {/* Back button */}
      <button
        onClick={() => setCurrentView('products')}
        className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
      >
        {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        <span>{t.allProducts}</span>
      </button>

      {/* Main product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            {product.videoUrl && selectedImageIndex === images.length ? (
              <video
                src={product.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={images[selectedImageIndex] || product.image}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
            {product.badge && (
              <span className="absolute top-4 ltr:left-4 rtl:right-4 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {product.badge}
              </span>
            )}
          </div>

          {(images.length > 1 || product.videoUrl) && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIndex === idx ? 'border-amber-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
              {product.videoUrl && (
                <button
                  onClick={() => setSelectedImageIndex(images.length)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-slate-900 flex flex-col items-center justify-center text-emerald-400 ${
                    selectedImageIndex === images.length ? 'border-emerald-400 scale-105' : 'border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className="text-xl">▶</span>
                  <span className="text-[10px] font-bold">Video</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Product specs & purchase block */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {product.brand} • {product.categorySlug}
              </span>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="text-3xl font-serif font-bold text-white leading-tight">{title}</h1>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 ltr:mr-1 rtl:ml-1" />
                <span>{product.rating}</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">({product.reviewsCount} {t.reviews})</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-emerald-400 font-bold">{t.authenticGuaranteed}</span>
            </div>

            <div className="flex items-baseline gap-4 pt-2">
              <span className="text-3xl font-extrabold text-amber-400">{formatPrice(product.price, language)}</span>
              {product.originalPrice && (
                <span className="text-lg text-slate-500 line-through">{formatPrice(product.originalPrice, language)}</span>
              )}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed pt-3 border-t border-slate-800">
              {description}
            </p>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-800">
                {product.variants.map((v, i) => (
                  <div key={i} className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">
                      {v.name}: {selectedVariant || v.options[0]}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {v.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedVariant(opt)}
                          className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                            selectedVariant === opt
                              ? 'border-amber-400 bg-amber-500/20 text-amber-400 shadow-md shadow-amber-500/10'
                              : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{product.inStock ? t.addToCart : t.outOfStock}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-2xl border transition-colors ${
                  isWishlisted
                    ? 'bg-rose-500/10 border-rose-500 text-rose-500'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-[11px] text-slate-400">
              <div className="space-y-1">
                <Truck className="w-4 h-4 text-emerald-400 mx-auto" />
                <span className="block font-medium">{t.expressDelivery}</span>
              </div>
              <div className="space-y-1">
                <ShieldCheck className="w-4 h-4 text-amber-400 mx-auto" />
                <span className="block font-medium">{t.authenticGuaranteed}</span>
              </div>
              <div className="space-y-1">
                <RefreshCw className="w-4 h-4 text-indigo-400 mx-auto" />
                <span className="block font-medium">{t.easyReturns}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specs, Reviews, Description */}
      <div className="space-y-6 pt-8 border-t border-slate-800">
        <div className="flex items-center gap-6 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('desc')}
            className={`text-sm font-bold pb-3 -mb-3.5 border-b-2 transition-colors ${
              activeTab === 'desc'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t.description}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`text-sm font-bold pb-3 -mb-3.5 border-b-2 transition-colors ${
              activeTab === 'specs'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t.specifications}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-sm font-bold pb-3 -mb-3.5 border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t.reviews} ({product.reviewsCount})
          </button>
        </div>

        {/* Tab content */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          {activeTab === 'desc' && (
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>{description}</p>
              <p>
                {language === 'ar'
                  ? 'مصنوع بحرفية عالية جداً وفقاً لأعلى معايير الجودة العالمية الحصرية لدى ألما ستور.'
                  : 'Crafted with uncompromising accuracy according to international luxury standards.'}
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">SKU</span>
                <span className="font-bold text-white">{product.sku}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">{language === 'ar' ? 'العلامة التجارية' : 'Brand'}</span>
                <span className="font-bold text-white">{product.brand}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">{language === 'ar' ? 'بلد المنشأ' : 'Origin'}</span>
                <span className="font-bold text-white">
                  {product.categorySlug.includes('montres')
                    ? 'Switzerland'
                    : product.categorySlug.includes('support')
                    ? 'International AutoTech'
                    : 'Global Premium'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">{language === 'ar' ? 'الضمان' : 'Warranty'}</span>
                <span className="font-bold text-amber-400">2 Years Global Warranty</span>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-center">
                  <span className="text-3xl font-extrabold text-amber-400">{product.rating}</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">/ 5.0</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    {language === 'ar' ? 'تقييم ممتاز مستند إلى آراء العملاء الموثقين' : 'Verified customer experience feedback'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-slate-800">
          <h3 className="text-xl font-serif font-bold text-white">{t.similarProducts}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
