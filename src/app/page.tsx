'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PageHeader } from '../components/PageHeader'
import { LocationForm } from '../components/LocationForm'
import { WeatherResults } from '../components/WeatherResult'
import { InfoCard } from '../components/InfoCard'
import { useWeatherData } from '../hooks/useWeatherData'
import { useGeolocation } from '../hooks/useGeolocation'

export default function HomePage() {
  const searchParams = useSearchParams()
  const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' })
  
  const { 
    weatherData, 
    loading, 
    error, 
    fetchWeatherData 
  } = useWeatherData()
  
  const { 
    getCurrentLocation, 
    loading: locationLoading 
  } = useGeolocation(setCoordinates)

  // Handle URL parameters
  useEffect(() => {
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    if (lat && lon) {
      setCoordinates({ latitude: lat, longitude: lon })
      setTimeout(() => {
        fetchWeatherData(lat, lon)
      }, 500)
    }
  }, [searchParams, fetchWeatherData])

  const handleFetchWeather = () => {
    fetchWeatherData(coordinates.latitude, coordinates.longitude)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader />

      <LocationForm
        coordinates={coordinates}
        onCoordinatesChange={setCoordinates}
        onGetCurrentLocation={getCurrentLocation}
        onFetchWeather={handleFetchWeather}
        loading={loading}
        locationLoading={locationLoading}
        error={error}
      />

      {weatherData && <WeatherResults data={weatherData} />}

      <InfoCard />
    </div>
  )
}