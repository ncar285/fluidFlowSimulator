import React from 'react';

const Particle = React.memo(({ x, y }) => {
    // Style for the particle
    const particleStyle = {
        fill: 'blue', // or any color
        r: '1.5' // radius of the particle
    };

    return <circle cx={x} cy={y} style={particleStyle} />;
});

export default Particle;