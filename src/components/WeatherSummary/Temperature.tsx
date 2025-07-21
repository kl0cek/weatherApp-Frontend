'use client'

import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { WeatherSummaryData } from '@/src/types/weather'

interface WeatherSummaryProps {
  data: WeatherSummaryData
}

export const Temperature = ({data}: WeatherSummaryProps) => {

    return (
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
    )
}