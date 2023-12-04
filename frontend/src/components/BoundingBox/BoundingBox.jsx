import React, { useRef } from 'react';
import './BoundingBox.css';

const BoundingBox = ({ }) => {
    const canvasRef = useRef(null);

    return (
        <canvas 
            ref={canvasRef} 
            className='bounding-box-canvas' 
            style={{ width: `100%`, height: `100%` }}
        />
    );
};

export default BoundingBox;