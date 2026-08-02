import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, ShieldCheck, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { translations } from '../i18n/translations';
import { motion } from 'motion/react';

export const HeroBanner: React.FC = () => {
  const { language, setCurrentView, setSelectedCategorySlug } = useStore();
  const t = translations[language];

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden border-b border-slate-800">
      {/* Subtle Background Glow Patterns */}
      <div className="absolute top-0 ltr:right-0 rtl:left-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 ltr:left-0 rtl:right-0 -mb-12 -ml-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column Text Content */}
        <motion.div
          initial={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center rtl:lg:text-right ltr:lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{t.collection2026}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
            {language === 'ar' ? (
              <>
                عالم من <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">الفخامة والتميز</span> الاستثنائي
              </>
            ) : language === 'fr' ? (
              <>
                Un Monde de <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Luxe & Élégance</span>
              </>
            ) : (
              <>
                A World of <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Pure Luxury</span> & Elegance
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center rtl:lg:justify-start ltr:lg:justify-start gap-4">
            <button
              onClick={() => {
                setCurrentView('products');
                setSelectedCategorySlug(null);
              }}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2 group"
            >
              <span>{t.shopNow}</span>
              {language === 'ar' ? (
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>

            <button
              onClick={() => {
                setSelectedCategorySlug('support-telephone-voiture');
                setCurrentView('products');
              }}
              className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 text-sm font-semibold transition-all backdrop-blur-md"
            >
              {t.exploreCollection}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-center rtl:lg:justify-start ltr:lg:justify-start gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'ar' ? 'ضمان ألما الأصلي' : 'ALMA Authentic Guarantee'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{language === 'ar' ? 'تصاميم معتمدة 100%' : '100% Certified Luxury'}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column Showcase Visual Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-indigo-950/50 group">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1000"
              alt="ALMA Royal Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            {/* Floating Tag Card */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  {language === 'ar' ? 'الإصدار الملوكي 2026' : 'Royal Edition 2026'}
                </p>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {language === 'ar' ? 'ساعة كرونوغراف الذهبية' : 'Chronograph Royal Gold'}
                </h4>
              </div>
              <span className="text-sm font-extrabold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                {language === 'ar' ? '1,850 د.م.' : '1,850 MAD'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
