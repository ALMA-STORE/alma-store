import React, { useState } from 'react';
import { CreditCard, Truck, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Lock, DollarSign } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { translations, getProductTitle, formatPrice } from '../i18n/translations';
import { PaymentMethod } from '../types';
import { motion } from 'motion/react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    appliedCoupon,
    language,
    placeOrder,
    setCurrentView,
    user,
    setIsAuthModalOpen,
  } = useStore();

  const t = translations[language];

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('+966 50 123 4567');
  const [address, setAddress] = useState('طريق الملك فهد، حي العليا، الرياض');
  const [city, setCity] = useState('الرياض');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
  const normalizedCity = city
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي');
  const freeDeliveryCities = ['rabat', 'temara', 'sale', 'الرباط', 'تمارة', 'سلا'];
  const shippingFee = subtotal === 0 || freeDeliveryCities.includes(normalizedCity) ? 0 : 20;
  const tax = (subtotal - discountAmount) * 0.15; // 15% VAT
  const total = Math.max(0, subtotal - discountAmount + shippingFee + tax);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder = placeOrder({
        fullName,
        email,
        phone,
        address,
        city,
        paymentMethod,
      });
      setIsSubmitting(false);
      setCompletedOrderId(newOrder.id);
    }, 1200);
  };

  if (completedOrderId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 text-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>

        <h1 className="text-3xl font-serif font-bold text-white">
          {language === 'ar' ? 'تم تأكيد طلبك الفاخر بنجاح!' : 'Your Luxury Order is Confirmed!'}
        </h1>

        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          {language === 'ar'
            ? `شكراً لتسوقك من ألما ستور. رقم طلبك المرجعي للتتبع هو: `
            : `Thank you for shopping at ALMA STORE. Your tracking ID is: `}
          <span className="font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 block mt-2 text-base">
            {completedOrderId}
          </span>
        </p>

        <div className="pt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setCurrentView('track')}
            className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
          >
            {t.trackOrder}
          </button>
          <button
            onClick={() => setCurrentView('products')}
            className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs border border-slate-800 hover:bg-slate-800 transition-colors"
          >
            {t.allProducts}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-serif font-bold text-white">{t.checkoutTitle}</h1>
        {!user && (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="text-xs text-amber-400 hover:underline font-bold"
          >
            {language === 'ar' ? 'تسجيل الدخول لتسريع الطلب' : 'Sign in for faster checkout'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>{t.shippingAddress}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'الاسم بالكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'رقم الجوال' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'المدينة' : 'City'}
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'العنوان التفصيلي' : 'Street Address'}
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>{t.paymentMethod}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('stripe')}
                className={`p-4 rounded-2xl border text-right ltr:text-left transition-all ${
                  paymentMethod === 'stripe'
                    ? 'border-amber-400 bg-amber-500/10 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-400 mb-2" />
                <span className="text-xs font-bold block">{t.creditCardStripe}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 rounded-2xl border text-right ltr:text-left transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-amber-400 bg-amber-500/10 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <DollarSign className="w-5 h-5 text-sky-400 mb-2" />
                <span className="text-xs font-bold block">{t.payPal}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border text-right ltr:text-left transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-amber-400 bg-amber-500/10 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Truck className="w-5 h-5 text-emerald-400 mb-2" />
                <span className="text-xs font-bold block">{t.cashOnDelivery}</span>
              </button>
            </div>

            {/* Credit Card Inputs Mock */}
            {paymentMethod === 'stripe' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 pt-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">
                    {language === 'ar' ? 'رقم البطاقة' : 'Card Number'}
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">
                      {language === 'ar' ? 'تاريخ الانتهاء' : 'Expiry Date'}
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">CVV / CVC</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>
              {isSubmitting
                ? language === 'ar'
                  ? 'جارٍ معالجة الدفع والطلب...'
                  : 'Processing Payment...'
                : t.placeOrder}
            </span>
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 h-fit space-y-6">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
            {t.orderSummary} ({cart.reduce((s, i) => s + i.quantity, 0)})
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map((item) => {
              const itemTitle = getProductTitle(item.product, language);
              return (
                <div key={item.product.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.image}
                    alt=""
                    className="w-12 h-12 object-cover rounded-xl bg-slate-950 border border-slate-800"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-white truncate">{itemTitle}</h5>
                    <span className="text-slate-400">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-amber-400">
                    {formatPrice(item.product.price * item.quantity, language)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 text-xs border-t border-slate-800 pt-4 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">{t.subtotal}</span>
              <span>{formatPrice(subtotal, language)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-emerald-400">
                <span>{t.discount}</span>
                <span>-{formatPrice(discountAmount, language)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-400">{t.shipping}</span>
              <span>{shippingFee === 0 ? (language === 'ar' ? 'مجاني' : 'FREE') : formatPrice(shippingFee, language)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{t.tax}</span>
              <span>{formatPrice(tax, language)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-slate-800">
              <span>{t.total}</span>
              <span className="text-amber-400">{formatPrice(total, language)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
