import React, { useEffect, useState } from 'react';
import './BoundingBox.css'
import Particle from '../Particle/Particle.jsx';

const BoundingBox = ({ velocityField, numParticles}) => {


    const [width, height] = [900, 500];
    const frameRate = 60; // frames per second
    const [particles, setParticles] = useState([]);

    // const [numAlongWidth, numAlongHeight, horzSpacing, vertSpacing] = findParticleSpacing();
    const [horzSpacing, vertSpacing] = findParticleSpacing();

    const spawnRate = generateSpawnRate(); // particles per second

    const msPerInterval = 1000/60;
    const msPerSpawn = 1000/spawnRate;


    // console.log("horzSpacing",horzSpacing);
    // console.log("vertSpacing",vertSpacing);
    // console.log("spawnRate",spawnRate);
    // console.log("msPerInterval", msPerInterval);
    // console.log("msPerSpawn", msPerSpawn);
    // console.log("numParticles", numParticles);




    function findParticleSpacing() {
        // (1) - numAlongWidth * numAlongHeight = numParticles
        // (2) - (numAlongWidth / numAlongHeight) = (width / height) ==> for even spacing
        // from (1) - numAlongHeight = numParticles / numAlongWidth
        // from (2) - numAlongWidth  = numAlongHeight * (width / height)
        // numAlongWidth^2  = numParticles * (width / height)
        // numAlongWidth  = sqrt(numParticles * (width / height))

        const numAlongWidth = Math.sqrt(numParticles * (width / height));
        const numAlongHeight = numParticles / numAlongWidth;
        const vertSpacing = height / numAlongHeight;
        const horzSpacing = width / numAlongWidth;

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
        const interval = setInterval(() => {
            setParticles(prev => {
                const updatedParticles = prev.map((particle) => {
                    let key = `${particle.x},${particle.y}`;
                    let velocity = velocityField[key] || { u: 0, v: 0 };
                    let newXPos = particle.x + velocity.u * (1 / frameRate);
                    let newYPos = particle.y + velocity.v * (1 / frameRate);
                    return {
                        ...particle,
                        x: Math.round(newXPos),
                        y: Math.round(newYPos)
                    };
                });
            
                // Remove out-of-bounds particles
                return updatedParticles.filter(p => p.x >= 0 && p.x <= 900 && p.y >= 0 && p.y <= 500);
            });
        }, Math.round(msPerInterval));

        return () => clearInterval(interval); // Clear interval on unmount
    }, [velocityField]);


    useEffect(() => {
        const spawnInterval = setInterval(() => {
            const newParticles = generateSpawnLocations()
            setParticles(prev => [...prev, ...newParticles]);
        }, Math.round(msPerSpawn));

        return () => clearInterval(spawnInterval); // Clear interval on unmount
    }, [spawnRate, numParticles]);



    return (
        <svg className='flow-box' >
            {particles.map(p => (
                <Particle key={p.key} x={p.x} y={p.y} />
            ))}
        </svg>
    );
};

export default BoundingBox;