import React, { useState, useEffect, useRef } from 'react';
import GlobeInstance from './components/Globe.jsx';
import './GlobeComponent.css';

const GlobeComponent = () => {
  const [pointsData, setPointsData] = useState([]);
  const globeEl1 = useRef();
  const globeEl2 = useRef();
  const scrollContainerRef = useRef();
  const scrollTargetRef = useRef();

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
      globeEl1.current.controls().autoRotate = true;
      globeEl1.current.controls().autoRotateSpeed = 0.2;
    }
    if (globeEl2.current) {
      globeEl2.current.controls().autoRotate = true;
      globeEl2.current.controls().autoRotateSpeed = 0.2;
    }
  }, []);

  const handleCityClick = (clickedCity) => {
    setPointsData(pointsData.map(city => ({
      ...city,
      isExpanded: city === clickedCity ? !city.isExpanded : false
    })));
  };

  const handleSubHeroClick = () => {
    scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={scrollContainerRef} className="scroll-container">
      <div className="globe-section">
        <div className="globe-wrapper">
          <GlobeInstance
            globeEl={globeEl1}
            pointsData={pointsData}
            handleCityClick={handleCityClick}
          />
        </div>
        <div className="hero-container">
          <div className="hero-text">This is <span className="nowrap">Jian He</span></div>
          <div className="sub-hero-line" onClick={handleSubHeroClick}>
            <div className="sub-hero-text">a designer, see my works</div>
            <div className="down-arrow"></div>
          </div>
        </div>
      </div>

      <div ref={scrollTargetRef} className="scroll-target">
        <div className="globe-wrapper">
          <GlobeInstance
            globeEl={globeEl2}
            pointsData={pointsData}
            handleCityClick={handleCityClick}
          />
        </div>
      </div>
    </div>
  );
};

export default GlobeComponent;

