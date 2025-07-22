import { useState, useCallback } from 'react'

interface UseGeolocationProps {
  onSuccess: (lat: number, lng: number) => void;
}

interface UseGeolocationReturn {
  getCurrentLocation: () => void;
  loading: boolean;
  error: string | null;
}

export const useGeolocation = ({ onSuccess }: UseGeolocationProps): UseGeolocationReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCurrentLocation = useCallback(() => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      const errorMessage = 'Przeglądarka nie obsługuje geolokalizacji'
      setError(errorMessage)
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        onSuccess(lat, lng)
        setLoading(false)
      },
      (geolocationError) => {
        let errorMessage = 'Nie udało się pobrać lokalizacji'
        
        switch (geolocationError.code) {
          case geolocationError.PERMISSION_DENIED:
            errorMessage = 'Dostęp do lokalizacji został odrzucony'
            break
          case geolocationError.POSITION_UNAVAILABLE:
            errorMessage = 'Lokalizacja nie jest dostępna'
            break
          case geolocationError.TIMEOUT:
            errorMessage = 'Przekroczono limit czasu pobierania lokalizacji'
            break
        }
        
        setError(errorMessage)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }, [onSuccess])

  return {
    getCurrentLocation,
    loading,
    error
  }
}