import { useState, useCallback } from 'react'
import { WeatherData } from '../types/weather'
import { fetchWeatherDataWithCoord } from '../services/mapService'

interface UseWeatherReturn {
  weatherData: WeatherData | null
  loading: boolean
  error: string | null
  fetchWeather: (latitude: string, longitude: string) => Promise<void>
  clearWeather: () => void
}

export const useWeather = (): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = useCallback(async (latitude: string, longitude: string) => {
    if (!latitude || !longitude) return

    setLoading(true)
    setError(null)

    try {
      const data = await fetchWeatherDataWithCoord(latitude, longitude)
      setWeatherData(data)
    } catch (err) {
      console.error('API Error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Błąd połączenia z serwerem'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearWeather = useCallback(() => {
    setWeatherData(null)
    setError(null)
  }, [])

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
    clearWeather
  }
}