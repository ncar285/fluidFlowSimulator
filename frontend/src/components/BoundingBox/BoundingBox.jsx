import React, { useEffect, useRef, useState } from 'react';
import './BoundingBox.css';

const BoundingBox = ({ velocityField, numParticles, isPaused }) => {
    const [width, height] = [900, 500];
    const frameRate = 60; // frames per second
    // const [particles, setParticles] = useState([]);
    const particlesRef = useRef([]);
    const canvasRef = useRef(null);
    // const [[horzSpacing, vertSpacing, numAlongHeight], set] = useState(findParticleSpacing([]));
    const msPerInterval = 1000/60;



    const [particleParams, setParticleParams] = useState({ horzSpacing: 0, vertSpacing: 0, numAlongHeight: 0, spawnParticles: [], spawnRate: 0 });


    console.log(particlesRef.current)

    useEffect(() => {
        const newParticleParams = findParticleSpacing(numParticles, width, height);
        setParticleParams(newParticleParams);
    }, [numParticles, width, height]);


    function findParticleSpacing(numParticles, width, height) {
        const numAlongWidth = Math.sqrt(numParticles * (width / height));
        const numAlongHeight = Math.round(numParticles / numAlongWidth);
        
        // verticle spacing should be same horizontal and verticle
        const spacing = Math.round(width / numAlongWidth);

        const spawnParticles = [];

        const velocity = velocityField[`1,250`];
        // (pixels/second) / (pixels) ==> how many releases per second
        const spawnRate = velocity.u/spacing;



        let yPos = Math.round(spacing / 2);
        for (let i = 0 ; i < numAlongHeight ; i++){
            spawnParticles.push({ x: 1, y: yPos});
            yPos += spacing;
        }

        return {
            spacing: Math.round(spacing), 
            numAlongHeight: Math.round(numAlongHeight),
            spawnParticles,
            spawnRate
        }
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
            const msPerSpawn = 1000/particleParams.spawnRate;
    
            if (timeSinceLastSpawn >= msPerSpawn) {
                particlesRef.current = [...particleParams.spawnParticles, ...particlesRef.current];
                lastSpawnTime = now;
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