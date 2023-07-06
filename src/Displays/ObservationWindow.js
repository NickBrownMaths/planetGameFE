import PlanetView from './PlanetView'; 

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