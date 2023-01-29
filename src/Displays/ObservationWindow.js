import CentreReticle from './CentreReticle';
import PlanetView from './PlanetView'; 
import './ObservationWindow.css'


function ObservationWindow(props) {
  return (
    <div className='ObservationWindow'>
      <PlanetView
        transformMatrix={props.transformMatrix}
        scale={props.scale}
        vertexdata={props.vertexdata}
        colourdata={props.colourdata}
        reticlevertexdata={props.reticlevertexdata}
        reticlecolourdata={props.reticlecolourdata}
      />
    </div>
  )
}

export default ObservationWindow;