import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Package, ShoppingBag, Users, DollarSign, Tag, Settings, RefreshCw, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { translations, getProductTitle, formatPrice } from '../i18n/translations';
import { Product } from '../types';

export const AdminView: React.FC = () => {
  const {
    products,
    setProducts,
    orders,
    updateOrderStatus,
    coupons,
    categories,
    language,
    showToast,
  } = useStore();

  const t = translations[language];

  const [adminTab, setAdminTab] = useState<'products' | 'orders' | 'coupons'>('products');

  // Product Form state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [titleFr, setTitleFr] = useState('');
  const [price, setPrice] = useState<number>(500);
  const [sku, setSku] = useState('ALMA-NEW-01');
  const [categorySlug, setCategorySlug] = useState('support-telephone-voiture');
  const [brand, setBrand] = useState('ALMA');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800');

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr || !titleEn || !price) return;

    const newProd: Product = {
      id: `p-${Date.now()}`,
      titleAr,
      titleEn,
      titleFr: titleFr || titleEn,
      descriptionAr: 'منتج فاخر مصمم وفق أحدث صيحات الموضة العالمية لعام 2026.',
      descriptionEn: 'Luxury crafted item designed to meet the highest 2026 standards.',
      descriptionFr: 'Article de luxe conçu selon les normes 2026 les plus élevées.',
      price,
      sku,
      categorySlug,
      brand,
      image: imageUrl,
      inStock: true,
      rating: 5.0,
      reviewsCount: 1,
      tags: ['New', 'Luxury', '2026'],
    };

    setProducts([newProd, ...products]);
    setIsAddingProduct(false);
    showToast(language === 'ar' ? 'تمت إضافة المنتج بنجاح!' : 'Product added successfully!', 'success');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    showToast(language === 'ar' ? 'تم حذف المنتج' : 'Product removed', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-400" />
            <span>{t.adminTitle}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'ar' ? 'إدارة المنتجات والطلبات والكوبونات بالمتجر' : 'Manage catalog, orders, and promotions'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setAdminTab('products')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              adminTab === 'products' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.productsMgmt} ({products.length})
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              adminTab === 'orders' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.ordersMgmt} ({orders.length})
          </button>
        </div>
      </div>

      {/* Admin Stats Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">{language === 'ar' ? 'إجمالي المبيعات' : 'Total Revenue'}</span>
            <span className="text-2xl font-extrabold text-amber-400 mt-1 block">{formatPrice(totalRevenue, language)}</span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">{language === 'ar' ? 'عدد الطلبات' : 'Total Orders'}</span>
            <span className="text-2xl font-extrabold text-white mt-1 block">{orders.length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">{language === 'ar' ? 'المنتجات في الكتالوج' : 'Active Catalog'}</span>
            <span className="text-2xl font-extrabold text-emerald-400 mt-1 block">{products.length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Package className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Products Management Tab */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-serif font-bold text-white">{t.productsMgmt}</h3>
            <button
              onClick={() => setIsAddingProduct(!isAddingProduct)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addProduct}</span>
            </button>
          </div>

          {/* Add product drawer/form */}
          {isAddingProduct && (
            <form onSubmit={handleCreateProduct} className="p-6 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-4">
              <h4 className="text-sm font-bold text-amber-400">{t.addProduct}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">اسم المنتج بالعربية</label>
                  <input
                    type="text"
                    required
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">English Title</label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Titre Français</label>
                  <input
                    type="text"
                    value={titleFr}
                    onChange={(e) => setTitleFr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">السعر ({language === 'ar' ? 'د.م.' : 'MAD'})</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">SKU Code</label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">صورة المنتج (URL)</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  حفظ المنتج
                </button>
              </div>
            </form>
          )}

          {/* Products Table */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right ltr:text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">المنتج</th>
                    <th className="p-4">SKU</th>
                    <th className="p-4">الفئة</th>
                    <th className="p-4">السعر</th>
                    <th className="p-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.image} alt="" className="w-10 h-10 object-cover rounded-xl bg-slate-950" />
                        <span className="font-bold text-white">{getProductTitle(p, language)}</span>
                      </td>
                      <td className="p-4 font-mono text-slate-400">{p.sku}</td>
                      <td className="p-4 text-amber-400">{p.categorySlug}</td>
                      <td className="p-4 font-extrabold">{formatPrice(p.price, language)}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Management Tab */}
      {adminTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif font-bold text-white">{t.ordersMgmt}</h3>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800 pb-3 text-xs">
                  <div>
                    <span className="font-bold text-amber-400 text-sm">{order.id}</span>
                    <span className="text-slate-400 block mt-0.5">
                      {order.customerName} ({order.customerEmail})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-white text-base">{formatPrice(order.totalAmount, language)}</span>
                    <select
                      value={order.status}
                      onChange={(e: any) => updateOrderStatus(order.id, e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400 focus:outline-none"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  <p>Address: {order.shippingAddress}, {order.city}</p>
                  <p>Payment: {order.paymentMethod.toUpperCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
