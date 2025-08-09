import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { menuItems } from '@/lib/store';

export default function Menu() {
  const { 
    setCurrentPage, 
    addToCart, 
    reviews, 
    addReview, 
    user,
    searchQuery 
  } = useAppStore();

  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewImages, setReviewImages] = useState<File[]>([]);

  const biryaniItems = menuItems.filter(item => item.category === 'biryani');
  const riceItems = menuItems.filter(item => item.category === 'rice');

  // Filter items based on search query
  const filterItems = (items: typeof menuItems) => {
    if (!searchQuery) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredBiryaniItems = filterItems(biryaniItems);
  const filteredRiceItems = filterItems(riceItems);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart(item);
    // Simple feedback
    const button = document.activeElement as HTMLButtonElement;
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Added ✓';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1000);
    }
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReviewImages(files);
  };

  const handlePostReview = () => {
    if (!reviewText.trim()) {
      alert('Please write a review');
      return;
    }

    const review = {
      text: reviewText,
      rating: reviewRating,
      date: new Date().toLocaleDateString(),
      author: user ? user.name : 'Anonymous Student',
    };

    addReview(review);
    setReviewText('');
    setReviewRating(5);
    setReviewImages([]);
    alert('Thank you for your review!');
  };

  return (
    <div className="min-h-screen bg-gray-50" data-testid="menu-page">
      {/* Back Button */}
      <div className="px-4 py-4">
        <button 
          className="gradient-bg text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform mb-4" 
          onClick={() => setCurrentPage('home')}
          data-testid="back-button"
        >
          ← Back to Home
        </button>
      </div>
      
      {/* Restaurant Header */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <h1 className="text-4xl font-black text-grado-orange mb-2" data-testid="restaurant-title">
            🍛 VFC - Vizag Food Corner
          </h1>
          <p className="text-gray-600" data-testid="restaurant-subtitle">
            Authentic flavors for hungry students!
          </p>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Biryani Section */}
        {filteredBiryaniItems.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-black text-gray-800 border-b-4 border-grado-orange pb-2 mb-6" data-testid="biryani-title">
              🍛 Biryani
            </h2>
            <div className="space-y-4" data-testid="biryani-items">
              {filteredBiryaniItems.map((item) => (
                <div 
                  key={item.id}
                  className={`flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 hover:translate-x-2 transition-all ${
                    searchQuery && item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
                      ? 'bg-yellow-100 border-2 border-yellow-400' 
                      : ''
                  }`}
                  data-testid={`menu-item-${item.id}`}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1" data-testid={`item-name-${item.id}`}>
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2" data-testid={`item-description-${item.id}`}>
                      {item.description}
                    </p>
                    <div className="text-xl font-bold text-grado-orange" data-testid={`item-price-${item.id}`}>
                      ₹{item.price}
                    </div>
                  </div>
                  <button 
                    className="gradient-bg text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform" 
                    onClick={() => handleAddToCart(item)}
                    data-testid={`add-to-cart-${item.id}`}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fried Rice Section */}
        {filteredRiceItems.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-black text-gray-800 border-b-4 border-grado-orange pb-2 mb-6" data-testid="rice-title">
              🍚 Fried Rice
            </h2>
            <div className="space-y-4" data-testid="rice-items">
              {filteredRiceItems.map((item) => (
                <div 
                  key={item.id}
                  className={`flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 hover:translate-x-2 transition-all ${
                    searchQuery && item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
                      ? 'bg-yellow-100 border-2 border-yellow-400' 
                      : ''
                  }`}
                  data-testid={`menu-item-${item.id}`}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1" data-testid={`item-name-${item.id}`}>
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2" data-testid={`item-description-${item.id}`}>
                      {item.description}
                    </p>
                    <div className="text-xl font-bold text-grado-orange" data-testid={`item-price-${item.id}`}>
                      ₹{item.price}
                    </div>
                  </div>
                  <button 
                    className="gradient-bg text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform" 
                    onClick={() => handleAddToCart(item)}
                    data-testid={`add-to-cart-${item.id}`}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results message */}
        {searchQuery && filteredBiryaniItems.length === 0 && filteredRiceItems.length === 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center" data-testid="no-results">
            <p className="text-gray-600">No items found for "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-black text-gray-800 mb-2" data-testid="reviews-title">Reviews</h3>
        <p className="text-gray-600 mb-6" data-testid="reviews-subtitle">
          Share your experience — helps other students pick the best dish.
        </p>
        
        {/* Review Form */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" data-testid="review-text-label">
              Your review
            </label>
            <textarea 
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={3} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-grado-orange" 
              placeholder="What did you like? Any tips?"
              data-testid="review-text-input"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" data-testid="review-rating-label">
              Rating
            </label>
            <select 
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-grado-orange"
              data-testid="review-rating-select"
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Okay</option>
              <option value="1">1 - Bad</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" data-testid="review-images-label">
              Add images (optional)
            </label>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleImagePreview}
              className="w-full p-3 border border-gray-300 rounded-lg"
              data-testid="review-images-input"
            />
            {reviewImages.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2" data-testid="review-images-preview">
                {reviewImages.map((file, index) => (
                  <img 
                    key={index}
                    src={URL.createObjectURL(file)} 
                    alt={`Preview ${index}`}
                    className="w-20 h-16 object-cover rounded-lg" 
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="text-right">
            <button 
              className="gradient-bg text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform" 
              onClick={handlePostReview}
              data-testid="post-review-button"
            >
              Post Review
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div data-testid="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-4 shadow-lg mb-4" data-testid={`review-${review.id}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-gray-800" data-testid={`review-author-${review.id}`}>
                  {review.author}
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-grado-orange text-white px-2 py-1 rounded-full text-sm" data-testid={`review-rating-${review.id}`}>
                    {review.rating}⭐
                  </span>
                  <span className="text-gray-500 text-sm" data-testid={`review-date-${review.id}`}>
                    {review.date}
                  </span>
                </div>
              </div>
              <p className="text-gray-700" data-testid={`review-text-${review.id}`}>
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
