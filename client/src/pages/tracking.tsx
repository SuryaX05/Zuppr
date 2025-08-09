import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';

const orderStatuses = [
  { id: 1, name: 'Confirmed', icon: '✅' },
  { id: 2, name: 'Preparing', icon: '👨‍🍳' },
  { id: 3, name: 'On the way', icon: '🚗' },
  { id: 4, name: 'Delivered', icon: '🎉' }
];

export default function Tracking() {
  const { currentOrder, setCurrentPage } = useAppStore();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!currentOrder) return;

    // Simulate order progress
    const timer1 = setTimeout(() => setCurrentStep(2), 2000);
    const timer2 = setTimeout(() => setCurrentStep(3), 6000);
    const timer3 = setTimeout(() => {
      setCurrentStep(4);
      alert('🎉 Your order has been delivered! Enjoy your meal!');
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [currentOrder]);

  const getProgressWidth = () => {
    return ((currentStep - 1) / (orderStatuses.length - 1)) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50" data-testid="tracking-page">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button 
          className="gradient-bg text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform mb-6" 
          onClick={() => setCurrentPage('home')}
          data-testid="back-to-home-button"
        >
          ← Back to Home
        </button>

        <h2 className="text-3xl font-black text-center mb-8 text-gray-800" data-testid="tracking-title">
          Track Your Order 📦
        </h2>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <div className="text-xl font-bold text-gray-800" data-testid="order-number">
              Order #{currentOrder?.id || 'GRD001'}
            </div>
            <div className="text-gray-600" data-testid="estimated-time">
              Estimated delivery: {currentOrder?.estimatedTime || '25 mins'}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-8">
            <div className="flex justify-between items-center relative z-10">
              {orderStatuses.map((status, index) => (
                <div key={status.id} className="flex flex-col items-center" data-testid={`step-${status.id}`}>
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                      index < currentStep 
                        ? 'bg-grado-orange text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}
                    data-testid={`step-circle-${status.id}`}
                  >
                    {status.icon}
                  </div>
                  <span className="text-sm mt-2 font-semibold" data-testid={`step-name-${status.id}`}>
                    {status.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
            <div 
              className="absolute top-6 left-0 h-1 gradient-bg -z-10 progress-fill" 
              style={{ width: `${getProgressWidth()}%` }}
              data-testid="progress-fill"
            ></div>
          </div>

          {/* Current Status */}
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800 mb-2" data-testid="current-status">
              {currentStep === 1 && 'Order Confirmed! 🎉'}
              {currentStep === 2 && 'Preparing Your Food... 👨‍🍳'}
              {currentStep === 3 && 'On the Way to Your Hostel! 🚗'}
              {currentStep === 4 && 'Delivered! Enjoy Your Meal! 🎉'}
            </div>
            <p className="text-gray-600" data-testid="status-description">
              {currentStep === 1 && 'Your order has been confirmed and sent to the restaurant.'}
              {currentStep === 2 && 'Our chefs are preparing your delicious food.'}
              {currentStep === 3 && 'Your order is on the way to your hostel.'}
              {currentStep === 4 && 'Your order has been delivered successfully!'}
            </p>
            
            {currentStep < 4 && (
              <button 
                className="mt-4 gradient-bg text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                onClick={() => setCurrentStep(Math.min(currentStep + 1, 4))}
                data-testid="simulate-progress-button"
              >
                Simulate Next Step
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
