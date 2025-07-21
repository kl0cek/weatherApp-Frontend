'use client'
import { useState, useEffect, Suspense } from 'react'
import { PageHeader, LocationForm, WeatherResult, InfoCard } from '../components/index'
import { useSearchParams } from 'next/navigation'
import { useWeatherData } from '../hooks/useWeatherData'
import { useGeolocation } from '../hooks/useGeolocation'


function WeatherPageContent() {
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
      {weatherData && <WeatherResult data={weatherData} />}
      <InfoCard />
    </div>
  )
}

function WeatherPageLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader />
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Ładowanie...</span>
      </div>
      <InfoCard />
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<WeatherPageLoading />}>
      <WeatherPageContent />
    </Suspense>
  )
}