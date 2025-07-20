import { WeatherData } from '../types/types'

export const weatherService = {
  async fetchWeatherData(latitude: string, longitude: string): Promise<WeatherData> {
    const [dailyResponse, weeklyResponse] = await Promise.all([
      fetch(`/api/daily-forecast?latitude=${latitude}&longitude=${longitude}`),
      fetch(`/api/weekly-summary?latitude=${latitude}&longitude=${longitude}`),
    ])

    if (!dailyResponse.ok || !weeklyResponse.ok) {
      throw new Error('Nie udało się pobrać danych z serwera')
    }

    const dailyData = await dailyResponse.json()
    const weeklyData = await weeklyResponse.json()

    return this.mapApiDataToWeatherData(dailyData, weeklyData)
  },

  mapApiDataToWeatherData(dailyData: any, weeklyData: any): WeatherData {
    return {
      daily: dailyData.daily.map((day: any) => ({
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