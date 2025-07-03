import ForecastCard from './ForecastCard';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Weather Forecast List Component
 */
export default function WeatherForecast({ forecast }) {
  const { darkMode } = useTheme();
  
  if (!forecast || !forecast.list) return null;

  // Group forecasts by day
  const groupedForecasts = forecast.list.reduce((groups, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  const today = new Date().toDateString();
  const forecastDays = Object.keys(groupedForecasts).slice(0, 5); // 5 days

  return (
    <div className={`space-y-8 transition-colors duration-500 ${
      darkMode ? 'text-gray-100' : 'text-gray-900'
    }`}>
      <div className="text-center">
        <h3 className={`text-3xl font-bold mb-2 transition-all duration-500 ease-in-out bg-gradient-to-r bg-clip-text text-transparent ${
          darkMode 
            ? 'from-blue-400 to-purple-400' 
            : 'from-blue-600 to-purple-600'
        }`}>
          📅 Dự báo 5 ngày tới
        </h3>
        <p className={`transition-colors duration-500 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>Thông tin chi tiết theo từng ngày</p>
      </div>

      {forecastDays.map((day, dayIndex) => {
        const isToday = day === today;
        const dayForecasts = groupedForecasts[day];
        
        const cardClass = `backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out ${
          darkMode 
            ? 'bg-slate-800/60 border border-slate-600/70 hover:bg-slate-800/70' 
            : 'bg-white/60 border border-white/70 hover:bg-white/70'
        }`;
        
        return (
          <div key={day} className={cardClass}>
            {/* Day Header */}
            <div className="mb-6">
              <h4 className={`text-xl font-bold flex items-center gap-2 transition-colors duration-500 ${
                isToday 
                  ? (darkMode ? 'text-blue-400' : 'text-blue-700')
                  : (darkMode ? 'text-gray-200' : 'text-gray-700')
              }`}>
                {isToday ? '🏠 Hôm nay' : (
                  <>
                    🗓️ {new Date(day).toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </>
                )}
              </h4>
            </div>

            {/* Forecast Cards for the Day */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
              {dayForecasts.map((forecast, index) => (
                <ForecastCard 
                  key={`${day}-${index}`}
                  forecast={forecast} 
                  isToday={isToday}
                />
              ))}
            </div>

            {/* Daily Summary */}
            <div className={`backdrop-blur-md rounded-xl p-4 border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
              darkMode 
                ? 'bg-slate-700/60 border-blue-400' 
                : 'bg-white/60 border-blue-500'
            }`}>
              <h5 className={`font-semibold mb-3 flex items-center gap-2 transition-colors duration-500 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                📊 Tổng quan ngày
              </h5>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className={`backdrop-blur-md rounded-lg p-3 text-center border hover:scale-105 transition-all duration-300 shadow-md ${
                  darkMode 
                    ? 'bg-slate-600/80 border-slate-500/50 hover:bg-slate-600/90' 
                    : 'bg-white/80 border-white/50 hover:bg-white/90'
                }`}>
                  <div className={`text-lg mb-1 transition-colors duration-500 ${
                    darkMode ? 'text-orange-400' : 'text-orange-500'
                  }`}>🌡️</div>
                  <div className={`text-xs mb-1 transition-colors duration-500 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Nhiệt độ TB</div>
                  <div className={`font-bold transition-colors duration-500 ${
                    darkMode ? 'text-gray-100' : 'text-gray-700'
                  }`}>
                    {Math.round(dayForecasts.reduce((sum, f) => sum + f.main.temp, 0) / dayForecasts.length)}°C
                  </div>
                </div>
                <div className={`backdrop-blur-md rounded-lg p-3 text-center border hover:scale-105 transition-all duration-300 shadow-md ${
                  darkMode 
                    ? 'bg-slate-600/80 border-slate-500/50 hover:bg-slate-600/90' 
                    : 'bg-white/80 border-white/50 hover:bg-white/90'
                }`}>
                  <div className={`text-lg mb-1 transition-colors duration-500 ${
                    darkMode ? 'text-blue-400' : 'text-blue-500'
                  }`}>💧</div>
                  <div className={`text-xs mb-1 transition-colors duration-500 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Độ ẩm TB</div>
                  <div className={`font-bold transition-colors duration-500 ${
                    darkMode ? 'text-gray-100' : 'text-gray-700'
                  }`}>
                    {Math.round(dayForecasts.reduce((sum, f) => sum + f.main.humidity, 0) / dayForecasts.length)}%
                  </div>
                </div>
                <div className={`backdrop-blur-md rounded-lg p-3 text-center border hover:scale-105 transition-all duration-300 shadow-md ${
                  darkMode 
                    ? 'bg-slate-600/80 border-slate-500/50 hover:bg-slate-600/90' 
                    : 'bg-white/80 border-white/50 hover:bg-white/90'
                }`}>
                  <div className={`text-lg mb-1 transition-colors duration-500 ${
                    darkMode ? 'text-indigo-400' : 'text-indigo-500'
                  }`}>🌧️</div>
                  <div className={`text-xs mb-1 transition-colors duration-500 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Khả năng mưa</div>
                  <div className={`font-bold transition-colors duration-500 ${
                    darkMode ? 'text-gray-100' : 'text-gray-700'
                  }`}>
                    {Math.round(Math.max(...dayForecasts.map(f => f.pop || 0)) * 100)}%
                  </div>
                </div>
                <div className={`backdrop-blur-md rounded-lg p-3 text-center border hover:scale-105 transition-all duration-300 shadow-md ${
                  darkMode 
                    ? 'bg-slate-600/80 border-slate-500/50 hover:bg-slate-600/90' 
                    : 'bg-white/80 border-white/50 hover:bg-white/90'
                }`}>
                  <div className={`text-lg mb-1 transition-colors duration-500 ${
                    darkMode ? 'text-green-400' : 'text-green-500'
                  }`}>💨</div>
                  <div className={`text-xs mb-1 transition-colors duration-500 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Gió TB</div>
                  <div className={`font-bold transition-colors duration-500 ${
                    darkMode ? 'text-gray-100' : 'text-gray-700'
                  }`}>
                    {Math.round(dayForecasts.reduce((sum, f) => sum + (f.wind?.speed || 0), 0) / dayForecasts.length * 3.6)} km/h
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
