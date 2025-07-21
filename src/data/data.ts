import { WeatherData } from "../types/types"

const getMockWeatherData = (): WeatherData => ({
    daily: [
      {
        date: '17/06/2025',
        weatherCode: 1,
        tempMax: 24,
        tempMin: 16,
        solarEnergy: 4.2
      },
      {
        date: '18/06/2025',
        weatherCode: 2,
        tempMax: 26,
        tempMin: 18,
        solarEnergy: 3.8
      },
      {
        date: '19/06/2025',
        weatherCode: 61,
        tempMax: 22,
        tempMin: 15,
        solarEnergy: 2.1
      },
      {
        date: '20/06/2025',
        weatherCode: 3,
        tempMax: 25,
        tempMin: 17,
        solarEnergy: 3.5
      },
      {
        date: '21/06/2025',
        weatherCode: 0,
        tempMax: 28,
        tempMin: 19,
        solarEnergy: 5.1
      },
      {
        date: '22/06/2025',
        weatherCode: 80,
        tempMax: 21,
        tempMin: 14,
        solarEnergy: 1.8
      },
      {
        date: '23/06/2025',
        weatherCode: 1,
        tempMax: 23,
        tempMin: 16,
        solarEnergy: 4.0
      }
    ],
    summary: {
      tempMin: 14,
      tempMax: 28,
      avgPressure: 1013.2,
      avgSunExposure: 6.8,
      comment: 'Przeważnie słoneczny tydzień z pojedynczymi opadami w środku okresu.'
    }
  })