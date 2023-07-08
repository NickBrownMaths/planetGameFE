import { generateMaterialBearingList } from "../Utils/resources";

function PlantList(props) {
  if (props.localPlants.length > 0) {
    return (
      <>
        <ul>
          {
            props.localPlants.map((plant, index) => (
              <li key={index}> {plant.NAME + ' (' + plant.TYPE + ')'} </li>
            ))
          }
        </ul >
      </>
    )
  }
  else {return (<div />)}
}

export default PlantList;
