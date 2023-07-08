import DirectionPad from './DirectionPad';
import SeedBox from './SeedBox';

import ViewsPad from './ViewsPad';

function ControlBar(props) {
  return (
    <div className='ControlBar'>
      <DirectionPad
        setRotation={props.setRotation}
        rotation={props.rotation}
        setScale={props.setScale} scale={props.scale}
        setSpeed={props.setSpeed} speed={props.speed}
        setLookingAt={props.setLookingAt}
        planetVertices={props.planetVertices}
      />
      <SeedBox
        setPlanetSeed={props.setPlanetSeed}
        planetSeed={props.planetSeed}
      />
      <ViewsPad
      changeDisplay={props.changeDisplay}
      />
    </div>
  )
}

export default ControlBar;