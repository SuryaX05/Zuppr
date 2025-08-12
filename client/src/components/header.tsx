import { useAppStore } from '@/lib/store';

export default function Header() {
  const { 
    setCurrentPage, 
    getCartItemCount, 
    toggleCart,
    setLoginModalOpen,
    user 
  } = useAppStore();

  const cartCount = getCartItemCount();

  return (
    <header className="fixed w-full top-0 z-50 gradient-bg shadow-lg" data-testid="header">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <button 
          className="flex items-center gap-2 hover:scale-105 transition-transform" 
          onClick={() => setCurrentPage('home')}
          data-testid="logo-button"
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-grado-orange font-black text-lg">Z</span>
          </div>
          <span className="text-2xl font-black text-white">Zuppr</span>
        </button>
        <nav className="flex items-center gap-6">
          <button 
            className="text-white font-semibold hover:-translate-y-1 transition-transform hidden md:block" 
            onClick={() => setCurrentPage('home')}
            data-testid="nav-home"
          >
            Home
          </button>
          <button 
            className="text-white font-semibold hover:-translate-y-1 transition-transform hidden md:block" 
            onClick={() => setCurrentPage('tracking')}
            data-testid="nav-tracking"
          >
            Track Order
          </button>
          <div 
            className="relative bg-white/15 p-3 rounded-full cursor-pointer hover:bg-white/25 transition-colors" 
            onClick={toggleCart}
            data-testid="cart-button"
          >
            <span className="text-white">🛒</span>
            {cartCount > 0 && (
              <span 
                className="absolute -top-2 -right-2 bg-grado-red text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                data-testid="cart-count"
              >
                {cartCount}
              </span>
            )}
          </div>
          <button 
            className="bg-white text-grado-orange px-4 py-2 rounded-full font-bold hover:bg-gray-100 hover:-translate-y-1 transition-all" 
            onClick={() => setLoginModalOpen(true)}
            data-testid="login-button"
          >
            {user ? `Hi, ${user.name.split(' ')[0]}` : 'Student Login'}
          </button>
        </nav>
      </div>
    </header>
  );
}
