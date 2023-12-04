import { useEffect, useRef } from 'react';
import './Walls.css'

const Walls = ( { shapeSettings, canvasSize }) => {

    const canvasRef = useRef(null);

    const {shapeType, shapeParameters} = shapeSettings;


    useEffect(() => {

        // debugger

        if (shapeType === 'none') return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    
        const shapeCenter = [canvas.width / 2, canvas.height / 2];

        context.beginPath();
        switch (shapeType) {
            case 'circle':
                const { radius: r } = shapeParameters;
                context.arc(shapeCenter[0], shapeCenter[1], r, 0, Math.PI * 2);
                context.closePath();
                break;
            case 'rectangle':
                const { width, height } = shapeParameters;
                const [x,y] = [
                    shapeCenter[0] - (width / 2), 
                    shapeCenter[1] - (height / 2) 
                ];
                context.rect(x, y, width, height);
                context.closePath();
                break;
            default:
                const centeredVertices = shapeParameters.vertices.map(([x, y]) => {
                    return [x + shapeCenter[0], y - shapeCenter[1]];
                });
                centeredVertices.forEach(([x,y], i) => (i === 0) ? context.moveTo(x,y) : context.lineTo(x,y));
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

    if (shapeType === 'none') return null;


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