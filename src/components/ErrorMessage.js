import { useTheme } from '@/contexts/ThemeContext';

/**
 * Error Message Component
 */
export default function ErrorMessage({ message, onRetry }) {
  const { darkMode } = useTheme();
  
  return (
    <div className={`backdrop-blur-md border rounded-lg p-6 text-center shadow-lg transition-all duration-500 ${
      darkMode 
        ? 'bg-red-900/40 border-red-700' 
        : 'bg-red-50/80 border-red-200'
    }`}>
      {/* Error Icon */}
      <div className="text-6xl mb-4">⚠️</div>
      
      {/* Error Message */}
      <h3 className={`text-lg font-semibold mb-2 transition-colors duration-500 ${
        darkMode ? 'text-red-300' : 'text-red-800'
      }`}>
        Oops! Có lỗi xảy ra
      </h3>
      <p className={`mb-4 transition-colors duration-500 ${
        darkMode ? 'text-red-400' : 'text-red-600'
      }`}>
        {message || 'Không thể tải dữ liệu thời tiết. Vui lòng thử lại.'}
      </p>
      
      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className={`text-white px-6 py-2 rounded-lg font-medium shadow-md transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          🔄 Thử lại
        </button>
      )}
      
      {/* Tips */}
      <div className="mt-4 text-sm">
        <p className={`transition-colors duration-500 ${
          darkMode ? 'text-red-400' : 'text-red-500'
        }`}>💡 Gợi ý:</p>
        <ul className={`list-disc list-inside space-y-1 mt-2 transition-colors duration-500 ${
          darkMode ? 'text-red-400' : 'text-red-500'
        }`}>
          <li>Kiểm tra kết nối internet</li>
          <li>Thử tìm kiếm thành phố khác</li>
          <li>Đảm bảo tên thành phố được viết đúng</li>
        </ul>
      </div>
    </div>
  );
}
