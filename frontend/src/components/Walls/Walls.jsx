import { useEffect, useRef } from 'react';
import './Walls.css'

const Walls = ( { shapeSettings, canvasSize }) => {
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
    
        // Adjust the vertices
        let adjustedVertices = parameters.vertices.map(([x, y]) => {
            return [x + canvas.width / 2, y + canvas.height / 2];
        });
    
        console.log("canvas.width",canvas.width)
        console.log("canvas.height",canvas.height)
        console.log("adjustedVertices",adjustedVertices);
    
        context.beginPath();
        switch (type) {
            case 'circle':
                const { centre: [h, k], radius: r } = parameters;
                context.arc(h, k, r, 0, Math.PI * 2);
                context.closePath();
                break;
            case 'rectangle':
                const { vertices: [x, y, width, height] } = parameters;
                context.rect(x, y, width, height);
                context.closePath();
                break;
            default:
                adjustedVertices.forEach(([x,y], i) => (i === 0) ? context.moveTo(x,y) : context.lineTo(x,y));
                context.closePath();
                break;
        }
        
        context.lineWidth = 2; // or another even number
        context.strokeStyle = 'black'; 
        context.stroke();
        context.fillStyle = 'red';
        context.fill()
    
        //! Debugging: Draw red squares at each vertex
        // context.fillStyle = 'red';
        // adjustedVertices.forEach(([x, y]) => {
        //     context.fillRect(x - 2, y - 2, 4, 4);
        // });
    }, [shapeSettings]);


    return (
        <canvas 
            ref={canvasRef} 
            className='walls-canvas' 
            width = {canvasSize[0]}
            height = {canvasSize[1]}
            style={{ width: `100%`, height: `100%` }}
        />
    );

}

export default Walls