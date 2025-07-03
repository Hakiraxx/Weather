/**
 * Mock Weather Data for Demo
 */

export const MOCK_CURRENT_WEATHER = {
  coord: { lon: 106.6297, lat: 10.8231 },
  weather: [
    {
      id: 802,
      main: "Clouds",
      description: "scattered clouds",
      icon: "03d"
    }
  ],
  base: "stations",
  main: {
    temp: 32,
    feels_like: 36,
    temp_min: 30,
    temp_max: 34,
    pressure: 1013,
    humidity: 70
  },
  visibility: 10000,
  wind: {
    speed: 3.5,
    deg: 180
  },
  clouds: {
    all: 40
  },
  dt: Math.floor(Date.now() / 1000),
  sys: {
    type: 1,
    id: 9308,
    country: "VN",
    sunrise: Math.floor((Date.now() - 3600000) / 1000),
    sunset: Math.floor((Date.now() + 32400000) / 1000)
  },
  timezone: 25200,
  id: 1566083,
  name: "Ho Chi Minh City",
  cod: 200
};

export const MOCK_FORECAST = {
  cod: "200",
  message: 0,
  cnt: 40,
  list: [
    {
      dt: Math.floor(Date.now() / 1000) + 10800,
      main: {
        temp: 30,
        feels_like: 33,
        temp_min: 28,
        temp_max: 32,
        pressure: 1012,
        humidity: 75
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d"
        }
      ],
      wind: {
        speed: 2.5,
        deg: 170
      },
      pop: 0.1
    },
    {
      dt: Math.floor(Date.now() / 1000) + 21600,
      main: {
        temp: 28,
        feels_like: 31,
        temp_min: 26,
        temp_max: 30,
        pressure: 1014,
        humidity: 80
      },
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d"
        }
      ],
      wind: {
        speed: 4.0,
        deg: 160
      },
      pop: 0.6
    },
    // Add more forecast items...
    ...Array.from({ length: 38 }, (_, i) => ({
      dt: Math.floor(Date.now() / 1000) + (i + 3) * 10800,
      main: {
        temp: 25 + Math.random() * 10,
        feels_like: 27 + Math.random() * 10,
        temp_min: 23 + Math.random() * 8,
        temp_max: 27 + Math.random() * 12,
        pressure: 1010 + Math.random() * 10,
        humidity: 60 + Math.random() * 30
      },
      weather: [
        {
          id: 800 + Math.floor(Math.random() * 200),
          main: ["Clear", "Clouds", "Rain"][Math.floor(Math.random() * 3)],
          description: ["clear sky", "few clouds", "light rain"][Math.floor(Math.random() * 3)],
          icon: ["01d", "02d", "10d"][Math.floor(Math.random() * 3)]
        }
      ],
      wind: {
        speed: 2 + Math.random() * 5,
        deg: 120 + Math.random() * 120
      },
      pop: Math.random() * 0.8
    }))
  ],
  city: {
    id: 1566083,
    name: "Ho Chi Minh City",
    coord: {
      lat: 10.8231,
      lon: 106.6297
    },
    country: "VN",
    population: 8993082,
    timezone: 25200,
    sunrise: Math.floor((Date.now() - 3600000) / 1000),
    sunset: Math.floor((Date.now() + 32400000) / 1000)
  }
};
