import ControlButton from "../Controls/ControlButton";
import { generateMaterialBearingList } from "../Utils/resources";

function LifeList(props) {
  let text = props.label + ':';

  if (props.life.length > 0) {
    return (
      <>
        {text}
        <ul>
          {
            props.life.map((life, index) => (
              <span key={index}>
                <li> {life.NAME + ' (' + life.TYPE + ')'} <ControlButton buttonType='infoButton' text='?' onClick={() => { console.log(life)}} /></li>
              </span>
            ))
          }
        </ul >
      </>
    )
  }
  else { return (<div />) }
}

export default LifeList;
