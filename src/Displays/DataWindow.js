import './DataWindow.css'

function DataWindow(props) {
  let displaySpeed = Math.log2(props.speed) ;
  let displayScale = Math.log2(props.scale) ;
  return (
    <div className='DataWindow'>
      <div className='DataWindowText'>
        planet#: {props.planetSeed} <br />scale: {displayScale} <br /> speed: {displaySpeed} <br/> Looking at: {props.displayBiome}
      </div>
    </div>
  )
}

export default DataWindow;