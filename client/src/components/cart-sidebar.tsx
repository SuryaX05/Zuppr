import { useAppStore } from '@/lib/store';

export default function CartSidebar() {
  const { 
    cart, 
    isCartOpen, 
    toggleCart, 
    updateQuantity, 
    getCartTotal,
    setCurrentPage 
  } = useAppStore();

  const total = getCartTotal();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setCurrentPage('checkout');
    toggleCart();
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={toggleCart}
          data-testid="cart-backdrop"
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full md:w-96`}
        data-testid="cart-sidebar"
      >
        {/* Header */}
        <div className="gradient-bg text-white p-6 text-center relative">
          <h3 className="text-xl font-bold" data-testid="cart-title">Your Cart 🛒</h3>
          <button 
            className="absolute top-4 right-4 text-white text-2xl hover:scale-110 transition-transform" 
            onClick={toggleCart}
            data-testid="cart-close"
          >
            ×
          </button>
        </div>
        
        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4" data-testid="cart-items">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-8" data-testid="cart-empty">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center py-3 border-b border-gray-200 cart-item-enter"
                  data-testid={`cart-item-${item.id}`}
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800" data-testid={`item-name-${item.id}`}>
                      {item.name}
                    </div>
                    <div className="text-grado-orange font-bold" data-testid={`item-price-${item.id}`}>
                      ₹{item.price}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="w-8 h-8 bg-grado-orange text-white rounded-full hover:scale-110 transition-transform" 
                      onClick={() => updateQuantity(item.id, -1)}
                      data-testid={`decrease-quantity-${item.id}`}
                    >
                      −
                    </button>
                    <span className="font-bold" data-testid={`quantity-${item.id}`}>
                      {item.quantity}
                    </span>
                    <button 
                      className="w-8 h-8 bg-grado-orange text-white rounded-full hover:scale-110 transition-transform" 
                      onClick={() => updateQuantity(item.id, 1)}
                      data-testid={`increase-quantity-${item.id}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t-2 border-grado-orange p-4">
          <div className="text-xl font-black text-center mb-4" data-testid="cart-total">
            Total: ₹{total}
          </div>
          <button 
            className="w-full gradient-bg text-white py-3 rounded-lg font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            data-testid="checkout-button"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
