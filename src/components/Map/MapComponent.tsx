import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useMap } from '../../hooks/useMap'
import { ErrorMessage } from './ErrorMessage'

interface MapComponentProps {
  latitude: number | null
  longitude: number | null
  onCoordinatesChange: (lat: number, lng: number) => void
}

export const MapComponent = ({ latitude, longitude, onCoordinatesChange }: MapComponentProps) => {
  const { mapLoaded, mapError, updateMapView } = useMap({
    containerId: 'map',
    initialCenter: [52.2297, 21.0122],
    initialZoom: 6,
    onCoordinatesChange
  })

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      updateMapView(latitude, longitude)
    }
  }, [latitude, longitude, updateMapView])

  return (
    <div className="relative">
      <div 
        id="map" 
        className="w-full h-96 rounded-lg border-2 border-gray-200 dark:border-gray-700"
        style={{ minHeight: '400px' }}
      />
      
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 animate-spin text-gray-500 mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Ładowanie mapy...</p>
          </div>
        </div>
      )}

      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <ErrorMessage message={mapError} />
        </div>
      )}
    </div>
  )
}