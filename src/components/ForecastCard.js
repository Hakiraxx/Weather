import { WEATHER_ICONS } from '@/constants';
import { formatTemperature, formatTime } from '@/utils/formatters';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Individual Forecast Card Component
 */
export default function ForecastCard({ forecast, isToday = false }) {
  const { darkMode } = useTheme();
  
  const {
    dt,
    main: { temp, temp_min, temp_max, humidity },
    weather: [{ main: condition, description, icon }],
    wind: { speed } = {},
    pop // Probability of precipitation
  } = forecast;

  const time = new Date(dt * 1000);
  const displayTime = isToday ? 
    time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) :
    time.toLocaleDateString('vi-VN', { weekday: 'short', month: 'short', day: 'numeric' });

  // Dynamic classes based on dark mode
  const cardClass = `rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-500 ease-in-out border transform hover:scale-105 backdrop-blur-md ${
    darkMode 
      ? 'bg-gray-800/60 border-gray-600/70 hover:border-gray-500/90 hover:bg-gray-800/70' 
      : 'bg-white/60 border-white/70 hover:border-white/90 hover:bg-white/70'
  }`;

  return (
    <div className={cardClass}>
      {/* Time/Date */}
      <div className="text-center mb-3">
        <p className={`font-semibold text-sm transition-colors duration-500 ${
          isToday 
            ? (darkMode ? 'text-blue-400' : 'text-blue-700')
            : (darkMode ? 'text-gray-300' : 'text-gray-600')
        }`}>
          {displayTime}
        </p>
      </div>

      {/* Weather Icon and Temperature */}
      <div className="text-center mb-4">
        <div className="text-4xl mb-2 filter drop-shadow-sm">{WEATHER_ICONS[icon] || '🌤️'}</div>
        <div className={`font-bold text-xl mb-1 transition-colors duration-500 ${
          darkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          {formatTemperature(temp)}
        </div>
        {temp_min && temp_max && (
          <div className={`text-xs flex justify-center gap-1 transition-colors duration-500 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span className={`transition-colors duration-500 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>↓{formatTemperature(temp_min)}</span>
            <span className={`transition-colors duration-500 ${
              darkMode ? 'text-red-400' : 'text-red-600'
            }`}>↑{formatTemperature(temp_max)}</span>
          </div>
        )}
      </div>

      {/* Weather Description */}
      <div className="text-center mb-4">
        <p className={`text-xs capitalize leading-tight font-medium backdrop-blur-sm rounded-full px-2 py-1 border transition-all duration-500 ${
          darkMode 
            ? 'text-gray-300 bg-gray-700/60 border-gray-600/40' 
            : 'text-gray-600 bg-white/60 border-white/40'
        }`}>
          {description}
        </p>
      </div>

      {/* Additional Info */}
      <div className="space-y-2">
        {/* Rain Probability */}
        {pop > 0 && (
          <div className={`flex items-center justify-between text-xs backdrop-blur-sm rounded-lg px-2 py-1 border transition-all duration-500 ${
            darkMode 
              ? 'bg-blue-900/60 border-blue-700/50' 
              : 'bg-blue-100/60 border-blue-200/50'
          }`}>
            <span className={`font-medium transition-colors duration-500 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>🌧️</span>
            <span className={`font-semibold transition-colors duration-500 ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>{Math.round(pop * 100)}%</span>
          </div>
        )}

        {/* Humidity */}
        <div className={`flex items-center justify-between text-xs backdrop-blur-sm rounded-lg px-2 py-1 border transition-all duration-500 ${
          darkMode 
            ? 'bg-cyan-900/60 border-cyan-700/50' 
            : 'bg-cyan-100/60 border-cyan-200/50'
        }`}>
          <span className={`font-medium transition-colors duration-500 ${
            darkMode ? 'text-cyan-400' : 'text-cyan-600'
          }`}>💧</span>
          <span className={`font-semibold transition-colors duration-500 ${
            darkMode ? 'text-cyan-300' : 'text-cyan-700'
          }`}>{humidity}%</span>
        </div>

        {/* Wind */}
        {speed && (
          <div className={`flex items-center justify-between text-xs backdrop-blur-sm rounded-lg px-2 py-1 border transition-all duration-500 ${
            darkMode 
              ? 'bg-green-900/60 border-green-700/50' 
              : 'bg-green-100/60 border-green-200/50'
          }`}>
            <span className={`font-medium transition-colors duration-500 ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`}>💨</span>
            <span className={`font-semibold transition-colors duration-500 ${
              darkMode ? 'text-green-300' : 'text-green-700'
            }`}>{Math.round(speed * 3.6)} km/h</span>
          </div>
        )}
      </div>
    </div>
  );
}
