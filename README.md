# 🌤️ Ứng Dụng Dự Báo Thời Tiết

Ứng dụng web dự báo thời tiết hiện đại được xây dựng với Next.js, sử dụng **Open-Meteo API** miễn phí để hiển thị thông tin thời tiết thời gian thực và dự báo 5 ngày.

## ✨ Tính Năng

- 🌡️ **Thời tiết hiện tại**: Nhiệt độ, độ ẩm, áp suất, gió, tầm nhìn
- 📅 **Dự báo 5 ngày**: Thông tin chi tiết theo từng khung giờ
- 📍 **Định vị GPS**: Tự động lấy thời tiết vị trí hiện tại
- 🔍 **Tìm kiếm thành phố**: Hỗ trợ tìm kiếm thành phố toàn cầu
- 🏙️ **Thành phố phổ biến**: Danh sách các thành phố Việt Nam
- 📱 **Responsive**: Tối ưu cho mobile và desktop
- 🎨 **Giao diện đẹp**: Sử dụng Tailwind CSS
- 🆓 **Hoàn toàn miễn phí**: Không cần API key!

## 🚀 Bắt Đầu

### Yêu Cầu

- Node.js 18+ 
- NPM hoặc Yarn

### Cài Đặt

1. **Clone repository:**
```bash
git clone <your-repo-url>
cd weather
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Chạy ứng dụng:**
```bash
npm run dev
```

4. **Mở trình duyệt:** http://localhost:3000

### 🎉 Không Cần API Key!

Ứng dụng sử dụng **Open-Meteo API** - API thời tiết miễn phí, không cần đăng ký hay API key. Chỉ cần chạy và sử dụng ngay!

## 📁 Cấu Trúc Project

```
src/
├── app/
│   └── page.js              # Trang chính
├── components/
│   ├── Header.js            # Header với tìm kiếm
│   ├── CurrentWeather.js    # Thời tiết hiện tại
│   ├── WeatherForecast.js   # Dự báo thời tiết
│   ├── ForecastCard.js      # Card dự báo
│   ├── LoadingSpinner.js    # Loading spinner
│   └── ErrorMessage.js      # Thông báo lỗi
├── hooks/
│   └── useWeather.js        # Hook quản lý weather data
├── services/
│   └── weatherService.js    # API service
├── utils/
│   └── formatters.js        # Utility functions
└── constants/
    └── index.js             # Constants và cấu hình
```

## 🛠️ Công Nghệ

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **API**: Open-Meteo API (Free, no API key required)
- **Language**: JavaScript (ES6+)
- **Package Manager**: NPM

## 📊 API

Ứng dụng sử dụng Open-Meteo API:
- **Weather API**: Dữ liệu thời tiết hiện tại và dự báo
- **Geocoding API**: Tìm kiếm và chuyển đổi tên thành phố thành tọa độ
- **Ưu điểm**: 
  - 🆓 Hoàn toàn miễn phí
  - 🚀 Không giới hạn calls
  - 🌍 Dữ liệu toàn cầu
  - ⚡ Tốc độ nhanh
  - 📱 CORS-friendly

## 🎯 Tính Năng Nâng Cao

- Tự động làm mới dữ liệu
- Fallback graceful khi có lỗi
- Xử lý lỗi thông minh  
- Loading states mượt mà
- Real-time weather data
- Responsive design cho mọi thiết bị



## 📞 Liên Hệ

Nếu có bất kỳ câu hỏi nào, vui lòng tạo issue hoặc liên hệ trực tiếp.
# Weather
