import React from 'react';
import { User, Package, Heart, LogOut, ShieldCheck, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { translations, getProductTitle, formatPrice } from '../i18n/translations';
import { ProductCard } from '../components/ProductCard';

export const AccountView: React.FC = () => {
  const { user, logout, orders, wishlist, products, language, setCurrentView, setIsAuthModalOpen } = useStore();
  const t = translations[language];

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4 text-white">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-white">
          {language === 'ar' ? 'سجل دخولك لمتابعة حسابك' : 'Sign in to access your account'}
        </h2>
        <p className="text-xs text-slate-400">
          {language === 'ar'
            ? 'تتبع الطلبات السابقة، إدارة العناوين والمفضلة بضغطة واحدة'
            : 'Track active orders, manage saved items and delivery addresses seamlessly'}
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20"
        >
          {t.signIn}
        </button>
      </div>
    );
  }

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      {/* Account Profile Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center text-2xl font-bold font-serif shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              <span>{user.name}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full font-bold uppercase border border-amber-500/30">
                VIP MEMBER
              </span>
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>{user.email}</span>
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-rose-400 flex items-center gap-2 border border-slate-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.logOut}</span>
        </button>
      </div>

      {/* Grid: Order History & Saved Wishlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order History Column */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Package className="w-5 h-5 text-amber-400" />
            <span>{t.orderHistory}</span>
          </h2>

          {orders.length === 0 ? (
            <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-3xl border border-slate-800">
              <p className="text-xs">{language === 'ar' ? 'لا توجد طلبات سابقة' : 'No order history available'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
                >
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3 text-xs">
                    <div>
                      <span className="font-extrabold text-amber-400 block">{order.id}</span>
                      <span className="text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-extrabold text-white block">{formatPrice(order.totalAmount, language)}</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs text-slate-300">
                        <span>
                          {getProductTitle(item.product, language)} × {item.quantity}
                        </span>
                        <span className="font-semibold">{formatPrice(item.price * item.quantity, language)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Wishlist Column */}
        <div className="space-y-4">
          <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Heart className="w-5 h-5 text-rose-500" />
            <span>{t.wishlist} ({wishlist.length})</span>
          </h2>

          {wishlistedProducts.length === 0 ? (
            <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-3xl border border-slate-800">
              <p className="text-xs">{language === 'ar' ? 'قائمة المفضلة فارغة حالياً' : 'Wishlist is currently empty'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {wishlistedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
