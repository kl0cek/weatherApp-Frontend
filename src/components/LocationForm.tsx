import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faLocationDot, 
  faSearch, 
  faSpinner,
  faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons'
import { LocationFormProps } from '../types/weather'
import { useLocationHandler } from '../hooks'

export const  LocationForm = ({
  coordinates,
  onCoordinatesChange,
  onGetCurrentLocation,
  onFetchWeather,
  loading,
  locationLoading,
  error
}: LocationFormProps) => {

  const {handleLatitudeChange, handleLongitudeChange } = useLocationHandler({
    coordinates,
    onCoordinatesChange
  })

  const isFormValid = coordinates.latitude && coordinates.longitude

  return (
    <div className="card max-w-2xl mx-auto animate-scale-in">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Wpisz lokalizację
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Szerokość geograficzna
            </label>
            <input
              id="latitude"
              type="number"
              step="any"
              placeholder="np. 50.0647"
              value={coordinates.latitude ?? ''}
              onChange={handleLatitudeChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Długość geograficzna
            </label>
            <input
              id="longitude"
              type="number"
              step="any"
              placeholder="np. 19.9450"
              value={coordinates.longitude ?? ''}
              onChange={handleLongitudeChange}
              className="input-field"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onGetCurrentLocation}
            disabled={locationLoading}
            className="btn-secondary flex items-center justify-center space-x-2 flex-1"
          >
            {locationLoading ? (
              <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
            ) : (
              <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
            )}
            <span>Użyj mojej lokalizacji</span>
          </button>
          
          <button
            onClick={onFetchWeather}
            disabled={loading || !isFormValid}
            className="btn-primary flex items-center justify-center space-x-2 flex-1"
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
            ) : (
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
            )}
            <span>Pobierz prognozę</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 animate-slide-in">
            <div className="flex items-start space-x-2">
              <FontAwesomeIcon 
                icon={faExclamationTriangle} 
                className="w-5 h-5 text-red-500 mt-0.5" 
              />
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}