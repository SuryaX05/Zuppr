import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem, User, Order, Page, Review } from './types';

interface AppState {
  // Navigation
  currentPage: Page;
  setCurrentPage: (page: Page) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, change: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getPlatformFee: () => number;
  getFinalTotal: () => number;

  // User
  user: User | null;
  setUser: (user: User | null) => void;

  // Modal
  isLoginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;

  // Orders
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id'>) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Menu data
export const menuItems: MenuItem[] = [
  // Biryani
  { id: 1, name: "Chicken Biryani", price: 180, description: "Aromatic basmati rice with tender chicken", category: 'biryani' },
  { id: 2, name: "Mutton Biryani", price: 220, description: "Rich and flavorful mutton biryani", category: 'biryani' },
  { id: 3, name: "Veg Biryani", price: 150, description: "Fragrant vegetable biryani with saffron", category: 'biryani' },
  { id: 4, name: "Egg Biryani", price: 140, description: "Delicious biryani topped with boiled eggs", category: 'biryani' },
  
  // Rice
  { id: 5, name: "Chicken Fried Rice", price: 160, description: "Wok-tossed rice with chicken and vegetables", category: 'rice' },
  { id: 6, name: "Veg Fried Rice", price: 130, description: "Colorful vegetable fried rice", category: 'rice' },
  { id: 7, name: "Schezwan Fried Rice", price: 170, description: "Spicy Indo-Chinese fried rice", category: 'rice' },
  { id: 8, name: "Egg Fried Rice", price: 140, description: "Classic fried rice with scrambled eggs", category: 'rice' },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Navigation
      currentPage: 'home',
      setCurrentPage: (page) => set({ currentPage: page, isCartOpen: false }),

      // Cart
      cart: [],
      isCartOpen: false,
      addToCart: (item) => {
        const cart = get().cart;
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
          set({
            cart: cart.map(cartItem =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          });
        } else {
          set({
            cart: [...cart, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
          });
        }
      },
      removeFromCart: (itemId) => {
        set({ cart: get().cart.filter(item => item.id !== itemId) });
      },
      updateQuantity: (itemId, change) => {
        const cart = get().cart;
        const item = cart.find(cartItem => cartItem.id === itemId);
        
        if (item) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) {
            get().removeFromCart(itemId);
          } else {
            set({
              cart: cart.map(cartItem =>
                cartItem.id === itemId
                  ? { ...cartItem, quantity: newQuantity }
                  : cartItem
              )
            });
          }
        }
      },
      clearCart: () => set({ cart: [] }),
      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      getCartItemCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
      getSubtotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        return subtotal > 0 ? 20 : 0; // ₹20 delivery fee if cart has items
      },
      getPlatformFee: () => {
        const subtotal = get().getSubtotal();
        return subtotal > 0 ? 5 : 0; // ₹5 platform fee if cart has items
      },
      getFinalTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal + get().getDeliveryFee() + get().getPlatformFee();
      },

      // User
      user: null,
      setUser: (user) => set({ user }),

      // Modal
      isLoginModalOpen: false,
      setLoginModalOpen: (open) => set({ isLoginModalOpen: open }),

      // Orders
      currentOrder: null,
      setCurrentOrder: (order) => set({ currentOrder: order }),

      // Reviews
      reviews: [
        {
          id: 1,
          text: "Amazing chicken biryani! Perfect for late night study sessions.",
          rating: 5,
          date: "2024-01-15",
          author: "CSE Student"
        },
        {
          id: 2,
          text: "Good portion size and quick delivery to hostel.",
          rating: 4,
          date: "2024-01-14",
          author: "ECE Student"
        }
      ],
      addReview: (review) => {
        const newReview = { ...review, id: Date.now() };
        set({ reviews: [newReview, ...get().reviews] });
      },

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'grado-app-storage',
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        reviews: state.reviews,
      }),
    }
  )
);
