import './DataWindow.css'

function DataWindow(props) {
  let displaySpeed = Math.log2(props.speed) ;
  let displayScale = Math.log2(props.scale) ;
  return (
    <div className='DataWindow'>
      <div className='DataWindowText'>
        planet#: {props.planetSeed}
        <br />
        <br />
        scale: {displayScale}
        <br />
        speed: {displaySpeed}
        <br/>
        <br/>
        The region you are looking at is {props.displayBiome}, and its elevation is {props.displayElevation}.
      </div>
    </div>
  )
}

export default DataWindow;