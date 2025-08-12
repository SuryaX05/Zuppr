import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function Checkout() {
  const { 
    cart, 
    getSubtotal,
    getDeliveryFee,
    getPlatformFee,
    getFinalTotal,
    setCurrentPage, 
    clearCart, 
    setCurrentOrder,
    user,
    setLoginModalOpen
  } = useAppStore();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const platformFee = getPlatformFee();
  const total = getFinalTotal();

  const handlePlaceOrder = () => {
    if (!user) {
      alert('Please login to place an order');
      setLoginModalOpen(true);
      return;
    }

    if (!address.trim()) {
      alert('Please enter your delivery address');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Create order
    const order = {
      id: 'GRD' + Math.random().toString().substr(2, 6),
      items: [...cart],
      total,
      address,
      paymentMethod,
      status: 'confirmed' as const,
      estimatedTime: '25-30 mins',
      createdAt: new Date()
    };

    // Simulate payment process
    if (paymentMethod === 'upi') {
      const confirmed = confirm(`Proceed to pay ₹${total} via UPI? (simulation)`);
      if (!confirmed) return;
    }

    setCurrentOrder(order);
    clearCart();
    setCurrentPage('tracking');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" data-testid="checkout-empty">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <button 
            className="gradient-bg text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            onClick={() => setCurrentPage('vfc-menu')}
            data-testid="browse-menu-button"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="checkout-page">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          className="gradient-bg text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform mb-6" 
          onClick={() => setCurrentPage('vfc-menu')}
          data-testid="back-to-menu-button"
        >
          ← Back to Menu
        </button>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-black text-gray-800 mb-4" data-testid="order-summary-title">
              🛒 Your Order
            </h2>
            <div className="space-y-3" data-testid="checkout-items">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center py-2"
                  data-testid={`checkout-item-${item.id}`}
                >
                  <div>
                    <span className="font-semibold" data-testid={`checkout-item-name-${item.id}`}>
                      {item.name}
                    </span>
                    <span className="text-gray-600 ml-2" data-testid={`checkout-item-quantity-${item.id}`}>
                      x{item.quantity}
                    </span>
                  </div>
                  <div className="font-bold text-grado-orange" data-testid={`checkout-item-total-${item.id}`}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-grado-orange pt-4 mt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between" data-testid="checkout-subtotal">
                  <span>Subtotal:</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between" data-testid="checkout-delivery-fee">
                  <span>Delivery Fee:</span>
                  <span className="font-bold">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between" data-testid="checkout-platform-fee">
                  <span>Platform Fee:</span>
                  <span className="font-bold">₹{platformFee}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-xl font-black" data-testid="checkout-total">
                  <span>Total:</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-black text-gray-800 mb-4" data-testid="delivery-address-title">
              📍 Delivery Address
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" data-testid="address-label">
                Hostel Block & Room
              </label>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-grado-orange" 
                placeholder="e.g., Block A, Room 201"
                data-testid="address-input"
              />
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-black text-gray-800 mb-4" data-testid="payment-options-title">
              💳 Payment Options
            </h3>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer" data-testid="payment-upi-option">
                <input 
                  type="radio" 
                  name="payment" 
                  value="upi" 
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                  data-testid="payment-upi-radio"
                /> 
                <span className="font-semibold">UPI Payment</span>
              </label>
              <label className="flex items-center cursor-pointer" data-testid="payment-cod-option">
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                  data-testid="payment-cod-radio"
                /> 
                <span className="font-semibold">Cash on Delivery</span>
              </label>
            </div>
            <button 
              className="w-full gradient-bg text-white py-4 rounded-lg text-lg font-bold mt-6 hover:scale-105 transition-transform" 
              onClick={handlePlaceOrder}
              data-testid="place-order-button"
            >
              Place Order 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
