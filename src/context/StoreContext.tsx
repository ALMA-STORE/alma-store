import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Product,
  Category,
  Brand,
  CartItem,
  WishlistItem,
  User,
  Order,
  Coupon,
  Review,
  StoreSettings,
  OrderStatus,
  Address,
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_BRANDS,
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  INITIAL_USER,
  INITIAL_ORDERS,
} from '../data/initialData';
import { translations, TranslationKey, getProductTitle, getProductDescription, getCategoryName, getBrandDescription } from '../i18n/translations';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  messageAr: string;
  messageEn: string;
}

interface StoreContextType {
  // App Settings & Config
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  getProductTitle: (product: Product) => string;
  getProductDescription: (product: Product) => string;
  getCategoryName: (category: Category) => string;
  getBrandDescription: (brand: Brand) => string;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Active View Navigation
  currentView: 'home' | 'products' | 'product-detail' | 'checkout' | 'track-order' | 'account' | 'admin';
  setCurrentView: (view: 'home' | 'products' | 'product-detail' | 'checkout' | 'track-order' | 'account' | 'admin') => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  
  // Navigation filters
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Catalog
  products: Product[];
  categories: Category[];
  brands: Brand[];
  coupons: Coupon[];
  reviews: Review[];
  
  // Products Management
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Categories & Brands Management
  addCategory: (cat: Omit<Category, 'id' | 'itemCount'>) => void;
  addBrand: (brand: Omit<Brand, 'id'>) => void;

  // Cart State & Actions
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; messageAr: string; messageEn: string };
  removeCoupon: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist State & Actions
  wishlist: WishlistItem[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth & User
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;

  // Orders State & Actions
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'trackingNumber' | 'createdAt' | 'statusHistory'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;

  // Reviews
  addReview: (productId: string, rating: number, comment: string) => void;

  // Coupons Admin
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  toggleCouponActive: (id: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', messageAr: string, messageEn: string) => void;
  removeToast: (id: string) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // AI Assistant Drawer
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage initializers
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('alma_language') as Language) || 'ar';
  });

  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    return localStorage.getItem('alma_dark') === 'true';
  });

  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);

  const [currentView, setCurrentView] = useState<'home' | 'products' | 'product-detail' | 'checkout' | 'track-order' | 'account' | 'admin'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('alma_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('alma_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [brands, setBrands] = useState<Brand[]>(() => {
    const saved = localStorage.getItem('alma_brands');
    return saved ? JSON.parse(saved) : INITIAL_BRANDS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('alma_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('alma_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('alma_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('alma_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('alma_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('alma_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('alma_language', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('alma_dark', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('alma_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('alma_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('alma_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('alma_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('alma_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('alma_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('alma_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('alma_brands', JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem('alma_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setDarkMode = (val: boolean) => {
    setDarkModeState(val);
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Toast actions
  const addToast = (type: 'success' | 'error' | 'info', messageAr: string, messageEn: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, messageAr, messageEn }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Products CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewsCount'>) => {
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProd, ...prev]);
    addToast('success', 'تم إضافة المنتج بنجاح', 'Product added successfully');
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));
    addToast('success', 'تم تحديث بيانات المنتج', 'Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('info', 'تم حذف المنتج من المتجر', 'Product deleted');
  };

  // Categories & Brands CRUD
  const addCategory = (catData: Omit<Category, 'id' | 'itemCount'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
      itemCount: 0,
    };
    setCategories((prev) => [...prev, newCat]);
    addToast('success', 'تم إضافة التصنيف الجديد', 'Category added');
  };

  const addBrand = (brandData: Omit<Brand, 'id'>) => {
    const newBrand: Brand = {
      ...brandData,
      id: `brand-${Date.now()}`,
    };
    setBrands((prev) => [...prev, newBrand]);
    addToast('success', 'تم إضافة العلامة التجارية', 'Brand added');
  };

  // Cart Functions
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    // Generate unique ID for cart item considering variants
    const cartItemId = `${product.id}-${color || 'default'}-${size || 'default'}`;
    const effectivePrice = product.isFlashSale && product.flashSalePrice ? product.flashSalePrice : product.price;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            product,
            quantity,
            selectedColor: color,
            selectedSize: size,
            price: effectivePrice,
          },
        ];
      }
    });

    addToast('success', `تم إضافة "${language === 'ar' ? product.titleAr : product.titleEn}" للسلة`, `Added "${product.titleEn}" to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minSpend) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscount = (cartSubtotal * appliedCoupon.discountValue) / 100;
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
  }

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);

    if (!found) {
      return {
        success: false,
        messageAr: 'كود الخصم غير صالح أو منتهي الصلاحية',
        messageEn: 'Invalid or expired coupon code',
      };
    }

    if (cartSubtotal < found.minSpend) {
      return {
        success: false,
        messageAr: `الحد الأدنى لاستخدام هذا الكود هو ${found.minSpend} ر.س`,
        messageEn: `Minimum spend for this coupon is SAR ${found.minSpend}`,
      };
    }

    setAppliedCoupon(found);
    addToast('success', `تم تطبيق كود الخصم "${found.code}"`, `Applied coupon "${found.code}"`);
    return {
      success: true,
      messageAr: 'تم تطبيق كود الخصم بنجاح!',
      messageEn: 'Coupon applied successfully!',
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('info', 'تم إزالة كود الخصم', 'Coupon removed');
  };

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  // Wishlist Functions
  const toggleWishlist = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.some((item) => item.productId === productId);
      if (exists) {
        addToast('info', 'تمت الإزالة من قائمة الرغبات', 'Removed from wishlist');
        return prev.filter((item) => item.productId !== productId);
      } else {
        addToast('success', 'تمت الإضافة لقائمة الرغبات', 'Added to wishlist');
        return [...prev, { productId, addedAt: new Date().toISOString() }];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  // Auth Functions
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0] || 'User',
      email,
      role,
      addresses: user?.addresses || INITIAL_USER.addresses,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    addToast('success', `مرحباً بك، ${newUser.name}!`, `Welcome, ${newUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    addToast('info', 'تم تسجيل الخروج', 'Logged out successfully');
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddr: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
    };
    const updatedAddresses = [...user.addresses, newAddr];
    setUser({ ...user, addresses: updatedAddresses });
    addToast('success', 'تم حفظ العنوان الجديد', 'Address saved successfully');
  };

  // Orders Functions
  const createOrder = (orderData: Omit<Order, 'id' | 'trackingNumber' | 'createdAt' | 'statusHistory'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      trackingNumber: `ALM-TRK-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      orderStatus: 'Pending',
      statusHistory: [
        {
          status: 'Pending',
          timestamp: new Date().toISOString(),
          note: 'Order placed successfully',
        },
      ],
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const newHistory = [
            ...ord.statusHistory,
            {
              status,
              timestamp: new Date().toISOString(),
              note: note || `Status updated to ${status}`,
            },
          ];
          return {
            ...ord,
            orderStatus: status,
            statusHistory: newHistory,
          };
        }
        return ord;
      })
    );
    addToast('success', `تم تحديث حالة الطلب إلى ${status}`, `Order status updated to ${status}`);
  };

  // Reviews
  const addReview = (productId: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userName: user ? user.name : 'عميل متجر ألما',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      isVerifiedPurchase: true,
    };
    setReviews((prev) => [newRev, ...prev]);
    
    // Recalculate product rating
    const prodReviews = [...reviews.filter((r) => r.productId === productId), newRev];
    const avgRating = prodReviews.reduce((acc, r) => acc + r.rating, 0) / prodReviews.length;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, rating: parseFloat(avgRating.toFixed(1)), reviewsCount: prodReviews.length }
          : p
      )
    );

    addToast('success', 'شكراً لك! تم إضافة تقييمك بنجاح', 'Thank you! Review submitted successfully');
  };

  // Coupons
  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usageCount'>) => {
    const newC: Coupon = {
      ...couponData,
      id: `c-${Date.now()}`,
      usageCount: 0,
    };
    setCoupons((prev) => [...prev, newC]);
    addToast('success', 'تم إنشاء كود التخفيض', 'Coupon created');
  };

  const toggleCouponActive = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Translation helper function
  const t = (key: TranslationKey): string => {
    const dict = translations[language] || translations.ar;
    return dict[key] || translations.ar[key] || key;
  };

  const getProdTitle = (product: Product) => getProductTitle(product, language);
  const getProdDesc = (product: Product) => getProductDescription(product, language);
  const getCatName = (category: Category) => getCategoryName(category, language);
  const getBrandDesc = (brand: Brand) => getBrandDescription(brand, language);

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getProductTitle: getProdTitle,
        getProductDescription: getProdDesc,
        getCategoryName: getCatName,
        getBrandDescription: getBrandDesc,
        darkMode,
        setDarkMode,
        settings,
        updateSettings,
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        selectedCategorySlug,
        setSelectedCategorySlug,
        searchQuery,
        setSearchQuery,
        products,
        categories,
        brands,
        coupons,
        reviews,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        addBrand,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        logout,
        addAddress,
        orders,
        createOrder,
        updateOrderStatus,
        addReview,
        addCoupon,
        toggleCouponActive,
        toasts,
        addToast,
        removeToast,
        quickViewProduct,
        setQuickViewProduct,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
