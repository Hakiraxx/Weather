import { API_CONFIG } from '@/constants';
import { MOCK_CURRENT_WEATHER, MOCK_FORECAST } from './mockData';

/**
 * Weather API Service using Open-Meteo API
 * Free weather API, no API key required
 */
class WeatherService {
  /**
   * Get coordinates for a city using geocoding
   */
  async getCoordinates(city) {
    try {
      const response = await fetch(
        `${API_CONFIG.GEOCODING_URL}${API_CONFIG.ENDPOINTS.GEOCODING}?name=${encodeURIComponent(city)}&count=1&language=vi&format=json`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding error: ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        throw new Error('Không tìm thấy thành phố');
      }
      
      return data.results[0];
    } catch (error) {
      console.error('Error getting coordinates:', error);
      throw error;
    }
  }

  /**
   * Convert Open-Meteo data to OpenWeatherMap format for compatibility
   */
  convertToOpenWeatherFormat(data, cityInfo) {
    const current = data.current;
    const hourly = data.hourly;
    
    // Map weather codes to descriptions
    const getWeatherDescription = (code) => {
      const weatherCodes = {
        0: { description: 'trời quang', icon: '01d' },
        1: { description: 'chủ yếu quang', icon: '01d' },
        2: { description: 'một phần có mây', icon: '02d' },
        3: { description: 'nhiều mây', icon: '03d' },
        45: { description: 'sương mù', icon: '50d' },
        48: { description: 'sương mù đông', icon: '50d' },
        51: { description: 'mưa phùn nhẹ', icon: '09d' },
        53: { description: 'mưa phùn vừa', icon: '09d' },
        55: { description: 'mưa phùn nặng', icon: '09d' },
        61: { description: 'mưa nhẹ', icon: '10d' },
        63: { description: 'mưa vừa', icon: '10d' },
        65: { description: 'mưa nặng', icon: '10d' },
        80: { description: 'mưa rào nhẹ', icon: '09d' },
        81: { description: 'mưa rào vừa', icon: '09d' },
        82: { description: 'mưa rão nặng', icon: '09d' },
        95: { description: 'dông bão', icon: '11d' }
      };
      return weatherCodes[code] || { description: 'không xác định', icon: '01d' };
    };

    const weather = getWeatherDescription(current.weather_code);
    
    return {
      coord: { 
        lon: cityInfo.longitude, 
        lat: cityInfo.latitude 
      },
      weather: [{
        id: current.weather_code,
        main: weather.description,
        description: weather.description,
        icon: weather.icon
      }],
      main: {
        temp: Math.round(current.temperature_2m),
        feels_like: Math.round(current.apparent_temperature || current.temperature_2m),
        temp_min: Math.round(Math.min(...hourly.temperature_2m.slice(0, 24))),
        temp_max: Math.round(Math.max(...hourly.temperature_2m.slice(0, 24))),
        pressure: Math.round(current.surface_pressure || 1013),
        humidity: Math.round(current.relative_humidity_2m)
      },
      visibility: 10000,
      wind: {
        speed: current.wind_speed_10m / 3.6, // Convert km/h to m/s
        deg: current.wind_direction_10m
      },
      dt: Math.floor(new Date(current.time).getTime() / 1000),
      sys: {
        country: cityInfo.country_code || 'VN',
        sunrise: Math.floor(new Date().setHours(6, 0, 0, 0) / 1000),
        sunset: Math.floor(new Date().setHours(18, 0, 0, 0) / 1000)
      },
      name: cityInfo.name,
      cod: 200
    };
  }

  /**
   * Get current weather for a city
   * @param {string} city - City name
   * @param {string} units - Temperature units (not used with Open-Meteo, always Celsius)
   * @returns {Promise<Object>} Weather data
   */
  async getCurrentWeather(city, units = 'metric') {
    try {
      console.log(`🌤️ Lấy thời tiết cho: ${city}`);
      
      // Get coordinates for the city
      const cityInfo = await this.getCoordinates(city);
      
      // Get weather data using coordinates
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CURRENT}?latitude=${cityInfo.latitude}&longitude=${cityInfo.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m&timezone=auto&forecast_days=1`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Convert to OpenWeatherMap format for compatibility
      return this.convertToOpenWeatherFormat(data, cityInfo);
      
    } catch (error) {
      console.error('Error fetching current weather:', error);
      console.log('🌤️ Fallback to mock data');
      return { ...MOCK_CURRENT_WEATHER, name: city };
    }
  }

  /**
   * Convert Open-Meteo forecast to OpenWeatherMap format
   */
  convertForecastToOpenWeatherFormat(data, cityInfo) {
    const forecast = {
      cod: "200",
      message: 0,
      cnt: Math.min(40, data.hourly.time.length),
      list: [],
      city: {
        id: 1566083,
        name: cityInfo.name,
        coord: {
          lat: cityInfo.latitude,
          lon: cityInfo.longitude
        },
        country: cityInfo.country_code || 'VN',
        population: cityInfo.population || 1000000,
        timezone: 25200,
        sunrise: Math.floor(new Date().setHours(6, 0, 0, 0) / 1000),
        sunset: Math.floor(new Date().setHours(18, 0, 0, 0) / 1000)
      }
    };

    // Convert hourly data to 3-hour intervals (first 40 entries = 5 days)
    for (let i = 0; i < Math.min(40, data.hourly.time.length); i += 3) {
      const time = data.hourly.time[i];
      const temp = data.hourly.temperature_2m[i];
      const weatherCode = data.hourly.weather_code[i];
      const humidity = data.hourly.relative_humidity_2m[i];
      const windSpeed = data.hourly.wind_speed_10m[i];
      const precipitation = data.hourly.precipitation_probability ? data.hourly.precipitation_probability[i] : 0;

      const getWeatherFromCode = (code) => {
        const weatherCodes = {
          0: { main: 'Clear', description: 'trời quang', icon: '01d' },
          1: { main: 'Clear', description: 'chủ yếu quang', icon: '01d' },
          2: { main: 'Clouds', description: 'một phần có mây', icon: '02d' },
          3: { main: 'Clouds', description: 'nhiều mây', icon: '03d' },
          45: { main: 'Mist', description: 'sương mù', icon: '50d' },
          48: { main: 'Mist', description: 'sương mù đông', icon: '50d' },
          51: { main: 'Drizzle', description: 'mưa phùn nhẹ', icon: '09d' },
          53: { main: 'Drizzle', description: 'mưa phùn vừa', icon: '09d' },
          55: { main: 'Drizzle', description: 'mưa phùn nặng', icon: '09d' },
          61: { main: 'Rain', description: 'mưa nhẹ', icon: '10d' },
          63: { main: 'Rain', description: 'mưa vừa', icon: '10d' },
          65: { main: 'Rain', description: 'mưa nặng', icon: '10d' },
          80: { main: 'Rain', description: 'mưa rào nhẹ', icon: '09d' },
          81: { main: 'Rain', description: 'mưa rào vừa', icon: '09d' },
          82: { main: 'Rain', description: 'mưa rão nặng', icon: '09d' },
          95: { main: 'Thunderstorm', description: 'dông bão', icon: '11d' }
        };
        return weatherCodes[code] || { main: 'Clear', description: 'không xác định', icon: '01d' };
      };

      const weather = getWeatherFromCode(weatherCode);

      forecast.list.push({
        dt: Math.floor(new Date(time).getTime() / 1000),
        main: {
          temp: Math.round(temp),
          feels_like: Math.round(temp),
          temp_min: Math.round(temp - 2),
          temp_max: Math.round(temp + 2),
          pressure: 1013,
          humidity: Math.round(humidity)
        },
        weather: [{
          id: weatherCode,
          main: weather.main,
          description: weather.description,
          icon: weather.icon
        }],
        wind: {
          speed: windSpeed / 3.6, // Convert km/h to m/s
          deg: 180
        },
        pop: precipitation / 100 || 0
      });
    }

    return forecast;
  }

  /**
   * Get weather forecast for a city
   * @param {string} city - City name
   * @param {string} units - Temperature units (not used with Open-Meteo)
   * @returns {Promise<Object>} Forecast data
   */
  async getForecast(city, units = 'metric') {
    try {
      console.log(`📅 Lấy dự báo cho: ${city}`);
      
      // Get coordinates for the city
      const cityInfo = await this.getCoordinates(city);
      
      // Get forecast data using coordinates
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FORECAST}?latitude=${cityInfo.latitude}&longitude=${cityInfo.longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation_probability&timezone=auto&forecast_days=5`
      );
      
      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Convert to OpenWeatherMap format for compatibility
      return this.convertForecastToOpenWeatherFormat(data, cityInfo);
      
    } catch (error) {
      console.error('Error fetching forecast:', error);
      console.log('📅 Fallback to mock forecast data');
      return { ...MOCK_FORECAST, city: { ...MOCK_FORECAST.city, name: city } };
    }
  }

  /**
   * Get weather by coordinates
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @param {string} units - Temperature units (not used with Open-Meteo)
   * @returns {Promise<Object>} Weather data
   */
  async getWeatherByCoords(lat, lon, units = 'metric') {
    try {
      console.log(`🌤️ Lấy thời tiết cho tọa độ: ${lat}, ${lon}`);
      
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CURRENT}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m&timezone=auto&forecast_days=1`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Create a fake city info for conversion
      const cityInfo = {
        latitude: lat,
        longitude: lon,
        name: 'Vị trí hiện tại',
        country_code: 'VN'
      };
      
      return this.convertToOpenWeatherFormat(data, cityInfo);
    } catch (error) {
      console.error('Error fetching weather by coordinates:', error);
      // Fallback to mock data
      return { ...MOCK_CURRENT_WEATHER, name: 'Vị trí hiện tại' };
    }
  }

  /**
   * Search cities by name using Open-Meteo geocoding
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of cities
   */
  async searchCities(query) {
    try {
      console.log(`🔍 Tìm kiếm thành phố: ${query}`);
      
      const response = await fetch(
        `${API_CONFIG.GEOCODING_URL}${API_CONFIG.ENDPOINTS.GEOCODING}?name=${encodeURIComponent(query)}&count=5&language=vi&format=json`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Convert to OpenWeatherMap format for compatibility
      return data.results?.map(city => ({
        name: city.name,
        local_names: { vi: city.name },
        lat: city.latitude,
        lon: city.longitude,
        country: city.country_code,
        state: city.admin1
      })) || [];
    } catch (error) {
      console.error('Error searching cities:', error);
      return [];
    }
  }
}

const weatherService = new WeatherService();
export default weatherService;