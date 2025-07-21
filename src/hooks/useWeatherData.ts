import { useState, useCallback } from 'react'
import { WeatherData } from '../types/weather'
import { weatherService } from '../services/weatherService'

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeatherData = useCallback(async (latitude: string, longitude: string) => {
    setLoading(true)
    setError('')

    try {
      const data = await weatherService.fetchWeatherData(latitude, longitude)
      setWeatherData(data)
    } catch (err) {
      console.error('API Error:', err)
      setError(err instanceof Error ? err.message : 'Błąd połączenia z serwerem')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    weatherData,
    loading,
    error,
    fetchWeatherData
  }
}