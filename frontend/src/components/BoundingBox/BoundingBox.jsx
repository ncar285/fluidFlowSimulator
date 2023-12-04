import React, { useRef } from 'react';
import './BoundingBox.css';

const BoundingBox = ({ canvasSize }) => {
    const canvasRef = useRef(null);

    return (
        <canvas 
            ref={canvasRef} 
            className='bounding-box-canvas' 
            width = {canvasSize[0]}
            height = {canvasSize[1]}
            style={{ width: `100%`, height: `100%` }}
        />
    );
};

export default BoundingBox;