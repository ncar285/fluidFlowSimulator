import React, { useEffect, useState } from 'react';
import './HomePage.css';
import TestAPI from '../TestAPI/TestAPI.jsx';
// import MovingDots from '../MovingDots/MovingDoots.jsx';
import BoundingBox from '../BoundingBox/BoundingBox.jsx';
import Particle from '../Particle/Particle.jsx';
import { generatePlainVelocityField } from '../Utils/initialUField.js';
import { BsPauseBtn } from "react-icons/bs";
import { BsPlayBtn } from "react-icons/bs";

const HomePage = () => {

  const [width, height] = [900, 500];
  const [numParticles, setNumParticles] = useState(1000); // in the bounding box
  const [speed, setSpeed] = useState(100); // pixels per second
  const [velocityField, setVelocityField] = useState(generatePlainVelocityField(45));
  const [isPaused, setIsPaused] = useState(false);

  const handleNumParticlesChange = (e) => {
      setIsPaused(true);
      setNumParticles(Number(e.target.value));
      setIsPaused(false);
  };

  const handleSpeedChange = (e) => {
      setIsPaused(true);
      setSpeed(Number(e.target.value));
      setIsPaused(false);
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
                        max="10000" 
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
            <div>
              { isPaused ? 
              <BsPlayBtn className="play-pause playbtn" onClick={()=>{setIsPaused(false)}}/> 
              :
              <BsPauseBtn className="play-pause pausebtn" onClick={()=>{setIsPaused(true)}}/>
              }
            </div>
          </div>
          {/* <BoundingBox className="bounding-box" 
          velocityField={velocityField}
          numParticles={numParticles}
          isPaused={isPaused}
          >
          </BoundingBox> */}
          <div className="canvas-container"
          style={{ width: `${width}px`, height: `${height}px` }}>
            <BoundingBox />
            {/* <Walls />
            <Particles /> */}
          </div>
      </div>

    </div>
  );
};

export default HomePage;