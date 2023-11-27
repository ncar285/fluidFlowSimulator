import React from 'react';
import './HomePage.css';
import TestAPI from '../TestAPI/TestAPI.jsx';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Aerofoil Simulator</h1>
      <TestAPI/>
    </div>
  );
};

export default HomePage;