import { Language, Product, Category, Brand } from '../types';

export interface TranslationKeys {
  // Common & Header
  storeName: string;
  tagline: string;
  collection2026: string;
  freeShippingBanner: string;
  trackOrder: string;
  home: string;
  allProducts: string;
  categories: string;
  brands: string;
  searchPlaceholder: string;
  suggestedResults: string;
  itemsCount: string;
  noResults: string;
  aiAdvisor: string;
  wishlist: string;
  cart: string;
  signIn: string;
  myAccount: string;
  adminDashboard: string;
  logOut: string;

  // Hero & Banners
  heroTitle: string;
  heroSubtitle: string;
  shopNow: string;
  exploreCollection: string;
  flashSale: string;
  newArrivals: string;
  bestSellers: string;
  featuredProducts: string;

  // Product Card & Details
  addToCart: string;
  outOfStock: string;
  quickView: string;
  sale: string;
  new: string;
  description: string;
  specifications: string;
  selectVariant: string;
  quantity: string;
  buyNow: string;
  reviews: string;
  writeReview: string;
  similarProducts: string;

  // Cart & Checkout
  cartTitle: string;
  subtotal: string;
  discount: string;
  couponCode: string;
  applyCoupon: string;
  shipping: string;
  tax: string;
  total: string;
  proceedToCheckout: string;
  emptyCart: string;
  checkoutTitle: string;
  shippingAddress: string;
  paymentMethod: string;
  creditCardStripe: string;
  payPal: string;
  cashOnDelivery: string;
  placeOrder: string;
  orderSummary: string;

  // Order Tracking
  trackingTitle: string;
  enterOrderOrTracking: string;
  trackBtn: string;
  orderStatus: string;
  orderHistory: string;

  // Admin
  adminTitle: string;
  productsMgmt: string;
  ordersMgmt: string;
  categoriesMgmt: string;
  couponsMgmt: string;
  settingsMgmt: string;
  addProduct: string;

  // Footer & Value Props
  expressDelivery: string;
  expressDeliveryDesc: string;
  authenticGuaranteed: string;
  authenticGuaranteedDesc: string;
  easyReturns: string;
  easyReturnsDesc: string;
  customerCare: string;
  customerCareDesc: string;
  vipNewsletter: string;
  enterEmail: string;
  subscribe: string;
  allRightsReserved: string;
}

export type TranslationKey = keyof TranslationKeys;

export const translations: Record<Language, TranslationKeys> = {
  ar: {
    storeName: 'ألما ستور',
    tagline: 'الفخامة العصرية والتكنولوجيا',
    collection2026: 'تشكيلة 2026 الحصرية',
    freeShippingBanner: 'توصيل مجاني داخل الرباط، تمارة وسلا — وخارجها 20 د.م.',
    trackOrder: 'تتبع طلبك',
    home: 'الرئيسية',
    allProducts: 'جميع المنتجات',
    categories: 'التصنيفات',
    brands: 'العلامات التجارية',
    searchPlaceholder: 'ابحث عن حامل سيارة، ساعة، سوار، مروحة، محولات، إلخ...',
    suggestedResults: 'نتائج البحث المقترحة',
    itemsCount: 'منتج',
    noResults: 'لم يتم العثور على منتجات مطابقة للبحث',
    aiAdvisor: 'المساعد الذكي',
    wishlist: 'المفضلة',
    cart: 'السلة',
    signIn: 'دخول / حساب',
    myAccount: 'حسابي والطلبات',
    adminDashboard: 'لوحة تحكم الأدمن',
    logOut: 'تسجيل الخروج',

    heroTitle: 'عالم ألما ستور للإكسسوارات والساعات والتكنولوجيا',
    heroSubtitle: 'اكتشف مجموعتنا الحصرية من حوامل الهواتف، الساعات الفاخرة، الأساور، مستلزمات السيارات والموتور، والمحولات.',
    shopNow: 'تسوق الآن',
    exploreCollection: 'استكشف التشكيلة',
    flashSale: 'عروض خاطفة',
    newArrivals: 'وصل حديثاً',
    bestSellers: 'الأكثر مبيعاً',
    featuredProducts: 'منتجات مختارة',

    addToCart: 'إضافة للسلة',
    outOfStock: 'نفد من المخزون',
    quickView: 'نظرة سريعة',
    sale: 'خصم',
    new: 'جديد',
    description: 'الوصف التفصيلي',
    specifications: 'المواصفات',
    selectVariant: 'اختر الخيار',
    quantity: 'الكمية',
    buyNow: 'شراء الآن',
    reviews: 'التقييمات',
    writeReview: 'أضف تقييمك',
    similarProducts: 'منتجات قد تعجبك',

    cartTitle: 'سلة التسوق الفاخرة',
    subtotal: 'المجموع الفرعي',
    discount: 'الخصم',
    couponCode: 'كود التخفيض',
    applyCoupon: 'تطبيق',
    shipping: 'الشحن والتوصيل',
    tax: 'ضريبة القيمة المضافة',
    total: 'الإجمالي النهائي',
    proceedToCheckout: 'متابعة الدفع الآمن',
    emptyCart: 'سلة التسوق فارغة حالياً',
    checkoutTitle: 'إتمام الطلب والدفع',
    shippingAddress: 'عنوان الشحن والتوصيل',
    paymentMethod: 'طريقة الدفع',
    creditCardStripe: 'بطاقة ائتمانية (Stripe)',
    payPal: 'بايبال (PayPal)',
    cashOnDelivery: 'الدفع عند الاستلام (COD)',
    placeOrder: 'تأكيد ودفع الطلب',
    orderSummary: 'ملخص الطلب',

    trackingTitle: 'تتبع حالة الشحنة',
    enterOrderOrTracking: 'أدخل رقم الطلب أو رقم التتبع (مثال: ORD-2026-8801)',
    trackBtn: 'بحث عن الطلب',
    orderStatus: 'حالة الطلب الحالي',
    orderHistory: 'سجل التتبع',

    adminTitle: 'لوحة إشراف المتجر',
    productsMgmt: 'إدارة المنتجات',
    ordersMgmt: 'إدارة الطلبات',
    categoriesMgmt: 'إدارة التصنيفات',
    couponsMgmt: 'كوبونات الخصم',
    settingsMgmt: 'إعدادات المتجر',
    addProduct: 'إضافة منتج جديد',

    expressDelivery: 'توصيل سريع وموثوق',
    expressDeliveryDesc: 'مجاني للطلبات فوق 500 د.م.',
    authenticGuaranteed: 'منتجات أصلية 100%',
    authenticGuaranteedDesc: 'ضمان جودة عالية معتمد',
    easyReturns: 'إرجاع سهل خلال 14 يوماً',
    easyReturnsDesc: 'سياسة استبدال مرنة بضغطة زر',
    customerCare: 'دعم عملاء 24/7',
    customerCareDesc: 'خدمة متميزة تليق بكم',
    vipNewsletter: 'انضم إلى قائمة VIP الخاصة بنا',
    enterEmail: 'أدخل بريدك الإلكتروني...',
    subscribe: 'اشتراك',
    allRightsReserved: 'جميع الحقوق محفوظة.',
  },
  fr: {
    storeName: 'ALMA STORE',
    tagline: 'Luxe Moderne & High-Tech',
    collection2026: 'Collection Exclusive 2026',
    freeShippingBanner: 'Livraison gratuite dès 500 DH',
    trackOrder: 'Suivi de commande',
    home: 'Accueil',
    allProducts: 'Tous les produits',
    categories: 'Catégories',
    brands: 'Marques',
    searchPlaceholder: 'Rechercher support voiture, montre, bracelet, ventilateur...',
    suggestedResults: 'Suggérés',
    itemsCount: 'produits',
    noResults: 'Aucun produit trouvé',
    aiAdvisor: 'Assistant IA',
    wishlist: 'Favoris',
    cart: 'Panier',
    signIn: 'Connexion',
    myAccount: 'Mon Compte',
    adminDashboard: 'Tableau de bord Admin',
    logOut: 'Déconnexion',

    heroTitle: 'ALMA STORE - Accessoires, Horlogerie & High-Tech',
    heroSubtitle: 'Découvrez notre sélection exclusive de supports voiture, montres, bracelets, accessoires moto, adaptateurs et plus encore.',
    shopNow: 'Acheter Maintenant',
    exploreCollection: 'Découvrir la Collection',
    flashSale: 'Ventes Flash',
    newArrivals: 'Nouveautés',
    bestSellers: 'Meilleures Ventes',
    featuredProducts: 'Produits Vedettes',

    addToCart: 'Ajouter au panier',
    outOfStock: 'Rupture de stock',
    quickView: 'Aperçu rapide',
    sale: 'Promo',
    new: 'Nouveau',
    description: 'Description',
    specifications: 'Spécifications',
    selectVariant: 'Choisir option',
    quantity: 'Quantité',
    buyNow: 'Acheter',
    reviews: 'Avis clients',
    writeReview: 'Donner votre avis',
    similarProducts: 'Produits similaires',

    cartTitle: 'Mon Panier de Luxe',
    subtotal: 'Sous-total',
    discount: 'Remise',
    couponCode: 'Code promo',
    applyCoupon: 'Appliquer',
    shipping: 'Frais de livraison',
    tax: 'TVA',
    total: 'Total',
    proceedToCheckout: 'Commander en toute sécurité',
    emptyCart: 'Votre panier est vide',
    checkoutTitle: 'Validation de commande',
    shippingAddress: 'Adresse de livraison',
    paymentMethod: 'Mode de paiement',
    creditCardStripe: 'Carte bancaire (Stripe)',
    payPal: 'PayPal',
    cashOnDelivery: 'Paiement à la livraison',
    placeOrder: 'Confirmer la commande',
    orderSummary: 'Récapitulatif',

    trackingTitle: 'Suivi de colis',
    enterOrderOrTracking: 'Entrez le numéro de commande ou suivi (ex: ORD-2026-8801)',
    trackBtn: 'Rechercher',
    orderStatus: 'Statut de commande',
    orderHistory: 'Historique de suivi',

    adminTitle: 'Administration ALMA',
    productsMgmt: 'Gestion Produits',
    ordersMgmt: 'Gestion Commandes',
    categoriesMgmt: 'Catégories',
    couponsMgmt: 'Codes Promo',
    settingsMgmt: 'Paramètres',
    addProduct: 'Ajouter un produit',

    expressDelivery: 'Livraison Express',
    expressDeliveryDesc: 'Gratuite dès 500 DH',
    authenticGuaranteed: '100% Authentique',
    authenticGuaranteedDesc: 'Qualité certifiée',
    easyReturns: 'Retours sous 14 jours',
    easyReturnsDesc: 'Procédure simple et rapide',
    customerCare: 'Service Client 24/7',
    customerCareDesc: 'Conseillers dédiés',
    vipNewsletter: 'Rejoignez le Club VIP ALMA',
    enterEmail: 'Votre e-mail...',
    subscribe: "S'abonner",
    allRightsReserved: 'Tous droits réservés.',
  },
  en: {
    storeName: 'ALMA STORE',
    tagline: 'Modern Luxury & High-Tech',
    collection2026: 'Exclusive 2026 Collection',
    freeShippingBanner: 'Free delivery in Rabat, Temara & Salé — 20 MAD outside these cities',
    trackOrder: 'Track Order',
    home: 'Home',
    allProducts: 'All Products',
    categories: 'Categories',
    brands: 'Brands',
    searchPlaceholder: 'Search car mounts, watches, bracelets, adapters...',
    suggestedResults: 'Suggested Products',
    itemsCount: 'items',
    noResults: 'No matching products found',
    aiAdvisor: 'AI Advisor',
    wishlist: 'Wishlist',
    cart: 'Cart',
    signIn: 'Sign In',
    myAccount: 'My Account',
    adminDashboard: 'Admin Dashboard',
    logOut: 'Log Out',

    heroTitle: 'ALMA STORE - Tech, Accessories & Timepieces',
    heroSubtitle: 'Explore top quality car mounts, luxury watches, bracelets, motorcycle gear, adapters & more.',
    shopNow: 'Shop Now',
    exploreCollection: 'Explore Collection',
    flashSale: 'Flash Sale',
    newArrivals: 'New Arrivals',
    bestSellers: 'Best Sellers',
    featuredProducts: 'Featured Items',

    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    quickView: 'Quick View',
    sale: 'Sale',
    new: 'New',
    description: 'Description',
    specifications: 'Specifications',
    selectVariant: 'Select Variant',
    quantity: 'Quantity',
    buyNow: 'Buy Now',
    reviews: 'Reviews',
    writeReview: 'Write a Review',
    similarProducts: 'You May Also Like',

    cartTitle: 'Shopping Cart',
    subtotal: 'Subtotal',
    discount: 'Discount',
    couponCode: 'Coupon Code',
    applyCoupon: 'Apply',
    shipping: 'Shipping Fee',
    tax: 'VAT (15%)',
    total: 'Total',
    proceedToCheckout: 'Proceed to Secure Checkout',
    emptyCart: 'Your cart is currently empty',
    checkoutTitle: 'Checkout & Payment',
    shippingAddress: 'Shipping Address',
    paymentMethod: 'Payment Method',
    creditCardStripe: 'Credit Card (Stripe)',
    payPal: 'PayPal',
    cashOnDelivery: 'Cash on Delivery (COD)',
    placeOrder: 'Place Order',
    orderSummary: 'Order Summary',

    trackingTitle: 'Track Shipment',
    enterOrderOrTracking: 'Enter Order Number or Tracking ID (e.g. ORD-2026-8801)',
    trackBtn: 'Track',
    orderStatus: 'Order Status',
    orderHistory: 'Tracking History',

    adminTitle: 'Store Admin Portal',
    productsMgmt: 'Products',
    ordersMgmt: 'Orders',
    categoriesMgmt: 'Categories',
    couponsMgmt: 'Coupons',
    settingsMgmt: 'Settings',
    addProduct: 'Add New Product',

    expressDelivery: 'Express Delivery',
    expressDeliveryDesc: 'Free over SAR 350',
    authenticGuaranteed: '100% Authentic',
    authenticGuaranteedDesc: 'Certified luxury craftsmanship',
    easyReturns: '14-Day Easy Returns',
    easyReturnsDesc: 'Hassle-free exchange policy',
    customerCare: '24/7 VIP Support',
    customerCareDesc: 'Dedicated concierge care',
    vipNewsletter: 'Join ALMA VIP Circle',
    enterEmail: 'Enter your email...',
    subscribe: 'Subscribe',
    allRightsReserved: 'All rights reserved.',
  },
};

export function getProductTitle(product: Product, lang: Language): string {
  if (lang === 'ar') return product.titleAr;
  if (lang === 'fr') return product.titleFr || product.titleEn;
  return product.titleEn;
}

export function getProductDescription(product: Product, lang: Language): string {
  if (lang === 'ar') return product.descriptionAr;
  if (lang === 'fr') return product.descriptionFr || product.descriptionEn;
  return product.descriptionEn;
}

export function getCategoryName(category: Category, lang: Language): string {
  if (lang === 'ar') return category.nameAr;
  if (lang === 'fr') return category.nameFr || category.nameEn;
  return category.nameEn;
}

export function getBrandDescription(brand: Brand, lang: Language): string {
  if (lang === 'ar') return brand.descriptionAr;
  if (lang === 'fr') return brand.descriptionFr || brand.descriptionEn;
  return brand.descriptionEn;
}

export function formatPrice(amount: number | string, lang: Language = 'ar'): string {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  const rounded = Number.isInteger(num) ? num.toString() : num.toFixed(2);
  if (lang === 'ar') {
    return `${rounded} د.م.`;
  }
  return `${rounded} MAD`;
}
