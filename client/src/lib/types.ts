export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: 'biryani' | 'rice';
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Review {
  id: number;
  text: string;
  rating: number;
  date: string;
  author: string;
  images?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  studentId?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  address: string;
  paymentMethod: string;
  status: 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered';
  estimatedTime: string;
  createdAt: Date;
}

export type Page = 'home' | 'vfc-menu' | 'checkout' | 'tracking';
