import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ArrowLeft, Tag, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { translations, getProductTitle, formatPrice } from '../i18n/translations';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    language,
    appliedCoupon,
    applyCouponCode,
    setCurrentView,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const t = translations[language];

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const success = applyCouponCode(couponInput.trim());
    if (!success) {
      setCouponError(language === 'ar' ? 'كود التخفيض غير صالحة أو منتهي' : 'Invalid or expired coupon code');
    } else {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

        <motion.div
          initial={{ x: language === 'ar' ? '-100%' : '100%' }}
          animate={{ x: 0 }}
          exit={{ x: language === 'ar' ? '-100%' : '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`fixed inset-y-0 ${
            language === 'ar' ? 'left-0' : 'right-0'
          } max-w-full w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col z-50 text-white`}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-serif font-bold text-white">{t.cartTitle}</h2>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium">{t.emptyCart}</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('products');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  {t.shopNow}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemTitle = getProductTitle(item.product, language);
                return (
                  <div
                    key={`${item.product.id}-${item.selectedVariant || 'def'}`}
                    className="p-3 rounded-2xl bg-slate-800/50 border border-slate-800 flex gap-3 relative group"
                  >
                    <img
                      src={item.product.image}
                      alt={itemTitle}
                      className="w-20 h-20 object-cover rounded-xl bg-slate-950 border border-slate-800 flex-shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="text-xs font-bold text-white truncate">{itemTitle}</h4>
                        {item.selectedVariant && (
                          <span className="text-[10px] text-amber-400 block mt-0.5">
                            {item.selectedVariant}
                          </span>
                        )}
                        <span className="text-xs font-extrabold text-amber-400 block mt-1">
                          {formatPrice(item.product.price, language)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-white w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer (Summary & Checkout) */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-slate-500 absolute ltr:left-3 rtl:right-3 top-2.5" />
                    <input
                      type="text"
                      placeholder={t.couponCode}
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full ltr:pl-9 rtl:pr-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400 border border-slate-700"
                  >
                    {t.applyCoupon}
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-400 font-medium">{couponError}</p>}
                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-400 font-medium">
                    {language === 'ar' ? 'تم تطبيق خصم الكوبون بنجاح!' : 'Coupon applied!'} (-{appliedCoupon.discountPercentage}%)
                  </p>
                )}
              </form>

              {/* Subtotal & Totals breakdown */}
              <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.subtotal}</span>
                  <span className="font-semibold">{formatPrice(subtotal, language)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>{t.discount} ({appliedCoupon.code})</span>
                    <span>-{formatPrice(discountAmount, language)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.shipping}</span>
                  <span>{language === 'ar' ? 'يُحدَّد حسب المدينة عند الدفع' : 'Calculated by city at checkout'}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>{t.total}</span>
                  <span className="text-amber-400">{formatPrice(total, language)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>{t.proceedToCheckout}</span>
                {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'ar' ? 'دفع آمن ومشفر 100%' : '100% Encrypted & Secure Checkout'}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
