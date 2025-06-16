'use client'
import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';
//import { WeatherCard } from './WeatherCard';
//import { weatherApi } from '@/lib/weatherApi';
import { WeatherData, FavoriteCity } from '@/types/weather';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  // Load favorites from localStorage on component mount
  React.useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await weatherApi.getCurrentWeather(searchQuery);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (!weatherData) return;

    const newFavorite: FavoriteCity = {
      id: `${weatherData.location.name}-${weatherData.location.country}`,
      name: weatherData.location.name,
      country: weatherData.location.country,
      weatherData,
    };

    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = () => {
    if (!weatherData) return;

    const cityId = `${weatherData.location.name}-${weatherData.location.country}`;
    const updatedFavorites = favorites.filter(fav => fav.id !== cityId);
    setFavorites(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = weatherData
    ? favorites.some(fav => fav.id === `${weatherData.location.name}-${weatherData.location.country}`)
    : false;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-white mb-4">
          Weather Forecast
        </h1>
        <p className="text-white/80 text-lg">
          Get current weather information for any city
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-8 animate-slide-up">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter city name..."
            className="w-full pl-12 pr-4 py-4 glass dark:glass-dark rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 disabled:opacity-50 rounded-lg px-4 py-2 text-white transition-all duration-200"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 animate-slide-up">
          {error}
        </div>
      )}

      {weatherData && (
        <WeatherCard
          weatherData={weatherData}
          onAddToFavorites={addToFavorites}
          onRemoveFromFavorites={removeFromFavorites}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
};