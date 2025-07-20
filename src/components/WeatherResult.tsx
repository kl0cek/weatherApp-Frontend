import WeatherTable from './WeatherTable'
import WeatherSummary from './WeatherSummary'
import { WeatherData } from '../types/types'

interface WeatherResultsProps {
  data: WeatherData
}

export function WeatherResults({ data }: WeatherResultsProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <WeatherTable data={data.daily} />
      <WeatherSummary data={data.summary} />
    </div>
  )
}