import ControlButton from "./ControlButton";

function ViewsPad(props) {

  return (
    <div className="ViewsPad">
      <ControlButton onClick={() => {props.changeMapDisplay('natural')}} text={'N'} />
      <ControlButton onClick={() => {props.changeMapDisplay('biome')}} text={'B'} />
      <ControlButton onClick={() => {props.changeMapDisplay('elevation')}} text={'E'} />
      <ControlButton onClick={() => {props.changeMapDisplay('onshore')}} text={'C'} />
    </div>
  )
}

export default ViewsPad;