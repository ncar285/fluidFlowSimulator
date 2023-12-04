import './FlowSettings.css';

const FlowSettings = ({ flowParameters }) => {

    const {numParticles, setNumParticles, speed, setSpeed, setIsPaused} = flowParameters;

    const handleNumParticlesChange = (e) => {
        setIsPaused(true);
        setNumParticles(Number(e.target.value));
        setIsPaused(false);
    };
  
    const handleSpeedChange = (e) => {
        setIsPaused(true);
        setSpeed(Number(e.target.value));
        setIsPaused(false);
    };

    return (
        <>
          <h2>Flow Settings</h2>
            <div className='slider'>
              <div><strong>Number of Particles:</strong></div>
                <label>
                    {numParticles}
                    <input 
                        type="range" 
                        min="1" 
                        max="10000" 
                        value={numParticles} 
                        onChange={handleNumParticlesChange} />
                </label>
            </div>
            <div className='slider'>
              <div>Speed:</div>
                <label>
                    {speed}
                    <input 
                        type="range" 
                        min="1" 
                        max="1000" 
                        value={speed} 
                        onChange={handleSpeedChange} />
                </label>
            </div>
        </>
    );
};

export default FlowSettings;