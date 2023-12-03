import React, { useEffect, useRef, useState } from 'react';
import './BoundingBox.css';

const BoundingBox = ({ velocityField, numParticles, isPaused }) => {
    const [width, height] = [900, 500];
    const frameRate = 60; // frames per second
    const particlesRef = useRef([]);
    const canvasRef = useRef(null);
    const [particleParams, setParticleParams] = useState({ spacing: 0, spawnParticles: []});


    useEffect(() => {
        const newParticleParams = findParticleParams(numParticles, width, height);
        setParticleParams(newParticleParams);
    }, [numParticles, width, height]);


    function findParticleParams(numParticles, width, height) {
        const numAlongWidth = Math.sqrt(numParticles * (width / height));
        const numAlongHeight = Math.round(numParticles / numAlongWidth);
        const spacing = width / numAlongWidth; // verticle and horizontal spacing are same
        const spawnParticles = [];

        let yPos = spacing / 2;
        for (let i = 0 ; i < numAlongHeight ; i++){
            if ( (Math.round(yPos) >= 0) && (Math.round(yPos) <= 500)){
                spawnParticles.push({ x: 1, y: Math.round(yPos)});
            }
            yPos += spacing;
        }

        return {
            spacing: Math.round(spacing), 
            spawnParticles
        }
    }


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let animationFrameId;
    
        const draw = () => {

            if (isPaused) return;

            const firstParticle = particlesRef.current[1];
            // if no particles yet, spawn. If reached desired spacing, spawn
            if (particlesRef.current.length === 0 || firstParticle.x >= particleParams.spacing){
                particlesRef.current = [...particleParams.spawnParticles, ...particlesRef.current];
            }
    
            context.clearRect(0, 0, width, height); // Clear previous drawing
    
            const updatedParticles = [];

            // update each particle
            for (let i = 0; i < particlesRef.current.length; i++) {
                const particle = particlesRef.current[i];
                const velocity = velocityField[`${Math.round(particle.x)},${Math.round(particle.y)}`];

                if (velocity === undefined){
                    debugger
                }

                const newXPos = particle.x + velocity.u * (1 / frameRate);
                const newYPos = particle.y + velocity.v * (1 / frameRate);
            
                // only draw particles in the boundary
                if (newXPos >= 0 && newXPos <= 900 && newYPos >= 0 && newYPos <= 500) {
                    updatedParticles.push({ ...particle, x: newXPos, y: newYPos });
            
                    context.beginPath();
                    context.arc(newXPos, newYPos, 1, 0, 2 * Math.PI);
                    context.fillStyle = 'blue';
                    context.fill();
                }
            }
            
            particlesRef.current = updatedParticles;
    
            animationFrameId = requestAnimationFrame(draw); // Schedule the next frame
        };
    
        draw(); // Start the animation loop
    
        return () => {
            cancelAnimationFrame(animationFrameId); // Cancel the animation frame on unmount
        };
    }, [velocityField, numParticles, isPaused]);


    return (
        <canvas 
            ref={canvasRef} 
            className='flow-box' 
            width={width} 
            height={height}
            style={{ width: `${width}px`, height: `${height}px` }}
        />
    );
};

export default BoundingBox;