export interface DailyWeather {
  date: string
  weatherCode: number
  tempMax: number
  tempMin: number
  solarEnergy: number
}

export interface WeatherSummaryData {
  tempMin: number
  tempMax: number
  avgPressure: number
  avgSunExposure: number
  comment: string
}

export interface WeatherData {
  daily: DailyWeather[]
  summary: WeatherSummaryData
}

export interface Coordinates {
  latitude: string
  longitude: string
}

export interface LocationFormProps {
  coordinates: Coordinates
  onCoordinatesChange: (coords: Coordinates) => void
  onGetCurrentLocation: () => void
  onFetchWeather: () => void
  loading: boolean
  locationLoading: boolean
  error: string
}

export interface DailyForecastApiResponse {
  daily: Array<{
    date: string
    weathercode: number
    temperature_max: number
    temperature_min: number
    solar_energy: number
  }>
}

export interface WeeklySummaryApiResponse {
  min_temperature: number
  max_temperature: number
  average_pressure: number
  average_sunshine: number
  summary: string
}