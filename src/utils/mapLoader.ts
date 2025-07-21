import type { LeafletMap } from '../types/leafletTypes'

declare global {
  interface Window {
    L: any;
  }
}

const loadLeafletCSS = (): Promise<void> => {
  return new Promise((resolve) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.onload = () => resolve()
    document.head.appendChild(link)
  })
}

const loadLeafletJS = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const ensureLeafletLoaded = async (): Promise<void> => {
  if (!window.L) {
    await Promise.all([loadLeafletCSS(), loadLeafletJS()])
  }
}

export const loadLeafletMap = async (
  containerId: string, 
  center: [number, number], 
  zoom: number
): Promise<LeafletMap> => {
  await ensureLeafletLoaded()

  if (typeof window === 'undefined' || !window.L) {
    throw new Error('Failed to load Leaflet library')
  }

  const map = window.L.map(containerId).setView(center, zoom)

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  return map
}