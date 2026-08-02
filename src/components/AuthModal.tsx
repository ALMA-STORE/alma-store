import React, { useState } from 'react';
import { X, User, Lock, Mail, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { translations } from '../i18n/translations';
import { motion, AnimatePresence } from 'motion/react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, language, login, showToast } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    login(email, isSignUp ? 'customer' : email.includes('admin') ? 'admin' : 'customer', name || email.split('@')[0]);
    setIsAuthModalOpen(false);
    showToast(language === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Successfully signed in!', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-white my-8"
        >
          {/* Close button */}
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 ltr:right-4 rtl:left-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2 mb-6">
            <h3 className="text-2xl font-serif font-bold text-white">
              {isSignUp
                ? language === 'ar'
                  ? 'إنشاء حساب جديد'
                  : 'Create New Account'
                : language === 'ar'
                ? 'تسجيل الدخول'
                : 'Sign In'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'ar'
                ? 'استمتع بمزايا العضوية الحصرية وتتبع طلباتك الفاخرة'
                : 'Enjoy exclusive VIP perks and seamless luxury order tracking'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute ltr:left-3 rtl:right-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'ar' ? 'أحمد المنصوري' : 'John Doe'}
                    className="w-full ltr:pl-9 rtl:pr-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute ltr:left-3 rtl:right-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full ltr:pl-9 rtl:pr-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {language === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute ltr:left-3 rtl:right-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full ltr:pl-9 rtl:pr-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Admin quick preset link */}
            <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@alma.com');
                  setPassword('admin123');
                }}
                className="text-amber-400 hover:underline"
              >
                {language === 'ar' ? 'تجربة حساب الأدمن (Quick Admin Demo)' : 'Quick Fill Admin Demo'}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{isSignUp ? (language === 'ar' ? 'إنشاء حساب' : 'Register') : t.signIn}</span>
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <div className="text-center pt-5 border-t border-slate-800 mt-6 text-xs text-slate-400">
            {isSignUp ? (
              <span>
                {language === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'} {' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-amber-400 font-bold hover:underline"
                >
                  {t.signIn}
                </button>
              </span>
            ) : (
              <span>
                {language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"} {' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-amber-400 font-bold hover:underline"
                >
                  {language === 'ar' ? 'سجل الآن' : 'Register now'}
                </button>
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
