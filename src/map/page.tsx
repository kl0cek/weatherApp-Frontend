'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faLocationDot, 
  faSearch, 
  faSpinner,
  faExclamationTriangle,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import WeatherTable from '../../components/WeatherTable'
import WeatherSummary from '../../components/WeatherSummary'
import { InfoCard } from '../components/InfoCard'
import { WeatherResults } from '../components/WeatherResult'
import { PageHeader } from '../components/PageHeader'

interface DailyWeather {
  date: string
  weatherCode: number
  tempMax: number
  tempMin: number
  solarEnergy: number
}

interface WeatherSummary {
  tempMin: number
  tempMax: number
  avgPressure: number
  avgSunExposure: number
  comment: string
}

interface WeatherData {
  daily: DailyWeather[]
  summary: WeatherSummary
}

declare global {
  interface Window {
    L: any;
  }
}

export default function MapPage() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [currentMarker, setCurrentMarker] = useState<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  
  useEffect(() => {
    const initMap = async () => {
      
      if (!window.L) {
        
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)

        
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.onload = () => {
          createMap()
        }
        document.head.appendChild(script)
      } else {
        createMap()
      }
    }

    const createMap = () => {
  if (typeof window !== 'undefined' && window.L) {
    const mapInstance = window.L.map('map').setView([52.2297, 21.0122], 6)

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance)

    
    let currentMarker = null

    mapInstance.on('click', (e: any) => {
      const { lat, lng } = e.latlng
      setLatitude(lat.toFixed(4))
      setLongitude(lng.toFixed(4))

      
      if (currentMarker) {
        mapInstance.removeLayer(currentMarker)
        currentMarker = null
      }

      
      currentMarker = window.L.marker([lat, lng]).addTo(mapInstance)
      setCurrentMarker(currentMarker)
      
      
      mapInstance._activeMarker = currentMarker
    })

    setMap(mapInstance)
    setMapLoaded(true)
  }
}

    initMap()

    
    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])

  const getCurrentLocation = () => {
    setLocationLoading(true)
    setError('')

    if (!navigator.geolocation) {
      setLocationLoading(false)
      setError('Brak wsparcia dla geolokalizacji w przeglądarce')
      return
    }

    navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      
      setLatitude(lat.toFixed(4))
      setLongitude(lng.toFixed(4))
      setLocationLoading(false)

      if (map) {
        map.setView([lat, lng], 13)
        
        
        if (map._activeMarker) {
          map.removeLayer(map._activeMarker)
          map._activeMarker = null
        }

          
          const newMarker = window.L.marker([lat, lng]).addTo(map)
        setCurrentMarker(newMarker)
        map._activeMarker = newMarker
        }
      },
      (error) => {
        setError('Nie udało się pobrać lokalizacji: ' + error.message)
        setLocationLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  const fetchWeatherDataWithCoord = async (lat: string, lon: string) => {
    setLoading(true)
    setError('')

    try {
      const [dailyResponse, weeklyResponse] = await Promise.all([
        fetch(`/api/daily-forecast?latitude=${lat}&longitude=${lon}`),
        fetch(`/api/weekly-summary?latitude=${lat}&longitude=${lon}`),
      ])
      
      if (!dailyResponse.ok || !weeklyResponse.ok) {
        throw new Error('Nie udało się pobrać danych z serwera')
      }
      
      const dailyData = await dailyResponse.json()
      const weeklyData = await weeklyResponse.json()

      const mappedData: WeatherData = {
        daily: dailyData.daily.map((day: any) => ({
          date: day.date,
          weatherCode: day.weathercode,
          tempMax: day.temperature_max,
          tempMin: day.temperature_min,
          solarEnergy: day.solar_energy
        })),
        summary: {
          tempMin: weeklyData.min_temperature,
          tempMax: weeklyData.max_temperature,
          avgPressure: weeklyData.average_pressure,
          avgSunExposure: weeklyData.average_sunshine,
          comment: weeklyData.summary
        }
      }

      setWeatherData(mappedData)
    } catch (err) {
      console.error('API Error:', err)
      setError(err instanceof Error ? err.message : 'Błąd połączenia z serwerem')

      //console.log('Static Data loaded')
      //setWeatherData(getMockWeatherData())
    } finally {
      setLoading(false)
    }
  }

  const fetchWeatherData = async () => {
    if (latitude && longitude) {
      await fetchWeatherDataWithCoord(latitude, longitude)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <PageHeader />

      {/* Map Container */}
      <div className="card max-w-4xl mx-auto animate-scale-in">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Interaktywna mapa
        </h2>
        
        <div className="space-y-4">
          {/* Map */}
          <div className="relative">
            <div 
              id="map" 
              className="w-full h-96 rounded-lg border-2 border-gray-200 dark:border-gray-700"
              style={{ minHeight: '400px' }}
            ></div>
            
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="text-center">
                  <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 animate-spin text-gray-500 mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">Ładowanie mapy...</p>
                </div>
              </div>
            )}
          </div>

          {/* Coordinates Display */}
          {(latitude && longitude) && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 animate-slide-in">
              <div className="flex items-center space-x-2 mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Wybrana lokalizacja
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Szerokość:</span>
                  <span className="ml-2 font-mono text-gray-900 dark:text-gray-100">{latitude}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Długość:</span>
                  <span className="ml-2 font-mono text-gray-900 dark:text-gray-100">{longitude}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={getCurrentLocation}
              disabled={locationLoading}
              className="btn-secondary flex items-center justify-center space-x-2 flex-1"
            >
              {locationLoading ? (
                <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
              ) : (
                <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
              )}
              <span>Użyj mojej lokalizacji</span>
            </button>
            
            <button
              onClick={fetchWeatherData}
              disabled={loading || !latitude || !longitude}
              className="btn-primary flex items-center justify-center space-x-2 flex-1"
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
              ) : (
                <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
              )}
              <span>Pobierz prognozę</span>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 animate-slide-in">
              <div className="flex items-start space-x-2">
                <FontAwesomeIcon 
                  icon={faExclamationTriangle} 
                  className="w-5 h-5 text-red-500 mt-0.5" 
                />
                <p className="text-red-700 dark:text-red-400">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Weather Results */}
      {weatherData && <WeatherResults data={weatherData} />}

      {/* Info Card */}
      <InfoCard />
    </div>
  )
}