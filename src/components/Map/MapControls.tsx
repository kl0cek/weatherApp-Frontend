import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'

interface MapControlsProps {
  onGetCurrentLocation: () => void
  onFetchWeather: () => void
  locationLoading: boolean
  weatherLoading: boolean
  disabled: boolean
}

export const MapControls = ({ 
  onGetCurrentLocation, 
  onFetchWeather, 
  locationLoading, 
  weatherLoading, 
  disabled 
}: MapControlsProps) => {
  return (
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
        disabled={weatherLoading || disabled}
        className="btn-primary flex items-center justify-center space-x-2 flex-1"
      >
        {weatherLoading ? (
          <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
        ) : (
          <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
        )}
        <span>Pobierz prognozę</span>
      </button>
    </div>
  )
}