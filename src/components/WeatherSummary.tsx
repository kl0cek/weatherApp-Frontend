'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faThermometerHalf,
  faGaugeHigh,
  faSun,
  faComment
} from '@fortawesome/free-solid-svg-icons'

interface WeatherSummaryData {
  tempMin: number
  tempMax: number
  avgPressure: number
  avgSunExposure: number
  comment: string
}

interface WeatherSummaryProps {
  data: WeatherSummaryData
}

export default function WeatherSummary({ data }: WeatherSummaryProps) {
  const formatPressure = (pressure: number) => {
    return `${pressure.toFixed(1)} hPa`
  }

  const formatSunExposure = (hours: number) => {
    const wholeHours = Math.floor(hours)
    const minutes = Math.round((hours - wholeHours) * 60)
    
    if (minutes === 0) {
      return `${wholeHours}h`
    }
    return `${wholeHours}h ${minutes}min`
  }

  const getPressureCategory = (pressure: number) => {
    if (pressure < 1000) return { text: 'Niskie', color: 'text-blue-600 dark:text-blue-400' }
    if (pressure > 1020) return { text: 'Wysokie', color: 'text-green-600 dark:text-green-400' }
    return { text: 'Normalne', color: 'text-gray-600 dark:text-gray-400' }
  }

  const getSunExposureCategory = (hours: number) => {
    if (hours < 4) return { text: 'Mało słońca', color: 'text-gray-600 dark:text-gray-400' }
    if (hours > 8) return { text: 'Dużo słońca', color: 'text-yellow-600 dark:text-yellow-400' }
    return { text: 'Umiarkowanie', color: 'text-orange-600 dark:text-orange-400' }
  }

  const pressureCategory = getPressureCategory(data.avgPressure)
  const sunCategory = getSunExposureCategory(data.avgSunExposure)

  return (
    <div className="card animate-slide-in">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Podsumowanie tygodnia
      </h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Temperature Range */}
        <div className="bg-gradient-to-br from-red-50 to-blue-50 dark:from-red-900/20 dark:to-blue-900/20 rounded-lg p-6 transition-all duration-300 hover:shadow-lg animate-scale-in">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faThermometerHalf} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Skrajne temperatury
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                w ciągu tygodnia
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Maksymalna:</span>
              <span className="text-lg font-bold text-red-600 dark:text-red-400">
                {data.tempMax}°C
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Minimalna:</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {data.tempMin}°C
              </span>
            </div>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Różnica: {(data.tempMax - data.tempMin).toFixed(1)}°C
            </div>
          </div>
        </div>

        {/* Pressure */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 transition-all duration-300 hover:shadow-lg animate-scale-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faGaugeHigh} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Średnie ciśnienie
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                atmosferyczne
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatPressure(data.avgPressure)}
              </div>
              <div className={`text-sm font-medium ${pressureCategory.color}`}>
                {pressureCategory.text}
              </div>
            </div>
          </div>
        </div>

        {/* Sun Exposure */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6 transition-all duration-300 hover:shadow-lg animate-scale-in md:col-span-2 lg:col-span-1" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faSun} className="w-6 h-6 text-white animate-bounce-gentle" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Ekspozycja na słońce
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                średnio dziennie
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatSunExposure(data.avgSunExposure)}
              </div>
              <div className={`text-sm font-medium ${sunCategory.color}`}>
                {sunCategory.text}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 animate-scale-in" style={{ animationDelay: '300ms' }}>
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <FontAwesomeIcon icon={faComment} className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Podsumowanie prognozy
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {data.comment}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="text-center">
            <span className="block font-medium text-gray-900 dark:text-gray-100">
              {Math.round((data.tempMax + data.tempMin) / 2)}°C
            </span>
            <span>Średnia temp.</span>
          </div>
          <div className="text-center">
            <span className="block font-medium text-gray-900 dark:text-gray-100">
              {(data.tempMax - data.tempMin).toFixed(1)}°C
            </span>
            <span>Rozpiętość</span>
          </div>
          <div className="text-center">
            <span className="block font-medium text-gray-900 dark:text-gray-100">
              {Math.round(data.avgSunExposure * 7)}h
            </span>
            <span>Słońce/tydzień</span>
          </div>
        </div>
      </div>
    </div>
  )
}