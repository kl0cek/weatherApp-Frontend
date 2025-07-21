import {WeatherTable, WeatherSummary } from './index'
import { WeatherData } from '../types/weather'

interface WeatherResultsProps {
  data: WeatherData
}

export const WeatherResult = ({ data }: WeatherResultsProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <WeatherTable data={data.daily} />
      <WeatherSummary data={data.summary} />
    </div>
  )
}