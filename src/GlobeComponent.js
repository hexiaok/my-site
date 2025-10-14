import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import './GlobeComponent.css';

const GlobeComponent = () => {
  const [pointsData, setPointsData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const globeEl = useRef();

  useEffect(() => {
    // Zurich, Switzerland
    const zurich = {
      lat: 47.3769,
      lng: 8.5417,
      size: 10, // size in pixels
      name: 'Zurich',
      city: 'Zurich',
      country: 'Switzerland',
      description: 'Zurich is the largest city in Switzerland and the capital of the canton of Zürich. It is located in north-central Switzerland, at the northwestern tip of Lake Zurich.'
    };

    const cambridge = {
        lat: 42.3666,
        lng: -71.1057,
        size: 10,
        name: 'Cambridge',
        city: 'Cambridge',
        country: 'USA',
        description: 'Cambridge is a city in Massachusetts, across the Charles River from Boston. It’s home to Harvard University.'
    };

    const ningbo = {
        lat: 29.8683,
        lng: 121.5439,
        size: 10,
        name: 'Ningbo',
        city: 'Ningbo',
        country: 'China',
        description: 'Ningbo is a major port and industrial hub in east China\'s Zhejiang province.'
    };

    const berlin = {
        lat: 52.5200,
        lng: 13.4050,
        size: 10,
        name: 'Berlin',
        city: 'Berlin',
        country: 'Germany',
        description: 'Berlin, Germany’s capital, dates to the 13th century.'
    };

    const singapore = {
        lat: 1.3521,
        lng: 103.8198,
        size: 10,
        name: 'Singapore',
        city: 'Singapore',
        country: 'Singapore',
        description: 'Singapore, an island city-state off southern Malaysia, is a global financial center with a tropical climate and multicultural population.'
    };

    setPointsData([zurich, cambridge, ningbo, berlin, singapore]);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.2;
    }
  }, []);

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const handleCloseCard = () => {
    setSelectedCity(null);
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
          el.innerHTML = `<div class="glowing-dot"></div><div class="city-label">${d.name}</div>`;
          el.style.color = d.color;
          el.style.width = `${d.size}px`;
          el.style.pointerEvents = 'auto';
          el.style.cursor = 'pointer';
          el.onclick = () => handleCityClick(d);
          return el;
        }}
        onHtmlElementClick={handleCityClick}
      />
      {selectedCity && (
        <div className="info-card">
          <span className="close-button" onClick={handleCloseCard}>&times;</span>
          <h2>{selectedCity.city}</h2>
          <p><strong>Country:</strong> {selectedCity.country}</p>
          <p>{selectedCity.description}</p>
        </div>
      )}
    </>
  );
};

export default GlobeComponent;
