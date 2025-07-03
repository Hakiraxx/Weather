import { useTheme } from '@/contexts/ThemeContext';

/**
 * Loading Spinner Component
 */
export default function LoadingSpinner({ message = "Đang tải..." }) {
  const { darkMode } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Spinner */}
      <div className="relative">
        <div className={`w-16 h-16 border-4 rounded-full animate-spin transition-colors duration-500 ${
          darkMode ? 'border-slate-600' : 'border-blue-200'
        }`}>
          <div className={`absolute top-0 left-0 w-16 h-16 border-4 rounded-full border-t-transparent animate-spin transition-colors duration-500 ${
            darkMode ? 'border-blue-400' : 'border-blue-500'
          }`}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🌤️</span>
        </div>
      </div>
      
      {/* Loading Text */}
      <p className={`mt-4 font-medium transition-colors duration-500 ${
        darkMode ? 'text-slate-300' : 'text-gray-600'
      }`}>{message}</p>
      
      {/* Loading Dots Animation */}
      <div className="flex space-x-1 mt-2">
        <div className={`w-2 h-2 rounded-full animate-bounce transition-colors duration-500 ${
          darkMode ? 'bg-blue-400' : 'bg-blue-500'
        }`}></div>
        <div className={`w-2 h-2 rounded-full animate-bounce transition-colors duration-500 ${
          darkMode ? 'bg-blue-400' : 'bg-blue-500'
        }`} style={{animationDelay: '0.1s'}}></div>
        <div className={`w-2 h-2 rounded-full animate-bounce transition-colors duration-500 ${
          darkMode ? 'bg-blue-400' : 'bg-blue-500'
        }`} style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  );
}
