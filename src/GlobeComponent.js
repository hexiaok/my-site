import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import './GlobeComponent.css';

const GlobeComponent = () => {
  const [pointsData, setPointsData] = useState([]);
  const globeEl = useRef();

  useEffect(() => {
    const initialPointsData = [
      {
        lat: 47.3769,
        lng: 8.5417,
        size: 10,
        name: 'Zurich',
        city: 'Zurich',
        country: 'Switzerland',
        year: '2021-now',
        description: 'A designer @Google',
        isExpanded: false
      },
      {
        lat: 42.3666,
        lng: -71.1057,
        size: 10,
        name: 'Cambridge',
        city: 'Cambridge',
        country: 'USA',
        year: '2011-2015',
        description: 'A student & researcher @GSD',
        isExpanded: false
      },
      {
        lat: 29.8683,
        lng: 121.5439,
        size: 10,
        name: 'Ningbo',
        city: 'Ningbo',
        country: 'China',
        description: 'Just a kid',
        isExpanded: false
      },
      {
        lat: 52.5200,
        lng: 13.4050,
        size: 10,
        name: 'Berlin',
        city: 'Berlin',
        country: 'Germany',
        year: '2019-2021',
        description: 'A designer @DH',
        isExpanded: false
      },
      {
        lat: 1.3521,
        lng: 103.8198,
        size: 10,
        name: 'Singapore',
        city: 'Singapore',
        country: 'Singapore',
        year: '2015-2019',
        description: 'A designer @Grab',
        isExpanded: false
      }
    ];
    setPointsData(initialPointsData);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.2;
    }
  }, []);

  const handleCityClick = (clickedCity) => {
    setPointsData(pointsData.map(city => ({
      ...city,
      isExpanded: city === clickedCity ? !city.isExpanded : false
    })));
  };

  return (
    <>
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
            el.innerHTML = `
              <div class="glowing-dot"></div>
              <div class="city-label expanded">
                <div class="city-name">${d.city}</div>
                <div class="city-year">${d.year}</div>
                <div class="city-description">${d.description}</div>
              </div>
            `;
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
      <div className="hero-text">This is Jian He</div>
    </>
  );
};

export default GlobeComponent;
