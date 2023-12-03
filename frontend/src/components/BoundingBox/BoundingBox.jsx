import React, { useEffect, useRef, useState } from 'react';
import './BoundingBox.css';

const BoundingBox = ({ velocityField, numParticles, isPaused }) => {
    const [width, height] = [900, 500];
    const frameRate = 60; // frames per second
    // const [particles, setParticles] = useState([]);
    const particlesRef = useRef([]);
    const canvasRef = useRef(null);
    const [horzSpacing, vertSpacing] = findParticleSpacing();
    const spawnRate = generateSpawnRate(); // particles per second
    const msPerInterval = 1000/60;
    const msPerSpawn = 1000/spawnRate;

    function findParticleSpacing() {
        const numAlongWidth = Math.sqrt(numParticles * (width / height));
        const numAlongHeight = numParticles / numAlongWidth;
        const vertSpacing = height / Math.round(numAlongHeight);
        const horzSpacing = width / Math.round(numAlongWidth);
        return [
            Math.round(horzSpacing), 
            Math.round(vertSpacing)
        ]
    }


    function generateSpawnLocations() {
        const newParticles = []; // store new particles

        let xPos = 1;
        let initial = (height % vertSpacing) / 2;
        let yPos = Math.round(initial);

        while (yPos < height){
            newParticles.push({ x: xPos, y: yPos, key: `particle_${Date.now()}_insertPos_${xPos},${yPos}` })
            yPos += vertSpacing;
        }

        return newParticles;
    }

    function generateSpawnRate() {
        const velocity = velocityField[`1,250`];
        return (velocity.u/horzSpacing);
    }


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let animationFrameId;
        let lastSpawnTime = Date.now();
    
        const draw = () => {
            if (isPaused) return;
    
            const now = Date.now();
            const timeSinceLastSpawn = now - lastSpawnTime;
    
            if (timeSinceLastSpawn >= msPerSpawn) {
                const newParticles = generateSpawnLocations();
                particlesRef.current = [...newParticles, ...particlesRef.current];
                lastSpawnTime = now;
            }
    
            context.clearRect(0, 0, width, height); // Clear previous drawing
    
            const updatedParticles = [];


            for (let i = 0; i < particlesRef.current.length; i++) {
                const particle = particlesRef.current[i];
                const velocity = velocityField[`${Math.round(particle.x)},${Math.round(particle.y)}`];

                if (velocity === undefined){
                    debugger
                }

                const newXPos = particle.x + velocity.u * (1 / frameRate);
                const newYPos = particle.y + velocity.v * (1 / frameRate);
            
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
    }, [isPaused, msPerSpawn, spawnRate]);


    return (
        <canvas ref={canvasRef} className='flow-box' width={width} height={height} />
    );
};

export default BoundingBox;