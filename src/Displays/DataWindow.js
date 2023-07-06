import MineralList from './MineralList';

function DataWindow(props) {
  let displaySpeed = Math.log2(props.speed);
  let displayScale = Math.log2(props.scale);

  let text = '';
  /* */if (props.planetDisplayType === 'natural')/*  */ { text = 'The region you are looking at is ' + props.displayBiome + '.' }
  else if (props.planetDisplayType === 'biome')/*    */ { text = 'The region you are looking at is ' + props.displayBiome + '.' }
  else if (props.planetDisplayType === 'elevation')/**/ { text = 'The region you are looking at has elevation of ' + props.displayElevation + '.' }
  else if (props.planetDisplayType === 'onshore')/*  */ { text = 'The region you are looking at is ' + props.displayOnshore + ' from the coast.' }

  return (
    <div className='DataWindow'>
      <div className='DataWindowText'>
        planet: {props.planetName}
        <br />
        scale: {displayScale} speed: {displaySpeed}
        <br />
        <br />
        {text}
        <br />
        <br />
        <MineralList localResources={props.localResources}/>
      </div>
    </div>
  )
}

export default DataWindow;