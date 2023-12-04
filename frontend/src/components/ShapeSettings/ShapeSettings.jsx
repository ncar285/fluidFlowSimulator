import React from 'react';
import './ShapeSettings.css';

const ShapeSettings = ({ shapeSettings }) => {
    const { shapeType, setShapeType, shapeParameters, setShapeParameters } = shapeSettings;

    const matchingParams = {
        rectangle: { width: 50, height: 50 },
        circle: { radius: 25 },
        none: {}
    };

    const maxShapeDimensions = {
        rectangle: 300,
        circle: 150,
    }

    const handleShapeChange = (e) => {
        const type = e.target.value;
        setShapeType(type);
        setShapeParameters(matchingParams[type]);
    };

    const handleParameterChange = (parameter, e) => {
        setShapeParameters(prev => ({ ...prev, [parameter]: e.target.value }));
    };

    function capitlized(parameter) {
        return parameter[0].toUpperCase() + parameter.slice(1).toLowerCase();
    }


    return (
        <>
            <h2>Obstacles</h2>
            <div className='shapeSelection'>
                <div>Select a shape:</div>
                <select onChange={handleShapeChange} value={shapeType}>
                    <option value="none">None</option>
                    <option value="circle">Circle</option>
                    <option value="rectangle">Rectangle</option>
                </select>
            </div>
            <div className='shapeParamSelection'>
                {matchingParams[shapeType] && Object.keys(matchingParams[shapeType]).map((parameter) => {
                    // debugger
                    // console.log(maxShapeDimensions[shapeType])
                    return (
                        <div className='slider' key={parameter}>
                            <div>{capitlized(parameter)}</div>
                            <label>
                                {shapeParameters[parameter]}
                                <input 
                                    type="range" 
                                    min="1" 
                                    max={`${maxShapeDimensions[shapeType]}`} 
                                    value={shapeParameters[parameter]} 
                                    onChange={(e) => handleParameterChange(parameter, e)} />
                            </label>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ShapeSettings;