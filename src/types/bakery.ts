export interface Flavor {
  id: string;
  name: string;
  tagline: string;
  category: 'signature' | 'botanical' | 'chocolate' | 'seasonal';
  priceSingle: number;
  priceDozen: number;
  image: string;
  crumb: string;
  filling: string;
  shell: string;
  finish: string;
  tastingNotes: string[];
  dietary: ('gluten-friendly' | 'vegetarian' | 'nut-free' | 'contains-nuts')[];
  description: string;
  bestseller?: boolean;
}

export interface BoxSizeOption {
  id: string;
  name: string;
  count: number;
  price: number;
  description: string;
  popular?: boolean;
}

export interface StickOption {
  id: string;
  name: string;
  colorHex: string;
  description: string;
}

export interface RibbonOption {
  id: string;
  name: string;
  colorHex: string;
  borderHex: string;
}

export interface CustomBoxItem {
  id: string;
  size: BoxSizeOption;
  selectedFlavors: { flavorId: string; count: number }[];
  stick: StickOption;
  ribbon: RibbonOption;
  giftNote?: {
    recipient: string;
    message: string;
    sender: string;
  };
  totalPrice: number;
}

export interface CartItem {
  id: string;
  type: 'custom-box' | 'dozen-pack';
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
  details?: string[];
  customBoxData?: CustomBoxItem;
}

export interface CateringInquiry {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: number;
  eventType: 'wedding' | 'corporate' | 'birthday' | 'baby-shower' | 'other';
  displayStyle: 'tower' | 'individual' | 'platters' | 'bouquet';
  colorPalette: string;
  dietaryRequests: string;
  notes: string;
}
