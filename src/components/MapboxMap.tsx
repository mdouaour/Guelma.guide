'use client'

import { useEffect, useRef } from 'react'

interface Landmark {
  name: string
  lat: number
  lng: number
  category: string
}

interface MapboxMapProps {
  landmarks: Landmark[]
  onMarkerClick?: (landmark: Landmark) => void
}

export default function MapboxMap({ landmarks, onMarkerClick }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token || !mapContainer.current) return

    import('mapbox-gl').then((mapboxgl) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Mapbox = (mapboxgl as any).default || mapboxgl
      Mapbox.accessToken = token

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const map: any = new Mapbox.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [7.4247, 36.4621],
        zoom: 12,
      })

      map.addControl(new Mapbox.NavigationControl(), 'top-right')

      map.on('load', () => {
        landmarks.forEach((lm) => {
          const el = document.createElement('div')
          el.style.cssText = `
            width: 28px; height: 28px;
            background: linear-gradient(135deg, #D4AF37, #F59E0B);
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid #fff;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(212,175,55,0.5);
          `
          el.addEventListener('click', () => onMarkerClick?.(lm))

          new Mapbox.Marker({ element: el })
            .setLngLat([lm.lng, lm.lat])
            .setPopup(
              new Mapbox.Popup({ offset: 25 }).setHTML(
                `<div style="color:#000;font-family:sans-serif;padding:4px">
                  <strong>${lm.name}</strong><br/>
                  <span style="font-size:12px;color:#555">${lm.category}</span>
                </div>`
              )
            )
            .addTo(map)
        })
      })

      mapRef.current = map
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [landmarks, onMarkerClick])

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
}
