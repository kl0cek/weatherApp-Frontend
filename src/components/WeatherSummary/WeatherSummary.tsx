'use client'

import { WeatherSummaryData } from '../../types/weather'
import { QuickStats, Comment, SunExposure, Pressure, Temperature } from './index'

interface WeatherSummaryProps {
  data: WeatherSummaryData
}

export const WeatherSummary = ({ data }: WeatherSummaryProps) => {

  return (
    <div className="card animate-slide-in">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Podsumowanie tygodnia
      </h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        xs
        <Temperature data={data} />

        <Pressure data={data} />

        <SunExposure data={data}/>
      </div>

      <Comment data={data} />

      <QuickStats data={data} />
    </div>
  )
}