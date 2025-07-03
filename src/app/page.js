'use client';

import { useWeather } from '@/hooks/useWeather';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import CurrentWeather from '@/components/CurrentWeather';
import WeatherForecast from '@/components/WeatherForecast';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import ClientOnly from '@/components/ClientOnly';

export default function Home() {
  const { darkMode } = useTheme();
  const {
    currentWeather,
    forecast,
    loading,
    error,
    selectedCity,
    changeCity,
    getCurrentLocationWeather,
    refreshWeather
  } = useWeather();

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br transition-all duration-700 ease-in-out ${
        darkMode 
          ? 'from-gray-900 via-slate-900 to-gray-800' 
          : 'from-sky-50 via-blue-50 to-indigo-100'
      }`}
      style={{
        transition: 'background 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      
      {/* Header */}
      <Header
        selectedCity={selectedCity}
        onCityChange={changeCity}
        onLocationClick={getCurrentLocationWeather}
        onRefresh={refreshWeather}
      />

      {/* Main Content */}
      <main className={`container mx-auto px-4 py-6 space-y-8 transition-all duration-500 ease-in-out bg-transparent relative ${
        darkMode ? 'text-gray-100' : 'text-gray-900'
      }`}>
        {/* Loading State */}
        {loading && (
          <LoadingSpinner message="Đang tải thông tin thời tiết..." />
        )}

        {/* Error State */}
        {error && !loading && (
          <ErrorMessage 
            message={error} 
            onRetry={refreshWeather}
          />
        )}

        {/* Weather Content */}
        {!loading && !error && (
          <>
            {/* Current Weather */}
            {currentWeather && (
              <CurrentWeather weather={currentWeather} />
            )}

            {/* Weather Forecast */}
            {forecast && (
              <WeatherForecast forecast={forecast} />
            )}
          </>
        )}

        {/* Footer Info */}
        <div className={`text-center py-6 transition-colors duration-300 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p>
            🌤️ Dữ liệu thời tiết được cung cấp bởi Open-Meteo
          </p>
          <ClientOnly fallback={<p className="mt-1">Đang tải...</p>}>
            <p className="mt-1">
              Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
            </p>
          </ClientOnly>
        </div>
      </main>
    </div>
  );
}
