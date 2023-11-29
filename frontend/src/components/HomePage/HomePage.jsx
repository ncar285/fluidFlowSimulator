import React, { useEffect, useState } from 'react';
import './HomePage.css';
import TestAPI from '../TestAPI/TestAPI.jsx';
// import MovingDots from '../MovingDots/MovingDoots.jsx';
import BoundingBox from '../BoundingBox/BoundingBox.jsx';
import Particle from '../Particle/Particle.jsx';
import { generatePlainVelocityField } from '../Utils/initialUField.js';

const HomePage = () => {

  const [numParticles, setNumParticles] = useState(10);
  const [speed, setSpeed] = useState(45); // Assuming speed is measured in some units
  const [velocityField, setVelocityField] = useState(generatePlainVelocityField(45));

  const handleNumParticlesChange = (e) => {
      setNumParticles(Number(e.target.value));
  };

  const handleSpeedChange = (e) => {
      setSpeed(Number(e.target.value));
  };

  useEffect(() => {
    setVelocityField(generatePlainVelocityField(speed));
  }, [speed]); // The effect runs whenever 'speed' changes

  return (
    <div className='home-container'>
      <div className='home-left'>
        <h1>Welcome to the Aerofoil Simulator</h1>
        <TestAPI/>
      </div>

      <div className='home-right'>
        <div className='settings-block'>
            <div className='slider'>
                <label>
                    Number of Particles: {numParticles}
                    <input 
                        type="range" 
                        min="1" 
                        max="1000" 
                        value={numParticles} 
                        onChange={handleNumParticlesChange} />
                </label>
            </div>
            <div className='slider'>
                <label>
                    Speed: {speed}
                    <input 
                        type="range" 
                        min="1" 
                        max="1000" 
                        value={speed} 
                        onChange={handleSpeedChange} />
                </label>
            </div>
          </div>
          <BoundingBox className="bounding-box" 
          velocityField={velocityField}
          numParticles={numParticles}
          >
              {/* Other SVG elements or custom components go here */}
          </BoundingBox>
      </div>

    </div>
  );
};

export default HomePage;