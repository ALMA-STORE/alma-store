import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { translations, getProductTitle, formatPrice } from '../i18n/translations';
import { Order } from '../types';

export const TrackOrderView: React.FC = () => {
  const { orders, language } = useStore();
  const t = translations[language];

  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === searchId.trim().toLowerCase() ||
        (o.trackingNumber && o.trackingNumber.toLowerCase() === searchId.trim().toLowerCase())
    );

    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 1;
      case 'shipped':
        return 2;
      case 'delivered':
        return 3;
      case 'cancelled':
        return 0;
      default:
        return 1;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-white">
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-serif font-bold text-white">{t.trackingTitle}</h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          {language === 'ar'
            ? 'تابع مسار شحنتك الفاخرة بالوقت الفعلي لحظة بلحظة'
            : 'Track your luxury shipment in real-time with step-by-step milestones'}
        </p>
      </div>

      {/* Track Search Box */}
      <form onSubmit={handleTrack} className="max-w-xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute ltr:left-3 rtl:right-3 top-3.5" />
          <input
            type="text"
            placeholder={t.enterOrderOrTracking}
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full ltr:pl-9 rtl:pr-9 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 shadow-xl"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-2xl transition-colors shadow-lg shadow-amber-500/20"
        >
          {t.trackBtn}
        </button>
      </form>

      {/* Results Display */}
      {searchedOrder ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 shadow-2xl">
          {/* Order Meta Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">
                {language === 'ar' ? 'رقم الطلب:' : 'Order ID:'} {searchedOrder.id}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {language === 'ar' ? 'التوصيل لـ: ' : 'Delivering to: '} {searchedOrder.customerName}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{searchedOrder.shippingAddress}</span>
              </p>
            </div>

            <div className="text-right rtl:text-left">
              <span className="text-xs text-slate-400 block">
                {new Date(searchedOrder.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
              </span>
              <span className="text-lg font-extrabold text-amber-400 block mt-0.5">
                {formatPrice(searchedOrder.totalAmount, language)}
              </span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="py-4">
            <div className="grid grid-cols-3 relative">
              {/* Connecting Bar */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 ltr:left-0 rtl:right-0 h-1 bg-gradient-to-r from-amber-400 to-emerald-400 -translate-y-1/2 z-0 transition-all duration-500"
                style={{
                  width: `${(getStatusStep(searchedOrder.status) / 3) * 100}%`,
                }}
              />

              {/* Step 1: Processing */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-colors ${
                    getStatusStep(searchedOrder.status) >= 1
                      ? 'bg-slate-950 border-amber-400 text-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-200">
                  {language === 'ar' ? 'قيد التجهيز' : 'Processing'}
                </span>
              </div>

              {/* Step 2: Shipped */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-colors ${
                    getStatusStep(searchedOrder.status) >= 2
                      ? 'bg-slate-950 border-amber-400 text-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-200">
                  {language === 'ar' ? 'خرج للشحن' : 'Shipped'}
                </span>
              </div>

              {/* Step 3: Delivered */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-colors ${
                    getStatusStep(searchedOrder.status) === 3
                      ? 'bg-slate-950 border-emerald-400 text-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-200">
                  {language === 'ar' ? 'تم الاستلام' : 'Delivered'}
                </span>
              </div>
            </div>
          </div>

          {/* Ordered items breakdown */}
          <div className="border-t border-slate-800 pt-6 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.orderSummary}
            </h4>
            <div className="space-y-2">
              {searchedOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt=""
                      className="w-10 h-10 object-cover rounded-lg bg-slate-900"
                    />
                    <div>
                      <h5 className="font-bold text-white">
                        {getProductTitle(item.product, language)}
                      </h5>
                      <span className="text-slate-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-extrabold text-amber-400">
                    {formatPrice(item.price * item.quantity, language)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="py-12 text-center space-y-3 bg-slate-900 border border-slate-800 rounded-3xl">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-base font-bold text-white">
            {language === 'ar' ? 'لم يتم العثور على طلب بهذا الرقم' : 'No order found with this tracking ID'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'ar'
              ? 'تأكد من إدخال رمز الطلب الصحيح مثل ORD-2026-8801'
              : 'Please make sure you enter a valid reference like ORD-2026-8801'}
          </p>
        </div>
      ) : null}
    </div>
  );
};
