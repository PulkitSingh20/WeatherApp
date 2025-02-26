function WeatherDisplay({ weather, location }) {
    const getWeatherIcon = (iconCode) => {
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };
  
    const formatTime = (timestamp) => {
      return new Date(timestamp * 1000).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    };
  
    const getBackgroundClass = (weatherMain) => {
      const weatherTypes = {
        Clear: 'clear-sky',
        Clouds: 'cloudy',
        Rain: 'rainy',
        Snow: 'snowy',
        Thunderstorm: 'stormy',
        Drizzle: 'rainy',
        Mist: 'misty',
        Fog: 'misty',
        Haze: 'misty',
      };
      
      return weatherTypes[weatherMain] || 'default';
    };
  
    return (
      <div className={`weather-display ${getBackgroundClass(weather.weather[0].main)}`}>
        <div className="location">
          <h2>{location}</h2>
          <p className="date">{new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <div className="current-weather">
          <img 
            src={getWeatherIcon(weather.weather[0].icon)} 
            alt={weather.weather[0].description}
            className="weather-icon"
          />
          <div className="temperature">
            <h2>{Math.round(weather.main.temp)}°C</h2>
            <p className="feels-like">Feels like: {Math.round(weather.main.feels_like)}°C</p>
          </div>
          <div className="weather-info">
            <p className="description">{weather.weather[0].description}</p>
          </div>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.main.humidity}%</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{Math.round(weather.wind.speed * 3.6)} km/h</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{weather.main.pressure} hPa</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
          </div>
        </div>
        
        <div className="sun-times">
          <div className="sunrise">
            <span>🌅 Sunrise</span>
            <span>{formatTime(weather.sys.sunrise)}</span>
          </div>
          <div className="sunset">
            <span>🌇 Sunset</span>
            <span>{formatTime(weather.sys.sunset)}</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default WeatherDisplay;