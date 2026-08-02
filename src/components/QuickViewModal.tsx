import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, Check, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { translations, getProductTitle, getProductDescription, formatPrice } from '../i18n/translations';
import { motion, AnimatePresence } from 'motion/react';

export const QuickViewModal: React.FC = () => {
  const {
    selectedProductId,
    setSelectedProductId,
    products,
    language,
    addToCart,
    toggleWishlist,
    isInWishlist,
    showToast,
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantOption, setSelectedVariantOption] = useState<string | null>(null);

  if (!selectedProductId) return null;

  const product = products.find((p) => p.id === selectedProductId);
  if (!product) return null;

  const t = translations[language];
  const isWishlisted = isInWishlist(product.id);
  const title = getProductTitle(product, language);
  const description = getProductDescription(product, language);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAddToCart = () => {
    addToCart(product, selectedVariantOption || undefined);
    showToast(language === 'ar' ? 'تمت الإضافة إلى السلة بنجاح' : 'Added to shopping cart', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-white my-8"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedProductId(null)}
            className="absolute top-4 ltr:right-4 rtl:left-4 z-10 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* Gallery Images Column */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={images[selectedImageIndex] || product.image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 ltr:left-3 rtl:right-3 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImageIndex === idx ? 'border-amber-400 opacity-100' : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info column */}
            <div className="space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  <span>{product.categorySlug}</span>
                  <span>•</span>
                  <span>SKU: {product.sku}</span>
                </div>

                <h2 className="text-2xl font-serif font-bold text-white leading-tight">{title}</h2>

                {/* Rating */}
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold ltr:ml-1 rtl:mr-1">{product.rating}</span>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">({product.reviewsCount} {t.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl font-extrabold text-amber-400">{formatPrice(product.price, language)}</span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-500 line-through">{formatPrice(product.originalPrice, language)}</span>
                  )}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                  {description}
                </p>

                {/* Product Variants if any */}
                {product.variants && product.variants.length > 0 && (
                  <div className="pt-3 space-y-2">
                    {product.variants.map((v, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">
                          {v.name}: {selectedVariantOption}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {v.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setSelectedVariantOption(opt)}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                                selectedVariantOption === opt
                                  ? 'border-amber-400 bg-amber-500/20 text-amber-400'
                                  : 'border-slate-800 bg-slate-800/50 text-slate-300 hover:border-slate-700'
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

              {/* Actions & Guarantee */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{product.inStock ? t.addToCart : t.outOfStock}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-2xl border transition-colors ${
                      isWishlisted
                        ? 'bg-rose-500/10 border-rose-500 text-rose-500'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-400 pt-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>{t.expressDelivery}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>{t.authenticGuaranteed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
