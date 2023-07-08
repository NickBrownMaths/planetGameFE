import ControlButton from "../Controls/ControlButton";
import { generateMaterialBearingList } from "../Utils/resources";

function PlantList(props) {
  let text = 'Plants:'

  if (props.localPlants.length > 0) {
    return (
      <>
        {text}
        <ul>
          {
            props.localPlants.map((plant, index) => (
              <>
                <li key={index}> {plant.NAME + ' (' + plant.TYPE + ')'} <ControlButton buttonType='infoButton' text='?' onClick={() => { }} /></li>
              </>
            ))
          }
        </ul >
      </>
    )
  }
  else { return (<div />) }
}

export default PlantList;
