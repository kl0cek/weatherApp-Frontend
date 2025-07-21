'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { WeatherSummaryData } from '../types/types'

interface WeatherSummaryProps {
    data: WeatherSummaryData
}

export const Comment = ({data}: WeatherSummaryProps) => {


    return (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 animate-scale-in" style={{ animationDelay: '300ms' }}>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FontAwesomeIcon icon={faComment} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Podsumowanie prognozy
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {data.comment}
                    </p>
                  </div>
                </div>
              </div>
    )
}