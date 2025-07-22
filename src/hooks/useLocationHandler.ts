import { Coordinates } from "../types/weather"

interface UseLocationHandlersProps {
  coordinates: Coordinates
  onCoordinatesChange: (coords: Coordinates) => void
}

export const useLocationHandler = ({ coordinates, onCoordinatesChange }: UseLocationHandlersProps) => {
  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    
    if (value === '') {
      onCoordinatesChange({ ...coordinates, latitude: null })
      return
    }
    
    const numericValue = parseFloat(value)
    if (!isNaN(numericValue)) {
      onCoordinatesChange({ ...coordinates, latitude: numericValue })
    }
  }

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    
    if (value === '') {
      onCoordinatesChange({ ...coordinates, longitude: null })
      return
    }
    
    const numericValue = parseFloat(value)
    if (!isNaN(numericValue)) {
      onCoordinatesChange({ ...coordinates, longitude: numericValue })
    }
  }

  return {
    handleLatitudeChange,
    handleLongitudeChange
  }
}