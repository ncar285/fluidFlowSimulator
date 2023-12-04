import React, { useEffect, useState } from 'react';
import './HomePage.css';
// import TestAPI from '../TestAPI/TestAPI.jsx';
import BoundingBox from '../BoundingBox/BoundingBox.jsx';
// import Particle from '../Particle/Particle.jsx';
import { generatePlainVelocityField } from '../Utils/initialUField.js';
import { BsPauseBtn } from "react-icons/bs";
import { BsPlayBtn } from "react-icons/bs";
import Walls from '../Walls/Walls.jsx';
import FlowSettings from '../FlowSettings/FlowSettings.jsx';

const HomePage = () => {

  const canvasSize = [900, 500];
  const [numParticles, setNumParticles] = useState(1000); // in the bounding box
  const [speed, setSpeed] = useState(100); // pixels per second
  const [velocityField, setVelocityField] = useState(generatePlainVelocityField(45));
  const [isPaused, setIsPaused] = useState(false);


  useEffect(() => {
    setVelocityField(generatePlainVelocityField(speed));
  }, [speed]);

  const type = 'randomTest';
  const parameters = {vertices: [[-100,-200], [-100,200], [100,200], [100,-200]]};
  const shapeSettings = {type, parameters};
  const flowParameters = {numParticles, setNumParticles, speed, setSpeed, setIsPaused}

  return (
    <div className='home-container'>

      <div className='home-header'>
        <h1>Welcome to the Aerofoil Simulator</h1>
        {/* <TestAPI/> */}
      </div>

      <div className='home-content'>

        <div className='settings-block'>
          <FlowSettings flowParameters={flowParameters}/>
        </div>

        <div className="canvas-container"
          style={{ width: `${canvasSize[0]}px`, height: `${canvasSize[1]}px` }}>
            <BoundingBox canvasSize={canvasSize}/>
            <Walls shapeSettings={shapeSettings} canvasSize={canvasSize}/>
            {/* <Particles /> */}
            <div className='pause-button'>{ isPaused ? 
              <BsPlayBtn className="play-pause playbtn" onClick={()=>{setIsPaused(false)}}/> 
              :
              <BsPauseBtn className="play-pause pausebtn" onClick={()=>{setIsPaused(true)}}/>
            }</div>
          </div>
      </div>

    </div>
  );
};

export default HomePage;