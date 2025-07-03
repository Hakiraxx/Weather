import { WEATHER_ICONS } from '@/constants';
import { formatTemperature, formatTime, getWindDirection, convertWindSpeed } from '@/utils/formatters';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Current Weather Display Component
 */
export default function CurrentWeather({ weather }) {
  const { darkMode } = useTheme();
  
  if (!weather) return null;

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather: [{ main: condition, description, icon }],
    wind: { speed, deg } = {},
    visibility,
    sys: { sunrise, sunset }
  } = weather;

  // Dynamic classes based on dark mode
  const containerClass = `relative rounded-2xl p-8 shadow-xl overflow-hidden backdrop-blur-md transition-all duration-500 ${
    darkMode 
      ? 'bg-slate-800/40 border-slate-600/40 text-slate-100' 
      : 'bg-white/30 border-white/40 text-gray-800'
  }`;

  const glassBgClass = `absolute inset-0 backdrop-blur-sm transition-all duration-500 ${
    darkMode
      ? 'bg-gradient-to-br from-gray-800/60 via-slate-700/40 to-slate-600/30'
      : 'bg-gradient-to-br from-white/60 via-blue-50/40 to-indigo-50/30'
  }`;

  return (
    <div className={containerClass}>
      {/* Background decoration - Glass effect */}
      <div className={`absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-20 translate-x-20 blur-xl transition-all duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-600/40 to-slate-500/30' 
          : 'bg-gradient-to-br from-blue-200/40 to-purple-200/30'
      }`}></div>
      <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full translate-y-16 -translate-x-16 blur-lg transition-all duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-700/30 to-slate-600/40' 
          : 'bg-gradient-to-br from-indigo-200/30 to-blue-200/40'
      }`}></div>
      
      {/* Glass overlay */}
      <div className={glassBgClass}></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500 ${
            darkMode 
              ? 'from-blue-400 to-purple-400' 
              : 'from-blue-700 to-purple-700'
          }`}>
            📍 {name}
          </h2>
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="text-7xl filter drop-shadow-lg animate-pulse">
              {WEATHER_ICONS[icon] || '🌤️'}
            </div>
            <div className="text-center">
              <div className={`text-5xl font-bold mb-2 transition-colors duration-500 ${
                darkMode ? 'text-slate-100' : 'text-gray-800'
              }`}>{formatTemperature(temp)}</div>
              <div className={`text-lg font-medium transition-colors duration-500 ${
                darkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                Cảm giác như {formatTemperature(feels_like)}
              </div>
            </div>
          </div>
          <div className={`backdrop-blur-md rounded-full px-4 py-2 inline-block transition-all duration-500 ${
            darkMode 
              ? 'bg-slate-700/50 border border-slate-600/60' 
              : 'bg-white/50 border border-white/60'
          }`}>
            <p className={`text-lg capitalize font-semibold transition-colors duration-500 ${
              darkMode ? 'text-slate-200' : 'text-gray-700'
            }`}>{description}</p>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Humidity */}
          <div className={`backdrop-blur-md rounded-xl p-4 text-center border shadow-lg hover:scale-105 transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-700/40 border-slate-600/50 hover:bg-slate-700/50' 
              : 'bg-white/40 border-white/50 hover:bg-white/50'
          }`}>
            <div className="text-3xl mb-2">💧</div>
            <div className={`text-sm font-medium transition-colors duration-500 ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>Độ ẩm</div>
            <div className={`font-bold text-lg transition-colors duration-500 ${
              darkMode ? 'text-slate-100' : 'text-gray-800'
            }`}>{humidity}%</div>
          </div>

          {/* Pressure */}
          <div className={`backdrop-blur-md rounded-xl p-4 text-center border shadow-lg hover:scale-105 transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-700/40 border-slate-600/50 hover:bg-slate-700/50' 
              : 'bg-white/40 border-white/50 hover:bg-white/50'
          }`}>
            <div className="text-3xl mb-2">🌡️</div>
            <div className={`text-sm font-medium transition-colors duration-500 ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>Áp suất</div>
            <div className={`font-bold text-lg transition-colors duration-500 ${
              darkMode ? 'text-slate-100' : 'text-gray-800'
            }`}>{pressure} hPa</div>
          </div>

          {/* Wind */}
          <div className={`backdrop-blur-md rounded-xl p-4 text-center border shadow-lg hover:scale-105 transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-700/40 border-slate-600/50 hover:bg-slate-700/50' 
              : 'bg-white/40 border-white/50 hover:bg-white/50'
          }`}>
            <div className="text-3xl mb-2">💨</div>
            <div className={`text-sm font-medium transition-colors duration-500 ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>Gió</div>
            <div className={`font-bold text-lg transition-colors duration-500 ${
              darkMode ? 'text-slate-100' : 'text-gray-800'
            }`}>
              {convertWindSpeed(speed)} km/h
              {deg && (
                <div className={`text-xs font-normal transition-colors duration-500 ${
                  darkMode ? 'text-slate-300' : 'text-gray-600'
                }`}>{getWindDirection(deg)}</div>
              )}
            </div>
          </div>

          {/* Visibility */}
          <div className={`backdrop-blur-md rounded-xl p-4 text-center border shadow-lg hover:scale-105 transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-700/40 border-slate-600/50 hover:bg-slate-700/50' 
              : 'bg-white/40 border-white/50 hover:bg-white/50'
          }`}>
            <div className="text-3xl mb-2">👁️</div>
            <div className={`text-sm font-medium transition-colors duration-500 ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>Tầm nhìn</div>
            <div className={`font-bold text-lg transition-colors duration-500 ${
              darkMode ? 'text-slate-100' : 'text-gray-800'
            }`}>
              {visibility ? `${(visibility / 1000).toFixed(1)} km` : 'N/A'}
            </div>
          </div>
        </div>

        {/* Sun Times */}
        {sunrise && sunset && (
          <div className={`flex justify-center gap-8 backdrop-blur-md rounded-xl p-4 border shadow-lg transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-700/40 border-slate-600/50' 
              : 'bg-white/40 border-white/50'
          }`}>
            <div className="text-center">
              <div className="text-3xl mb-2">🌅</div>
              <div className={`text-sm font-medium transition-colors duration-500 ${
                darkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>Mặt trời mọc</div>
              <div className={`font-bold text-lg transition-colors duration-500 ${
                darkMode ? 'text-slate-100' : 'text-gray-800'
              }`}>{formatTime(sunrise)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌇</div>
              <div className={`text-sm font-medium transition-colors duration-500 ${
                darkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>Mặt trời lặn</div>
              <div className={`font-bold text-lg transition-colors duration-500 ${
                darkMode ? 'text-slate-100' : 'text-gray-800'
              }`}>{formatTime(sunset)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
