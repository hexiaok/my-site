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
        'description-short': 'a designer @Google',
        'description-long': 'At Google, I began with the beloved Google Flights, and I moved to incubate new commercial verticals, creating a scalable framework that unlocked Google Search’s inaugural booking capabilities. Recently, the work has been a study in connection:driving cross-platform collaborations across Google Search and YouTube.',
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
        'description-short': 'a researcher @Harvard',
        'description-long': `At Harvard Exuma Project, the work started in the field: conducting on-site ethnography across the Exuma Islands in Bahamas, documenting local narratives to drive our design decisions. This data found its form in the Exuma Atlas, where I crafted visualizations for the book and website, alongside interactive applications to refine the digital experience.`,
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
        // 'description-short': 'Just a kid',
        'description-long': `Oh, take their picture," said the woman to her bemused husband, "I think they're artists."
"oh, go on," he shrugged. "They're just kids."
 -- Patti Smith "Just Kids"`,
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
        'description-short': 'a designer @Delivery Hero',
        'description-long': 'At Delivery Hero, a platform connecting millions to local food delivery, I worked to bridge the digital and the physical. I designed and launched the pandapay wallet across the APAC region. From there I turned to the last mile delivery experience, collaborating with data scientists to apply machine learning to decipher the delivery notes, ensuring precise and accurate drop-offs.',
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
        'description-short': 'a designer @Grab, MING Labs',
        'description-long': `Joined Grab as a founding design member, wearing multiple hats to shape Southeast Asia’s superapp. The work required constant shifting; from field research on driver onboarding to the co-creation workshops that breathed life into GrabFood and GrabRentals.

Moving to MING Labs, a bespoke design agency, I navigated a diverse landscape ranging from niche products to enterprise strategy, leading the research and design for XL Axiata and Asian Development Bank, while developing future-facing concepts for major clients eg. Schneider Electric, Visa.`,
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
                  <div className={`hero-text ${''/*isHeroTextVisible ? 'animate-in' : ''*/}`}>
                    <span>This</span>&nbsp;<span>is</span><br />
                    <span>Jian</span>&nbsp;<span>He</span>
                  </div>
      </div>
      {showCityDetails && selectedCity && (
        <div ref={cityDetailsRef} className="city-details-section">
          <div className="city-details-title">{selectedCity.year}</div>
          <div className="city-details-subtitle">{selectedCity['description-short']}</div>
          <div className="city-details-description">
            {selectedCity['description-long']}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeComponent;


