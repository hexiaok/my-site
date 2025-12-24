import React, { useEffect } from 'react';
import Globe from 'react-globe.gl';

const GlobeInstance = React.forwardRef(({ globeEl, pointsData, handleCityClick, isGlobeRotating }, ref) => {

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().enableZoom = true;
      globeEl.current.controls().enableRotate = true;
      globeEl.current.controls().enablePan = true;
      globeEl.current.controls().autoRotate = isGlobeRotating;
      globeEl.current.controls().autoRotateSpeed = 0.2;
    }
  }, [globeEl, isGlobeRotating]);

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
        if (d.isExpanded) {
          let labelHtml = `
            <div class="glowing-dot"></div>
            <div class="city-label expanded">
              <div class="city-name">${d.city}</div>
          `;
          if (d.year) {
            labelHtml += `<div class="city-year">${d.year}</div>`;
          }
          labelHtml += `
              <div class="city-description">${d.description}</div>
            </div>
          `;
          el.innerHTML = labelHtml;
        } else {
          el.innerHTML = `<div class="glowing-dot"></div><div class="city-label">${d.name}</div>`;
        }
        el.style.color = d.color;
        el.style.width = `${d.size}px`;
        el.style.pointerEvents = 'auto';
        el.style.cursor = 'pointer';
        el.onclick = () => handleCityClick(d);
        return el;
      }}
      onHtmlElementClick={handleCityClick}
    />
  );
});

export default GlobeInstance;