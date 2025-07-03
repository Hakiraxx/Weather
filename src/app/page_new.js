'use client';

import { useWeather } from '@/hooks/useWeather';
import Header from '@/components/Header';
import CurrentWeather from '@/components/CurrentWeather';
import WeatherForecast from '@/components/WeatherForecast';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import ClientOnly from '@/components/ClientOnly';

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 transition-colors duration-500">
      
      {/* Header */}
      <Header
        selectedCity={selectedCity}
        onCityChange={changeCity}
        onLocationClick={getCurrentLocationWeather}
        onRefresh={refreshWeather}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6 transition-colors duration-300">
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
        <div className="text-center py-6 text-gray-500 dark:text-gray-400 transition-colors duration-300">
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
