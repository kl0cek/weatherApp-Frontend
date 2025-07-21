'use client'

import { DailyWeather } from '../types/types'
import { MobileCard } from './MobileCard'
import { DesktopTable } from './DesktopTable'


interface WeatherTableProps {
    data: DailyWeather[]
}

export default function WeatherData({ data }: WeatherTableProps) {
    
  return (
    <div className="card animate-slide-in">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Prognoza na najbliższe 7 dni
      </h2>
      <DesktopTable data={data} />
      <MobileCard  data={data} />
    </div>
  )
}