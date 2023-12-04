import { useEffect, useRef } from 'react';
import './Walls.css'

const Walls = ( shapeSettings ) => {
    const canvasRef = useRef(null);

    const { type, parameters } = shapeSettings;

    const createAxisArray = (size) => {
        const axisArray = [(-1 / 2) * size];
        const spacing = (size)/(resolution - 1)
        for (let i = 1 ; i < resolution ; i++){
            nextPos = axisArray[axisArray.length - 1] + spacing;
            axisArray.push(nextPos);
        }
        return axisArray
    }

    const createCircle = () => {
        const diametor = size;
        const [h, k] = centre;
        const xAxis = createAxisArray(diametor)
        return xAxis.map((xPos)=>{
            const yPos = k + Math.pow(2,r) - Math.pow(2, (x - h));
            return [xPos + h, yPos + k]
        })
    }

    const createAerofoilVertices = () => {
        // finish this later
        return [-10,10,-10,10];
    }


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();

        switch (type) {
            case 'circle':
                const [h, k] = parameters.centre;
                const r = parameters.radius;
                context.arc(h, k, r, 0, Math.PI * 2);
                break;
            case 'rectangle':
                const [a,b,c,d] = parameters.vertices;
                context.rect(a,b,c,d);
                break;
            case 'triangle':
                const [a,b,c] = parameters.vertices;
                context.rect(a,b,c);
                createStar()
            case 'star':
                context.rect(...parameters.vertices);
                createStar()
            case 'aerofoil':
                const aerofoilVertices = 
                

            // Add other shapes here
            default:
                // Default case
        }

        context.stroke(); // or context.fill() based on requirement
    }, [type, size, centre, resolution]);

    return (
        <canvas 
            ref={canvasRef} 
            className='walls-canvas' 
            style={{ width: `100%`, height: `100%` }}
        />
    );

}

export default Walls