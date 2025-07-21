import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

interface CoordinatesDisplayProps {
  latitude: string
  longitude: string
}

export const CoordinatesDisplay = ({ latitude, longitude }: CoordinatesDisplayProps) => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 animate-slide-in">
      <div className="flex items-center space-x-2 mb-2">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          Wybrana lokalizacja
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600 dark:text-gray-400">Szerokość:</span>
          <span className="ml-2 font-mono text-gray-900 dark:text-gray-100">{latitude}</span>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400">Długość:</span>
          <span className="ml-2 font-mono text-gray-900 dark:text-gray-100">{longitude}</span>
        </div>
      </div>
    </div>
  )
}