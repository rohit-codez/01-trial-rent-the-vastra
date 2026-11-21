export type Gender = 'women' | 'men' | 'kids' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free Size' | '0-6M' | '6-12M' | '1-2Y' | '2-4Y' | '4-6Y' | '6-8Y' | '8-10Y' | '10-12Y' | '12-14Y';
export type BookingStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  size: Size;
  color: string;
  quantity: number;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  gender: Gender;
  description: string;
  rentalPrice3Day: number;
  rentalPrice5Day: number;
  rentalPrice7Day: number;
  securityDeposit: number;
  retailPrice: number;
  fabric: string;
  color: string;
  workType: string;
  occasionTags: string[];
  images: string[];
  sizes: Size[];
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  designerName: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  gender: Gender;
  description: string;
  image: string;
  subcategories: string[];
}

export interface Occasion {
  id: string;
  name: string;
  slug: string;
  description: string;
  recommendedCategories: string[];
  popularColors: string[];
  image: string;
  seasonalRelevance: string[];
}

export interface RentalAccessory {
  id: string;
  productId: string;
  rentalPrice: number;
}

export interface RentalItem {
  id: string;
  productId: string;
  variantId: string;
  duration: 3 | 5 | 7;
  startDate: string;
  endDate: string;
  rentalPrice: number;
  securityDeposit: number;
  accessories?: RentalAccessory[];
}

export interface RentalBooking {
  id: string;
  referenceId: string;
  userId: string;
  items: RentalItem[];
  totalRentalPrice: number;
  totalSecurityDeposit: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  shippingAddressId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SecurityDeposit {
  id: string;
  bookingId: string;
  amount: number;
  status: 'held' | 'refunded' | 'deducted';
  refundId?: string;
  deductionReason?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  status: PaymentStatus;
  gatewayTransactionId: string;
  createdAt: string;
}

export interface Refund {
  id: string;
  paymentId: string;
  amount: number;
  status: PaymentStatus;
  reason: string;
  processedAt?: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  addresses: Address[];
  createdAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  contactEmail: string;
  contactPhone: string;
  joinedAt: string;
}

export interface VendorProduct {
  id: string;
  vendorId: string;
  productId: string;
  status: 'active' | 'inactive' | 'pending_approval';
}

export interface VendorEarning {
  id: string;
  vendorId: string;
  bookingId: string;
  amount: number;
  status: 'pending' | 'paid';
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  addedAt: string;
}

export interface UserPreference {
  favoriteColors: string[];
  usualSize: Size;
  preferredStyles: string[];
  upcomingOccasions: string[];
}

export interface StyleProfile {
  userId: string;
  preferences: UserPreference;
  bodyType?: string;
  skinTone?: string;
}

export interface AIRecommendation {
  productId: string;
  reason: string;
  matchScore: number;
}

export interface StylistQuestion {
  id: string;
  text: string;
  type: 'multiple_choice' | 'text' | 'image_upload';
  options?: string[];
}

export interface StylistAnswer {
  questionId: string;
  answer: string | string[];
}

export interface AIStylistSession {
  id: string;
  userId: string;
  answers: StylistAnswer[];
  recommendations: AIRecommendation[];
  createdAt: string;
}

export interface CartItem {
  id: string;
  product: Product;
  size: Size;
  duration: 3 | 5 | 7;
  accessories: Product[];
  rentalDate: string;
}

export interface Cart {
  items: CartItem[];
  totalRental: number;
  totalDeposit: number;
  total: number;
}
