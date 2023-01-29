import DirectionPad from './DirectionPad';
import SeedBox from './SeedBox';

import './ControlBar.css'

function ControlBar(props) {
  return (
    <div className='ControlBar'>
      <DirectionPad
        setTransformMatrix={props.setTransformMatrix}
        transformMatrix={props.transformMatrix}
        setScale={props.setScale} scale={props.scale}
        setSpeed={props.setSpeed} speed={props.speed}
        setLookingAt={props.setLookingAt}        
        planetVertices={props.planetVertices}
      />
      <SeedBox
        setPlanetSeed={props.setPlanetSeed}
        planetSeed={props.planetSeed}
      />
    </div>
  )
}

export default ControlBar;