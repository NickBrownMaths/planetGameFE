import MineralList from './MineralList';
import LifeList from './LifeList';

function DataWindow(props) {
  let displaySpeed = Math.log2(props.speed);
  let displayScale = Math.log2(props.scale);

  let text = '';
  /* */if (props.planetMapDisplayType === 'natural')/*  */ { text = 'The region you are looking at is ' + props.displayBiome + '.' }
  else if (props.planetMapDisplayType === 'biome')/*    */ { text = 'The region you are looking at is ' + props.displayBiome + '.' }
  else if (props.planetMapDisplayType === 'elevation')/**/ { text = 'The region you are looking at has elevation of ' + props.displayElevation + '.' }
  else if (props.planetMapDisplayType === 'onshore')/*  */ { text = 'The region you are looking at is ' + props.displayOnshore + ' from the coast.' }

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
        <MineralList localMinerals={props.localMinerals}/>
        <LifeList life={props.localPlants} label="Plants"/>
        <LifeList life={props.localAnimals} label="Animals"/>
        <br />
        <br />
      </div>
    </div>
  )
}

export default DataWindow;