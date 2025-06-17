'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faLocationDot, 
  faSearch, 
  faSpinner,
  faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons'
import WeatherTable from '../components/WeatherTable'
import WeatherSummary from '../components/WeatherSummary'

export default function HomePage() {
  const searchParams = useSearchParams()
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [locationLoading, setLocationLoading] = useState(false)

  const getCurrentLocation = () => {
    setLocationLoading(true)
    setError('')

    if(!navigator.geolocation) {
      setLocationLoading(false)
      setError('No support for geolocalization from browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(4))
        setLongitude(position.coords.longitude.toFixed(4))
        setLocationLoading(false)
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
    setWeatherData(getMockWeatherData())
  }
  const fetchWeatherData = async () => {
    await fetchWeatherDataWithCoord(latitude, longitude)
  }

// test
  const getMockWeatherData = () => ({
    daily: [
      {
        date: '17/06/2025',
        weatherCode: 1,
        tempMax: 24,
        tempMin: 16,
        solarEnergy: 4.2
      },
      {
        date: '18/06/2025',
        weatherCode: 2,
        tempMax: 26,
        tempMin: 18,
        solarEnergy: 3.8
      },
      {
        date: '19/06/2025',
        weatherCode: 61,
        tempMax: 22,
        tempMin: 15,
        solarEnergy: 2.1
      },
      {
        date: '20/06/2025',
        weatherCode: 3,
        tempMax: 25,
        tempMin: 17,
        solarEnergy: 3.5
      },
      {
        date: '21/06/2025',
        weatherCode: 0,
        tempMax: 28,
        tempMin: 19,
        solarEnergy: 5.1
      },
      {
        date: '22/06/2025',
        weatherCode: 80,
        tempMax: 21,
        tempMin: 14,
        solarEnergy: 1.8
      },
      {
        date: '23/06/2025',
        weatherCode: 1,
        tempMax: 23,
        tempMin: 16,
        solarEnergy: 4.0
      }
    ],
    summary: {
      tempMin: 14,
      tempMax: 28,
      avgPressure: 1013.2,
      avgSunExposure: 6.8,
      comment: 'Przeważnie słoneczny tydzień z pojedynczymi opadami w środku okresu.'
    }
  })


  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 animate-slide-in">
          Prognoza Pogody na 7 Dni
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-slide-in">
          Wprowadź współrzędne geograficzne, aby uzyskać szczegółową prognozę pogody 
          wraz z informacjami o potencjale energii słonecznej
        </p>
      </div>

      {/* Location Input Form */}
      <div className="card max-w-2xl mx-auto animate-scale-in">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Wybierz lokalizację
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Szerokość geograficzna
              </label>
              <input
                id="latitude"
                type="number"
                step="any"
                placeholder="np. 50.0647"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Długość geograficzna
              </label>
              <input
                id="longitude"
                type="number"
                step="any"
                placeholder="np. 19.9450"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

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
      {weatherData && (
        <div className="space-y-8 animate-fade-in">
          <WeatherTable data={weatherData.daily} />
          <WeatherSummary data={weatherData.summary} />
        </div>
      )}

      {/* Info Card */}
      <div className="card max-w-4xl mx-auto animate-scale-in">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          💡 Jak korzystać z aplikacji
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-400">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
              Wprowadź współrzędne ręcznie
            </h4>
            <p>
              Wpisz szerokość i długość geograficzną w formacie dziesiętnym 
              (np. 50.0647, 19.9450 dla Krakowa)
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
              Użyj automatycznej lokalizacji
            </h4>
            <p>
              Kliknij przycisk &quot;Użyj mojej lokalizacji&quot; aby automatycznie 
              pobrać twoje obecne współrzędne
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
              Wybierz z mapy w trakcie heh bedzie to bedzie frfr
            </h4>
            <p>
              Przejdź do sekcji &quot;Wybierz z mapy&quot; aby wybrać lokalizację 
              klikając na interaktywnej mapie świata
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}