import ControlButton from "../Controls/ControlButton";
import { generateMaterialBearingList } from "../Utils/resources";

function MineralList(props) {

  let text = 'This Region contains: Minerals:'

  if (props.localMinerals.length > 0) {
    return (
      <>
        {text}
        <ul>
          {
            props.localMinerals.map((mineral, index) => (
              <li key={index}> {generateMaterialBearingList(mineral)} <ControlButton buttonType ='infoButton' text = '?' onClick={() => {console.log(mineral)}}/> </li>
            ))
          }
        </ul >
      </>
    )
  }
  else {return (<div />)}
}

export default MineralList;
