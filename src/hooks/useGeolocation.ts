import { useState, useCallback } from 'react'
import { Coordinates } from '../types/weather'

export const useGeolocation = (setCoordinates: (coords: Coordinates) => void) => {
  const [loading, setLoading] = useState(false)

  const getCurrentLocation = useCallback(() => {
    setLoading(true)

    if (!navigator.geolocation) {
      setLoading(false)
      throw new Error('No support for geolocalization from browser')
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude.toFixed(4),
          longitude: position.coords.longitude.toFixed(4)
        })
        setLoading(false)
      },
      (error) => {
        setLoading(false)
        throw new Error('Nie udało się pobrać lokalizacji: ' + error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }, [setCoordinates])

  return {
    getCurrentLocation,
    loading
  }
}