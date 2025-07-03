import { useState, useRef } from 'react';
import { DEFAULT_CITIES } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';
import SearchDropdown from './SearchDropdown';

/**
 * Header component with city search and selection
 */
export default function Header({ selectedCity, onCityChange, onLocationClick, onRefresh }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { darkMode, toggleDarkMode, mounted } = useTheme();
  const searchInputRef = useRef(null);

  const handleCitySelect = (cityName) => {
    onCityChange(cityName);
    setSearchTerm('');
    setShowDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onCityChange(searchTerm);
      setSearchTerm('');
      setShowDropdown(false);
    }
  };

  return (
    <header className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white shadow-xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className="container mx-auto relative z-10 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-4 group">
            <div className="text-4xl animate-bounce">🌤️</div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Dự Báo Thời Tiết
              </h1>
              <p className="text-blue-100/80 text-sm font-medium">Thông tin thời tiết chính xác</p>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative group">
              <div 
                className={`flex shadow-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 ease-in-out transform hover:scale-[1.02] ${
                  showDropdown 
                    ? 'rounded-t-xl' // Khi dropdown hiển thị, chỉ bo góc trên
                    : 'rounded-xl'   // Khi không có dropdown, bo tất cả góc
                }`}
                style={{
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease'
                }}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Tìm kiếm thành phố..."
                  className="px-5 py-3 bg-transparent text-white placeholder-white/70 focus:outline-none w-full sm:w-72 font-medium transition-all duration-300 ease-in-out"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 px-6 py-3 transition-all duration-500 ease-in-out transform hover:scale-105 font-semibold text-white shadow-lg flex items-center justify-center"
                  style={{
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease'
                  }}
                >
                  <span className="text-lg transition-transform duration-300 hover:rotate-12">🔍</span>
                </button>
              </div>
            </form>

            {/* Search Dropdown */}
            {mounted && showDropdown && (
              <SearchDropdown
                show={showDropdown}
                onCitySelect={handleCitySelect}
                onClose={() => setShowDropdown(false)}
                searchInputRef={searchInputRef}
              />
            )}

            {/* Control Buttons */}
            <div className="flex gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                disabled={!mounted}
                className={`px-5 py-3 rounded-xl transition-all duration-500 ease-in-out transform hover:scale-105 flex items-center gap-2 font-semibold shadow-lg text-white bg-gradient-to-r ${
                  darkMode 
                    ? 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                    : 'from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800'
                }`}
                title={darkMode ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"}
                style={{
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease'
                }}
              >
                {!mounted ? (
                  <>
                    <span className="animate-spin transition-all duration-300">⏳</span>
                    <span className="hidden sm:inline text-sm transition-all duration-300">Đang tải</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg transition-all duration-500 ease-in-out">{darkMode ? '☀️' : '🌙'}</span>
                    <span className="hidden sm:inline text-sm transition-all duration-500 ease-in-out">{darkMode ? 'Light' : 'Dark'}</span>
                  </>
                )}
              </button>
              
              {/* Location Button */}
              <button
                onClick={onLocationClick}
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 px-5 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-semibold shadow-lg"
                title="Vị trí hiện tại"
              >
                📍 <span className="hidden sm:inline text-sm">Vị trí</span>
              </button>
              
              {/* Refresh Button */}
              <button
                onClick={onRefresh}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-5 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
                title="Làm mới"
              >
                🔄
              </button>
            </div>
          </div>
        </div>

        {/* Current City Display */}
        {selectedCity && (
          <div className="mt-6 text-center lg:text-left">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <p className="text-white/90 font-medium">
                📍 Hiện tại: <span className="font-semibold text-white">{selectedCity}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
