import { 
  WeatherData, 
  DailyForecastApiResponse, 
  WeeklySummaryApiResponse 
} from '../types/weather'

export const weatherService = {
  async fetchWeatherData(latitude: string, longitude: string): Promise<WeatherData> {
    const [dailyResponse, weeklyResponse] = await Promise.all([
      fetch(`/api/daily-forecast?latitude=${latitude}&longitude=${longitude}`),
      fetch(`/api/weekly-summary?latitude=${latitude}&longitude=${longitude}`),
    ])

    if (!dailyResponse.ok || !weeklyResponse.ok) {
      throw new Error('Nie udało się pobrać danych z serwera')
    }

    const dailyData: DailyForecastApiResponse = await dailyResponse.json()
    const weeklyData: WeeklySummaryApiResponse = await weeklyResponse.json()

    return this.mapApiDataToWeatherData(dailyData, weeklyData)
  },

  mapApiDataToWeatherData(
    dailyData: DailyForecastApiResponse, 
    weeklyData: WeeklySummaryApiResponse
  ): WeatherData {
    if (!dailyData.daily || !Array.isArray(dailyData.daily)) {
      throw new Error('Nieprawidłowa struktura danych z API - daily data')
    }

    if (!weeklyData || typeof weeklyData !== 'object') {
      throw new Error('Nieprawidłowa struktura danych z API - weekly data')
    }

    return {
      daily: dailyData.daily.map(day => ({
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
  }
}