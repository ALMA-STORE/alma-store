import React from 'react';
import { Star, Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    t,
    language,
    getProductTitle,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProductId,
    setCurrentView,
    setQuickViewProduct,
  } = useStore();

  const isLiked = isInWishlist(product.id);
  const title = getProductTitle(product);

  const effectivePrice = product.isFlashSale && product.flashSalePrice ? product.flashSalePrice : product.price;
  const hasDiscount = product.originalPrice && product.originalPrice > effectivePrice;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - effectivePrice) / product.originalPrice!) * 100)
    : 0;

  const handleCardClick = () => {
    setSelectedProductId(product.id);
    setCurrentView('product-detail');
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-950/20 overflow-hidden flex flex-col transition-all"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <img
          src={(product.images && product.images[0]) || product.image || (product.gallery && product.gallery[0]) || '/assets/images/placeholder.jpg'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex flex-col gap-1.5 z-10">
          {product.videoUrl && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold shadow-md flex items-center gap-1">
              ▶ Video
            </span>
          )}
          {product.isFlashSale && (
            <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {t('flashSale')}
            </span>
          )}
          {hasDiscount && !product.isFlashSale && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-bold shadow-md">
              -{discountPercentage}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-bold shadow-md">
              {t('newArrivals')}
            </span>
          )}
        </div>

        {/* Floating Wishlist & Quick View Buttons */}
        <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
              isLiked
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-900'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-900 backdrop-blur-md transition-all shadow-md opacity-0 group-hover:opacity-100 hidden sm:block"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold mb-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3
            onClick={handleCardClick}
            className="text-sm font-bold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {title}
          </h3>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                {effectivePrice}
              </span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                {language === 'ar' ? 'د.م.' : 'MAD'}
              </span>
            </div>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through -mt-0.5">
                {product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock <= 0}
            className={`p-2.5 rounded-xl font-semibold transition-all flex items-center justify-center shrink-0 shadow-sm ${
              product.stock <= 0
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-slate-800 text-amber-400 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950'
            }`}
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
