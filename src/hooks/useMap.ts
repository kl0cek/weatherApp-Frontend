import { useState, useEffect, useRef, useCallback } from 'react'
import { loadLeafletMap } from '../utils/mapLoader'
import type { 
  LeafletMap, 
  LeafletMarker, 
  LeafletEvent,
  LeafletLibrary,
  UseMapProps, 
  UseMapReturn 
} from '../types/leafletTypes'

export const useMap = ({
  containerId,
  initialCenter,
  initialZoom,
  onCoordinatesChange
}: UseMapProps): UseMapReturn => {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const markerRef = useRef<LeafletMarker | null>(null)

  const updateMapMarker = useCallback((map: LeafletMap, lat: number, lng: number) => {
    if (markerRef.current) {
      map.removeLayer(markerRef.current)
    }

    if (window.L) {
      const L: LeafletLibrary = window.L
      const newMarker = L.marker([lat, lng]).addTo(map)
      markerRef.current = newMarker
    }
  }, [])

  const updateMapView = useCallback((lat: number, lng: number, zoom = 13) => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], zoom)
      updateMapMarker(mapRef.current, lat, lng)
    }
  }, [updateMapMarker])

  const handleMapClick = useCallback((e: LeafletEvent) => {
    const { lat, lng } = e.latlng
    onCoordinatesChange(lat, lng)
    
    if (mapRef.current) {
      updateMapMarker(mapRef.current, lat, lng)
    }
  }, [onCoordinatesChange, updateMapMarker])

  useEffect(() => {
    const initializeMap = async () => {
      try {
        setMapError(null)
        const map = await loadLeafletMap(containerId, initialCenter, initialZoom)
        
        map.on('click', handleMapClick)
        mapRef.current = map
        setMapLoaded(true)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to initialize map'
        setMapError(errorMessage)
        console.error('Map initialization error:', error)
      }
    }

    initializeMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markerRef.current = null
      }
    }
  }, [containerId, initialCenter, initialZoom, handleMapClick])

  return {
    mapLoaded,
    mapError,
    updateMapView
  }
}