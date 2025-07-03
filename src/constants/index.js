/**
 * API Configuration Constants
 */
export const API_CONFIG = {
  // Open-Meteo API - Free, no API key required
  BASE_URL: 'https://api.open-meteo.com/v1',
  GEOCODING_URL: 'https://geocoding-api.open-meteo.com/v1',
  API_KEY: null, // No API key needed for Open-Meteo
  ENDPOINTS: {
    CURRENT: '/forecast',
    FORECAST: '/forecast',
    GEOCODING: '/search'
  }
};

/**
 * Weather condition icons mapping
 */
export const WEATHER_ICONS = {
  '01d': '☀️', // clear sky day
  '01n': '🌙', // clear sky night
  '02d': '⛅', // few clouds day
  '02n': '☁️', // few clouds night
  '03d': '☁️', // scattered clouds
  '03n': '☁️',
  '04d': '☁️', // broken clouds
  '04n': '☁️',
  '09d': '🌧️', // shower rain
  '09n': '🌧️',
  '10d': '🌦️', // rain day
  '10n': '🌧️', // rain night
  '11d': '⛈️', // thunderstorm
  '11n': '⛈️',
  '13d': '❄️', // snow
  '13n': '❄️',
  '50d': '🌫️', // mist
  '50n': '🌫️'
};

/**
 * Default cities for quick access
 */
export const DEFAULT_CITIES = [
  { name: 'Hồ Chí Minh', country: 'VN', lat: 10.8231, lon: 106.6297 },
  { name: 'Hà Nội', country: 'VN', lat: 21.0285, lon: 105.8542 },
  { name: 'Đà Nẵng', country: 'VN', lat: 16.0544, lon: 108.2022 },
  { name: 'Cần Thơ', country: 'VN', lat: 10.0452, lon: 105.7469 }
];

/**
 * Temperature units
 */
export const TEMP_UNITS = {
  CELSIUS: 'metric',
  FAHRENHEIT: 'imperial',
  KELVIN: 'standard'
};
