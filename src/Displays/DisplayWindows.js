import DataWindow from "./DataWindow";
import ObservationWindow from "./ObservationWindow";

import './DisplayWindows.css'

function DisplayWindows(props) {
  return (
    <div className="DisplayWindows">
      <ObservationWindow
        theta1={props.theta1}
        theta2={props.theta2}
        theta3={props.theta3}
        transformMatrix={props.transformMatrix}
        scale={props.scale}
        vertexdata={props.vertexdata}
        colourdata={props.colourdata}
        reticlevertexdata={props.reticlevertexdata}
        reticlecolourdata={props.reticlecolourdata}
        />
      <DataWindow
        scale={props.scale}
        speed={props.speed}
        planetSeed={props.planetSeed}
        planetName={props.planetName}
        planetDisplayType={props.planetDisplayType}
        displayBiome={props.displayBiome}
        displayElevation={props.displayElevation}
        displayOnshore={props.displayOnshore}
        />
    </div>
  )
}

export default DisplayWindows;