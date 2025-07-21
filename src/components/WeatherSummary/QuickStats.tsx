'use client'

import { WeatherSummaryData } from "../../types/weather"

interface WeatherSummaryProps {
  data: WeatherSummaryData
} 

export const QuickStats = ( {data}: WeatherSummaryProps) => {

    const averageTemp = Math.round((data.tempMax + data.tempMin) / 2)
    const tempRange = (data.tempMax - data.tempMin).toFixed(1)
    const weeklySum = Math.round(data.avgSunExposure * 7)

    return (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="text-center">
            <span className="block font-medium text-gray-900 dark:text-gray-100">
              {averageTemp}°C
            </span>
            <span>Średnia temp.</span>
          </div>
          <div className="text-center">
            <span className="block font-medium text-gray-900 dark:text-gray-100">
              {tempRange}°C
            </span>
            <span>Rozpiętość</span>
          </div>
          <div className="text-center">
            <span className="block font-medium text-gray-900 dark:text-gray-100">
              {weeklySum}h
            </span>
            <span>Słońce/tydzień</span>
          </div>
        </div>
      </div>
    )
}