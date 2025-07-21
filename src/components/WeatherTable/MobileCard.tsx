'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getEnergyColor, getDayName } from '../../utils/weatherUtils'
import { DailyWeather } from '../../types/weather'
import { getWeatherIcon } from '../../data/dataCode'


interface WeatherTableProps {
    data: DailyWeather[]
}

export const MobileCard = ({data}: WeatherTableProps) => {
    return (
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
    )
}