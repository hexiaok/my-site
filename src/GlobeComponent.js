import React, { useState, useEffect, useRef } from 'react';
import GlobeInstance from './components/Globe.jsx';
import './GlobeComponent.css';

const GlobeComponent = () => {
  const [pointsData, setPointsData] = useState([]);
  const [isGlobeRotating, setIsGlobeRotating] = useState(true);
  const globeEl1 = useRef();

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
        description: 'a designer @Google',
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
        description: 'a researcher @GSD',
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
        description: 'a designer @DH',
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
        description: 'a designer @Grab',
        isExpanded: false
      }
    ];
    setPointsData(initialPointsData);
  }, []);

  useEffect(() => {
    if (globeEl1.current) {
      globeEl1.current.controls().autoRotate = isGlobeRotating;
      globeEl1.current.controls().autoRotateSpeed = 0.2;
    }
  }, [isGlobeRotating]);

  const handleCityClick = (clickedCity) => {
    setIsGlobeRotating(false); // Stop rotation on city click
    setPointsData(pointsData.map(city => ({
      ...city,
      isExpanded: city === clickedCity ? !city.isExpanded : false
    })));
  };

  return (
    <div className="main-page-layout">
      <div className="globe-container">
        <GlobeInstance
          globeEl={globeEl1}
          pointsData={pointsData}
          handleCityClick={handleCityClick}
          isGlobeRotating={isGlobeRotating}
        />
      </div>
      <div className="hero-section">
                  <div className="hero-text">
                    <p className="mb-0">This is </p>
                    <p>Jian He</p>
                  </div>        <div className="sub-hero-text">a designer</div>
      </div>
    </div>
  );
};

export default GlobeComponent;

