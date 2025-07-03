import { useState, useEffect, useCallback } from 'react';
import weatherService from '@/services/weatherService';

/**
 * Custom hook for weather data management
 * @param {string} initialCity - Initial city to load
 * @returns {Object} Weather data and methods
 */
export const useWeather = (initialCity = 'Ho Chi Minh City') => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(initialCity);

  /**
   * Fetch current weather data
   */
  const fetchCurrentWeather = useCallback(async (city) => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getCurrentWeather(city);
      setCurrentWeather(data);
    } catch (err) {
      setError('Không thể tải dữ liệu thời tiết. Vui lòng thử lại.');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch forecast data
   */
  const fetchForecast = useCallback(async (city) => {
    try {
      const data = await weatherService.getForecast(city);
      setForecast(data);
    } catch (err) {
      console.error('Error fetching forecast:', err);
    }
  }, []);

  /**
   * Fetch weather by coordinates
   */
  const fetchWeatherByLocation = useCallback(async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getWeatherByCoords(lat, lon);
      setCurrentWeather(data);
      setSelectedCity(data.name);
    } catch (err) {
      setError('Không thể tải dữ liệu thời tiết cho vị trí này.');
      console.error('Error fetching weather by location:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get user's current location weather
   */
  const getCurrentLocationWeather = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (err) => {
          setError('Không thể truy cập vị trí. Vui lòng cho phép truy cập vị trí.');
          console.error('Geolocation error:', err);
        }
      );
    } else {
      setError('Trình duyệt không hỗ trợ định vị.');
    }
  }, [fetchWeatherByLocation]);

  /**
   * Change selected city
   */
  const changeCity = useCallback((city) => {
    setSelectedCity(city);
    fetchCurrentWeather(city);
    fetchForecast(city);
  }, [fetchCurrentWeather, fetchForecast]);

  /**
   * Refresh weather data
   */
  const refreshWeather = useCallback(() => {
    fetchCurrentWeather(selectedCity);
    fetchForecast(selectedCity);
  }, [selectedCity, fetchCurrentWeather, fetchForecast]);

  // Load initial data
  useEffect(() => {
    fetchCurrentWeather(selectedCity);
    fetchForecast(selectedCity);
  }, [selectedCity, fetchCurrentWeather, fetchForecast]);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    selectedCity,
    changeCity,
    getCurrentLocationWeather,
    refreshWeather
  };
};
