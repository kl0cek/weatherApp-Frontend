export interface LeafletLatLng {
  lat: number;
  lng: number;
}

export interface LeafletEvent {
  latlng: LeafletLatLng;
  type: string;
  target: LeafletMap;
}

export interface LeafletMap {
  setView: (center: [number, number], zoom: number) => LeafletMap;
  on: (event: string, handler: (e: LeafletEvent) => void) => LeafletMap;
  removeLayer: (layer: LeafletMarker) => LeafletMap;
  remove: () => void;
}

export interface LeafletMarker {
  addTo: (map: LeafletMap) => LeafletMarker;
}
export interface LeafletLibrary {
  map: (containerId: string) => LeafletMap;
  tileLayer: (url: string, options: LeafletTileLayerOptions) => LeafletTileLayer;
  marker: (latlng: [number, number]) => LeafletMarker;
}

export interface LeafletTileLayerOptions {
  attribution: string;
}

export interface LeafletTileLayer {
  addTo: (map: LeafletMap) => LeafletTileLayer;
}
declare global {
  interface Window {
    L: LeafletLibrary;
  }
}
export interface UseMapProps {
  containerId: string;
  initialCenter: [number, number];
  initialZoom: number;
  onCoordinatesChange: (lat: number, lng: number) => void;
}

export interface UseMapReturn {
  mapLoaded: boolean;
  mapError: string | null;
  updateMapView: (lat: number, lng: number, zoom?: number) => void;
}