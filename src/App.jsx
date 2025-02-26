import { useState, useEffect } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = '78c9cb0f0d7a3beb00cf78aaa70de00b'; 

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        position => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        err => {
          console.error(err);
          setLoading(false);
          setError("Couldn't access your location. Please search for a city.");
        }
      );
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setLocation(`${data.name}, ${data.sys.country}`);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        }
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setLocation(`${data.name}, ${data.sys.country}`);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    if (city.trim()) {
      fetchWeatherByCity(city);
    }
  };

  return (
    <div className="weather-app">
      <h1>☀️ Sunshine Weather App 🌦️</h1>
      <SearchBar onSearch={handleSearch} />
      
      {loading && <LoadingSpinner />}
      
      {error && <ErrorMessage message={error} />}
      
      {!loading && !error && weatherData && (
        <WeatherDisplay weather={weatherData} location={location} />
      )}
      
      <footer>
        <p>Data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
}

export default App;