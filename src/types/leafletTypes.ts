export interface LeafletMap {
  setView: (center: [number, number], zoom: number) => LeafletMap
  on: (event: string, handler: (e: any) => void) => LeafletMap
  removeLayer: (layer: LeafletMarker) => LeafletMap
  remove: () => void
}

export interface LeafletMarker {
  addTo: (map: LeafletMap) => LeafletMarker
}

export interface UseMapProps {
  containerId: string
  initialCenter: [number, number]
  initialZoom: number
  onCoordinatesChange: (lat: number, lng: number) => void
}

export interface UseMapReturn {
  mapLoaded: boolean
  mapError: string | null
  updateMapView: (lat: number, lng: number, zoom?: number) => void
}