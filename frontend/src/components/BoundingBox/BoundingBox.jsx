import React from 'react';
import './BoundingBox.css'

const BoundingBox = ({ children }) => {
    return (
        <svg className='flow-box' >
            {children}
        </svg>
    );
};

export default BoundingBox;