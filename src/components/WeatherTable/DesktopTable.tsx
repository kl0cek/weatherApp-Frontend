'use client'
import { getWeatherIcon } from "../../data/dataCode"
import { getDayName, getEnergyColor } from "../../utils/weatherUtils"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DailyWeather } from "../../types/weather"

interface WeatherTableProps {
    data: DailyWeather[]
}

export const DesktopTable = ({data}: WeatherTableProps) => {

    return (
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
    )
}