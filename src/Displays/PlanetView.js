import PlanetCanvas from "./PlanetCanvas";
import ReticleCanvas from "./ReticleCanvas";

function PlanetView(props) {
  const draw = (ctx) => { }

  return (
    <div className='PlanetView'>
      <PlanetCanvas
        draw={draw}
        rotation={props.rotation}
        scale={props.scale}
        vertexdata={props.vertexdata}
        colourdata={props.colourdata}
        reticlevertexdata={props.reticlevertexdata}
        reticlecolourdata={props.reticlecolourdata}
      />
      < ReticleCanvas
        draw={draw}
        rotation={props.rotation}
        scale={props.scale}
        vertexdata={props.reticlevertexdata}
        colourdata={props.reticlecolourdata}
      />

    </div>
  )

}

export default PlanetView;