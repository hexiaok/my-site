import React, { useRef, useEffect } from 'react'
import Globe from 'react-globe.gl'

function GlobeComponent() {
  const globeEl = useRef()

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true
      globeEl.current.controls().autoRotateSpeed = 1.0
      
      // Enable zoom
      globeEl.current.controls().enableZoom = true
      
      // Enable rotation
      globeEl.current.controls().enableRotate = true
    }
  }, [])

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      backgroundColor="rgba(0,0,0,0)"
      showAtmosphere={true}
      atmosphereColor="#ffffff"
      atmosphereAltitude={0.15}
    />
  )
}

export default GlobeComponent

