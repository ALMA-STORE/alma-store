export type Language = 'ar' | 'fr' | 'en';

export type Role = 'customer' | 'admin';

export type OrderStatus = 'Pending' | 'Paid' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export type PaymentMethod = 'stripe' | 'paypal' | 'cod';

export interface ProductVariant {
  id?: string;
  name: string; // e.g. "Size", "Color"
  options: string[]; // e.g. ["S", "M", "L", "XL"] or ["Black", "Gold", "Navy"]
}

export interface Product {
  id: string;
  titleAr: string;
  titleEn: string;
  titleFr?: string;
  descriptionAr: string;
  descriptionEn: string;
  descriptionFr?: string;
  price: number;
  originalPrice?: number;
  sku: string;
  stock?: number;
  inStock?: boolean;
  categoryId?: string;
  categorySlug?: string;
  brandId?: string;
  brand?: string;
  image?: string;
  images?: string[];
  gallery?: string[];
  badge?: string;
  videoUrl?: string;
  variants?: ProductVariant[];
  tags: string[];
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
  flashSalePrice?: number;
  createdAt?: string;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr?: string;
  slug: string;
  image: string;
  itemCount: number;
  icon?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  descriptionAr: string;
  descriptionEn: string;
  descriptionFr?: string;
  country: string;
}

export interface CartItem {
  id: string; // unique cart item id
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  price: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Address {
  id: string;
  title: string; // e.g. "Home", "Office"
  fullName: string;
  phone: string;
  city: string;
  addressLine: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  titleAr: string;
  titleEn: string;
  image: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  trackingNumber?: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: Address | string;
  city?: string;
  items: any[];
  subtotal?: number;
  discount?: number;
  shippingFee?: number;
  tax?: number;
  total?: number;
  totalAmount?: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  paymentStatus?: 'Pending' | 'Paid' | 'Failed';
  orderStatus?: OrderStatus;
  status?: OrderStatus | string;
  statusHistory?: {
    status: OrderStatus | string;
    timestamp: string;
    note?: string;
  }[];
  createdAt: string;
  estimatedDelivery?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: Role;
  addresses: Address[];
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  expiryDate: string;
  usageCount: number;
  maxUsage?: number;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedPurchase: boolean;
}

export interface StoreNotification {
  id: string;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  type: 'info' | 'order' | 'promo' | 'alert';
  read: boolean;
  date: string;
}

export interface StoreSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  currencySymbolAr: string;
  currencySymbolEn: string;
  currencyCode: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  taxPercentage: number;
  enableAiAssistant: boolean;
}
