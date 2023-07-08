import { generateMaterialBearingList } from "../Utils/resources";

function MineralList(props) {

  let text = 'This Region contains:'

  if (props.localResources.length > 0) {
    return (
      <>
        {text}
        <ul>
          {
            props.localResources.map((resource, index) => (
              <li key={index}> {generateMaterialBearingList(resource)} </li>
            ))
          }
        </ul >
      </>
    )
  }
  else {return (<div />)}
}

export default MineralList;
