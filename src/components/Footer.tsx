import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Send,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { t, language, getCategoryName, setCurrentView, setSelectedCategorySlug, categories, settings, addToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      addToast('success', 'شكراً لاشتراكك في نشرة ألما الفاخرة!', 'Thank you for subscribing to ALMA newsletter!');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Value Propositions Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {t('expressDeliveryTitle')}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'ar'
                  ? 'توصيل مجاني داخل الرباط، تمارة وسلا — وخارجها 20 د.م.'
                  : 'Free delivery in Rabat, Temara & Salé — 20 MAD outside these cities'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {t('authenticTitle')}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('guaranteeTitle')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {t('returnsTitle')}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('guaranteeText')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {t('customerCareTitle')}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('customerCareTitle')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="ALMA STORE Luxury Logo"
              className="w-11 h-11 rounded-xl object-cover border border-amber-500/40 shadow-lg shadow-amber-500/10"
            />
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                ALMA <span className="text-amber-500 text-xs font-sans tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">STORE</span>
              </span>
              <span className="text-[10px] text-amber-400 tracking-widest uppercase block -mt-1 font-semibold">
                Luxury Shopping
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            {t('heroSubtitle')}
          </p>

          {/* Newsletter Form */}
          <div className="pt-2">
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {t('joinVip')}
            </h5>
            <form onSubmit={handleSubscribe} className="flex max-w-sm">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t('enterEmail')}
                className="w-full px-3.5 py-2.5 rounded-l-xl rtl:rounded-l-none rtl:rounded-r-xl bg-slate-900 text-sm text-white border border-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-r-xl rtl:rounded-r-none rtl:rounded-l-xl transition-colors flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
              </button>
            </form>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            {t('categories')}
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <button
                onClick={() => {
                  setCurrentView('products');
                  setSelectedCategorySlug(null);
                }}
                className="hover:text-amber-400 transition-colors"
              >
                {t('allProducts')}
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => {
                    setSelectedCategorySlug(cat.slug);
                    setCurrentView('products');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  {getCategoryName(cat)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            {t('trackOrder')}
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <button onClick={() => setCurrentView('track-order')} className="hover:text-amber-400 transition-colors">
                {t('trackOrder')}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('account')} className="hover:text-amber-400 transition-colors">
                {t('myAccount')}
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info & Admin Access */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            {t('adminPortal')}
          </h4>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="flex items-center gap-2">
              <span className="font-medium text-slate-300">{settings.storeEmail}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium text-slate-300">{settings.storePhone}</span>
            </p>

            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={() => setCurrentView('admin')}
                className="w-full text-center px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                {t('adminDashboard')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>© 2026 ALMA STORE. {t('allRightsReserved')}</span>
        </div>

        {/* Payment Badges */}
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800 font-bold text-[10px] text-slate-300">STRIPE</span>
          <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800 font-bold text-[10px] text-slate-300">PAYPAL</span>
          <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800 font-bold text-[10px] text-slate-300">VISA</span>
          <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800 font-bold text-[10px] text-slate-300">MASTERCARD</span>
          <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800 font-bold text-[10px] text-amber-400">COD</span>
        </div>
      </div>
    </footer>
  );
};
