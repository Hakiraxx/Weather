/**
 * Format temperature with unit
 * @param {number} temp - Temperature value
 * @param {string} unit - Unit type (C, F, K)
 * @returns {string} Formatted temperature
 */
export const formatTemperature = (temp, unit = 'C') => {
  return `${Math.round(temp)}°${unit}`;
};

/**
 * Format date to readable string
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted date
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format time to readable string
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted time
 */
export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get wind direction from degrees
 * @param {number} degrees - Wind direction in degrees
 * @returns {string} Wind direction
 */
export const getWindDirection = (degrees) => {
  const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

/**
 * Convert wind speed from m/s to km/h
 * @param {number} speed - Speed in m/s
 * @returns {number} Speed in km/h
 */
export const convertWindSpeed = (speed) => {
  return Math.round(speed * 3.6);
};

/**
 * Get weather description in Vietnamese
 * @param {string} condition - Weather condition code
 * @returns {string} Vietnamese description
 */
export const getWeatherDescription = (condition) => {
  const descriptions = {
    'clear sky': 'Trời quang',
    'few clouds': 'Ít mây',
    'scattered clouds': 'Mây rải rác',
    'broken clouds': 'Nhiều mây',
    'shower rain': 'Mưa rào',
    'rain': 'Mưa',
    'thunderstorm': 'Dông bão',
    'snow': 'Tuyết',
    'mist': 'Sương mù'
  };
  
  return descriptions[condition] || condition;
};

/**
 * Get air quality description
 * @param {number} aqi - Air Quality Index
 * @returns {Object} AQI info with color and description
 */
export const getAirQualityInfo = (aqi) => {
  if (aqi <= 50) {
    return { level: 'Tốt', color: 'text-green-500', bg: 'bg-green-100' };
  } else if (aqi <= 100) {
    return { level: 'Trung bình', color: 'text-yellow-500', bg: 'bg-yellow-100' };
  } else if (aqi <= 150) {
    return { level: 'Kém', color: 'text-orange-500', bg: 'bg-orange-100' };
  } else {
    return { level: 'Xấu', color: 'text-red-500', bg: 'bg-red-100' };
  }
};
