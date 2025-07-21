import { 
  WeatherData, 
  DailyForecastApiResponse, 
  WeeklySummaryApiResponse 
} from '../types/weather'

export const fetchWeatherDataWithCoord = async (lat: string, lon: string): Promise<WeatherData> => {
  const [dailyResponse, weeklyResponse] = await Promise.all([
    fetch(`/api/daily-forecast?latitude=${lat}&longitude=${lon}`),
    fetch(`/api/weekly-summary?latitude=${lat}&longitude=${lon}`),
  ])
  
  if (!dailyResponse.ok || !weeklyResponse.ok) {
    throw new Error('Nie udało się pobrać danych z serwera')
  }
  
  const dailyData: DailyForecastApiResponse = await dailyResponse.json()
  const weeklyData: WeeklySummaryApiResponse = await weeklyResponse.json()

  const mappedData: WeatherData = {
    daily: dailyData.daily.map((day) => ({
      date: day.date,
      weatherCode: day.weathercode,
      tempMax: day.temperature_max,
      tempMin: day.temperature_min,
      solarEnergy: day.solar_energy
    })),
    summary: {
      tempMin: weeklyData.min_temperature,
      tempMax: weeklyData.max_temperature,
      avgPressure: weeklyData.average_pressure,
      avgSunExposure: weeklyData.average_sunshine,
      comment: weeklyData.summary
    }
  }

  return mappedData
}