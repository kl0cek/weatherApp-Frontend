'use client'

import { formatSunExposure } from '@/src/utils/weatherUtils'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { WeatherSummaryData } from '@/src/types/weather'
import { getSunExposureCategory } from '@/src/utils/weatherUtils'

interface WeatherSummaryProps {
  data: WeatherSummaryData
}

export const SunExposure = ({data}: WeatherSummaryProps) => {

    const sunCategory = getSunExposureCategory(data.avgSunExposure)
    

    return (
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
    )
}