import React, { useState, useEffect, useRef } from 'react';
import GlobeInstance from './components/Globe.jsx';
import './GlobeComponent.css';

const GlobeComponent = () => {
  const [pointsData, setPointsData] = useState([]);
  const [isGlobeRotating, setIsGlobeRotating] = useState(true);
  const [isHeroTextVisible, setIsHeroTextVisible] = useState(true);
  const [showCityDetails, setShowCityDetails] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const globeEl1 = useRef();
  const cityDetailsRef = useRef();

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
        year: 'Just a kid',
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
    setIsHeroTextVisible(false); // Hide hero text on city click
    setShowCityDetails(true); // Show city details
    setSelectedCity(clickedCity); // Store selected city details
    // setPointsData(pointsData.map(city => ({ // Removed expansion logic
    //   ...city,
    //   isExpanded: city === clickedCity ? !city.isExpanded : false
    // })));
  };

  const handlePageClick = (event) => {
    // Check if the click was on a city label or inside the city details section
    const isCityLabelClick = event.target.closest('.city-label');
    const isCityDetailsClick = cityDetailsRef.current && cityDetailsRef.current.contains(event.target);

    if (!isCityLabelClick && !isCityDetailsClick) {
      setIsHeroTextVisible(true);
      setIsGlobeRotating(true);
      setShowCityDetails(false);
      setSelectedCity(null);
      setPointsData(pointsData.map(city => ({ ...city, isExpanded: false })));
    }
  };

  return (
    <div className="main-page-layout" onClick={handlePageClick}>
      <div className="globe-container">
        <GlobeInstance
          globeEl={globeEl1}
          pointsData={pointsData}
          handleCityClick={handleCityClick}
          isGlobeRotating={isGlobeRotating}
        />
      </div>
      <div className={`hero-section ${isHeroTextVisible ? '' : 'fade-out'}`}>
                  <div className="hero-text">
                    <p className="mb-0 nowrap">This is </p>
                    <p className="nowrap">Jian He</p>
                  </div>      </div>
      {showCityDetails && selectedCity && (
        <div ref={cityDetailsRef} className="city-details-section">
          <div className="city-details-title">{selectedCity.year}</div>
          <div className="city-details-subtitle">{selectedCity.description}</div>
          <div className="city-details-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut iaculis tellus non consequat porta. Integer vehicula vehicula tortor non euismod. Donec vestibulum orci dictum augue vehicula, et aliquam justo malesuada.
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeComponent;

