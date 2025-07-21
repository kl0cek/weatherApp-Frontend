'use client'

import { useState } from 'react'
import { PageHeader, InfoCard, WeatherResult } from '../../components/index'
import { MapComponent, MapControls, ErrorMessage, CoordinatesDisplay } from '../../components/Map/index'
import { useGeolocation, useWeather } from '../../hooks/index'

export default function MapPage() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const handleCoordinatesChange = (lat: number, lng: number) => {
    setLatitude(lat.toFixed(4))
    setLongitude(lng.toFixed(4))
  }

  const { weatherData, loading: weatherLoading, error: weatherError, fetchWeather } = useWeather()

  const { getCurrentLocation, loading: locationLoading, error: geolocationError } = useGeolocation({
    onSuccess: (lat, lng) => {
      setLatitude(lat.toFixed(4))
      setLongitude(lng.toFixed(4))
    }
  })

  const handleFetchWeather = async () => {
    if (latitude && longitude) {
      await fetchWeather(latitude, longitude)
    }
  }

  const displayError = geolocationError || weatherError

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader />

      <div className="card max-w-4xl mx-auto animate-scale-in">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Interaktywna mapa
        </h2>
        
        <div className="space-y-4">
          <MapComponent
            latitude={latitude ? parseFloat(latitude) : null}
            longitude={longitude ? parseFloat(longitude) : null}
            onCoordinatesChange={handleCoordinatesChange}
          />

          {(latitude && longitude) && (
            <CoordinatesDisplay latitude={latitude} longitude={longitude} />
          )}

          <MapControls
            onGetCurrentLocation={getCurrentLocation}
            onFetchWeather={handleFetchWeather}
            locationLoading={locationLoading}
            weatherLoading={weatherLoading}
            disabled={!latitude || !longitude}
          />

          {displayError && <ErrorMessage message={displayError} />}
        </div>
      </div>

      {weatherData && <WeatherResult data={weatherData} />}
      <InfoCard />
    </div>
  )
}