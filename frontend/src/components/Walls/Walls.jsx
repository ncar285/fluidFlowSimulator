import { useEffect, useRef } from 'react';
import './Walls.css'

const Walls = ( shapeSettings ) => {
    const canvasRef = useRef(null);

    const { type, parameters } = shapeSettings;

    const createAerofoilVertices = () => {
        // finish this later
        return [[-10,-10],[-10,10],[10, 10],[10,-10]];
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        switch (type) {
            case 'circle':
                const { centre: [h, k], radius: r } = parameters;
                context.beginPath();
                context.arc(h, k, r, 0, Math.PI * 2);
                context.closePath();
                break;
            case 'rectangle':
                const { vertices: [x, y, width, height] } = parameters;
                context.beginPath();
                context.rect(x, y, width, height);
                context.closePath();
                break;
            case 'aerofoil':
                context.beginPath();
                const vertices = createAerofoilVertices()
                vertices.forEach(([x,y], i) => (i === 0) ? context.moveTo(x,y) : context.lineTo(x,y));
                context.closePath();
                break;
            default:
                context.beginPath();
                parameters.vertices.forEach(([x,y], i) => (i === 0) ? context.moveTo(x,y) : context.lineTo(x,y));
                context.closePath();
        }

        context.stroke(); // or context.fill() based on requirement
    }, [shapeSettings]); // Use shapeSettings directly in the dependency array


    return (
        <canvas 
            ref={canvasRef} 
            className='walls-canvas' 
            style={{ width: `100%`, height: `100%` }}
        />
    );

}

export default Walls