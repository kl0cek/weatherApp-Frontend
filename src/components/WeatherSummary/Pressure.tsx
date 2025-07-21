'use client'

import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getPressureCategory } from '@/src/utils/weatherUtils'
import { WeatherSummaryData } from '@/src/types/types'

interface WeatherSummaryProps {
  data: WeatherSummaryData
}

export const Pressure = ({data}: WeatherSummaryProps) => {

    const formatPressure = (pressure: number) => {
        return `${pressure.toFixed(1)} hPa`
    } 

    const pressureCategory = getPressureCategory(data.avgPressure)
    


    return (
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
    )
}