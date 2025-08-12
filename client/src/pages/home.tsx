import { useAppStore } from '@/lib/store';

export default function Home() {
  const { setCurrentPage, setSearchQuery, searchQuery } = useAppStore();

  const scrollToSearch = () => {
    const searchElement = document.getElementById('search');
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCurrentPage('vfc-menu');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <div className="gradient-hero text-white text-center py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 slide-up">
          <h1 className="text-5xl md:text-6xl font-black mb-4 drop-shadow-lg" data-testid="hero-title">
            Zip Up Your Hunger! 🚀
          </h1>
          <p className="text-xl mb-8 opacity-90" data-testid="hero-subtitle">
            Late-night cravings? We've got you covered! Fast delivery exclusively for GITAM University students.
          </p>
          <button 
            className="bg-white text-grado-orange px-8 py-4 rounded-full text-xl font-black hover:scale-105 hover:shadow-2xl transition-all" 
            onClick={scrollToSearch}
            data-testid="cta-button"
          >
            Start Ordering Now
          </button>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-4 h-4 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-2 h-2 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-white rounded-full animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gray-50 py-16 px-4" id="search">
        <div className="max-w-3xl mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-full text-lg focus:outline-none focus:border-grado-orange focus:shadow-lg transition-all" 
              placeholder="What's your craving tonight? 🌙"
              data-testid="search-input"
            />
            <div className="mt-4 text-right">
              <button 
                className="gradient-bg text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform" 
                onClick={handleSearch}
                data-testid="search-button"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Restaurant */}
      <div className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-12 text-gray-800" data-testid="featured-title">
          Featured Restaurant 🌟
        </h2>
        <div 
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:scale-105 hover:shadow-2xl transition-all" 
          onClick={() => setCurrentPage('vfc-menu')}
          data-testid="featured-restaurant"
        >
          <div className="flex flex-col md:flex-row">
            <div className="gradient-bg text-white text-3xl font-black h-48 md:h-32 md:w-48 flex items-center justify-center">
              🍛 VFC
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-2xl font-black text-gray-800 mb-2" data-testid="restaurant-name">
                VFC - Vizag Food Corner
              </h3>
              <div className="flex gap-4 items-center mb-3">
                <span className="bg-grado-orange text-white px-3 py-1 rounded-full text-sm font-bold" data-testid="restaurant-rating">
                  4.4 ⭐
                </span>
                <span className="text-gray-600 text-sm" data-testid="delivery-time">25 mins</span>
                <span className="text-gray-600 text-sm" data-testid="price-for-two">₹150 for two</span>
              </div>
              <p className="text-gray-700" data-testid="restaurant-location">
                📍 Near GITAM University Campus
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
