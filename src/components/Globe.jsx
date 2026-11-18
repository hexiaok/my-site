import React, { useEffect } from 'react';
import Globe from 'react-globe.gl';

const GlobeInstance = React.forwardRef(({ globeEl, pointsData, handleCityClick, isGlobeRotating, reducedMotion = false }, ref) => {

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().enableZoom = true;
      globeEl.current.controls().enableRotate = true;
      globeEl.current.controls().enablePan = true;
      globeEl.current.controls().autoRotate = isGlobeRotating && !reducedMotion;
      globeEl.current.controls().autoRotateSpeed = 0.2;
    }
  }, [globeEl, isGlobeRotating, reducedMotion]);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundColor="rgba(0,0,0,0)"
      atmosphereColor="rgba(255, 255, 255, 0.21)"
      showAtmosphere={true}

      htmlElementsData={pointsData}
      htmlElement={d => {
        const el = document.createElement('div');
        el.className = 'city-pin';
        el.innerHTML = `<div class="glowing-dot"></div><div class="city-label">${d.name}</div>`;
        el.style.color = d.color;
        el.style.width = `${d.size}px`;
        el.style.pointerEvents = 'auto';
        el.style.cursor = 'pointer';
        // Keyboard + screen-reader access to each city pin
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', `${d.name}, ${d.year}`);
        el.onclick = () => handleCityClick(d);
        el.onkeydown = e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCityClick(d);
          }
        };
        return el;
      }}
    />
  );
});

export default GlobeInstance;
