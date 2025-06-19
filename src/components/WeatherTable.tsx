'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSun, 
  faCloud, 
  faCloudSun,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faBolt,
  faSmog
} from '@fortawesome/free-solid-svg-icons'

interface WeatherData {
    date: string,
    weatherCode: number,
    tempMax: number,
    tempMin: number,
    solarEnergy: number
}

interface WeatherTableProps {
    data: WeatherData[]
}

export default function WeatherData({ data }: WeatherTableProps) {
    const getWeatherIcon = (code: number) => {
        switch (code) {
            // Podstawowe warunki pogodowe
            case 0:
                return { icon: faSun, color: 'text-yellow-500', desc: 'Słonecznie' };
            case 1:
                return { icon: faCloudSun, color: 'text-yellow-400', desc: 'Przeważnie słonecznie' };
            case 2:
                return { icon: faCloud, color: 'text-gray-500', desc: 'Częściowo pochmurno' };
            case 3:
                return { icon: faCloud, color: 'text-gray-600', desc: 'Pochmurno' };
            
            // Mgła
            case 45:
            case 48:
                return { icon: faSmog, color: 'text-gray-400', desc: 'Mgła' };
            
            // Mżawka
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
                return { icon: faCloudRain, color: 'text-blue-400', desc: 'Mżawka' };
            
            // Marznąca mżawka
            case 56:
            case 57:
                return { icon: faSnowflake, color: 'text-blue-300', desc: 'Marznąca mżawka' };
            
            // Deszcz
            case 61:
            case 62:
            case 63:
            case 64:
            case 65:
                return { icon: faCloudRain, color: 'text-blue-500', desc: 'Deszcz' };
            
            // Marznący deszcz
            case 66:
            case 67:
                return { icon: faSnowflake, color: 'text-blue-300', desc: 'Marznący deszcz' };
            
            // Śnieg
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
                return { icon: faSnowflake, color: 'text-blue-200', desc: 'Śnieg' };
            
            // Ziarnisty śnieg
            case 77:
                return { icon: faSnowflake, color: 'text-blue-100', desc: 'Ziarnisty śnieg' };
            
            // Przelotne opady
            case 80:
            case 81:
            case 82:
                return { icon: faCloudShowersHeavy, color: 'text-blue-600', desc: 'Przelotne opady' };
            
            // Przelotny śnieg
            case 85:
            case 86:
                return { icon: faSnowflake, color: 'text-blue-200', desc: 'Przelotny śnieg' };
            
            // Burza
            case 95:
                return { icon: faBolt, color: 'text-purple-500', desc: 'Burza' };
            
            // Burza z gradem
            case 96:
            case 99:
                return { icon: faBolt, color: 'text-purple-600', desc: 'Burza z gradem' };
            
            // Domyślny przypadek
            default:
                return { icon: faCloud, color: 'text-gray-500', desc: 'Nieznane' };
        }
    }

    const getDayName = (dateString: string) => {
    const [day, month, year] = dateString.split('/')
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    const today = new Date()
    
    if (date.toDateString() === today.toDateString()) {
      return 'Dziś'
    }
    
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Jutro'
    }
    
    return date.toLocaleDateString('pl-PL', { weekday: 'long' })
  }

  const getEnergyColor = (energy: number) => {
    if (energy >= 4) return 'text-green-600 dark:text-green-400'
    if (energy >= 2.5) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="card animate-slide-in">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Prognoza na najbliższe 7 dni
      </h2>
      
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-4 px-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                Dzień
              </th>
              <th className="py-4 px-2 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">
                Pogoda
              </th>
              <th className="py-4 px-2 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">
                Temperatura
              </th>
              <th className="py-4 px-2 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">
                Energia słoneczna
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((day, index) => {
              const weather = getWeatherIcon(day.weatherCode)
              return (
                <tr 
                  key={day.date} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td className="py-4 px-2">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {getDayName(day.date)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {day.date}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <FontAwesomeIcon 
                        icon={weather.icon} 
                        className={`w-8 h-8 ${weather.color} animate-bounce-gentle`}
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {weather.desc}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {day.tempMax}°C
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        min: {day.tempMin}°C
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className={`text-lg font-semibold ${getEnergyColor(day.solarEnergy)}`}>
                      {day.solarEnergy} kWh
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {data.map((day, index) => {
          const weather = getWeatherIcon(day.weatherCode)
          return (
            <div 
              key={day.date}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 transition-all duration-200 hover:shadow-md animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {getDayName(day.date)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {day.date}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <FontAwesomeIcon 
                      icon={weather.icon} 
                      className={`w-6 h-6 ${weather.color} mb-1`}
                    />
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {weather.desc}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {day.tempMax}°C
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {day.tempMin}°C
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-sm font-semibold ${getEnergyColor(day.solarEnergy)}`}>
                      {day.solarEnergy} kWh
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      energia
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}