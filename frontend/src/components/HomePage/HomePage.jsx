import React from 'react';
import './HomePage.css';
import TestAPI from '../TestAPI/TestAPI.jsx';
// import MovingDots from '../MovingDots/MovingDoots.jsx';
import BoundingBox from '../BoundingBox/BoundingBox.jsx';

const HomePage = () => {
  return (
    <div className='home-container'>
      <div className='home-left'>
        <h1>Welcome to the Aerofoil Simulator</h1>
        <TestAPI/>
      </div>
      {/* <MovingDots/> */}
      <div className='home-right'>
          <BoundingBox className="bounding-box">
              {/* Other SVG elements or custom components go here */}
          </BoundingBox>
      </div>
    </div>
  );
};

export default HomePage;