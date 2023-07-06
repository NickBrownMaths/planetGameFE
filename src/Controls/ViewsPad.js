import ControlButton from "./ControlButton";

function ViewsPad(props) {

  return (
    <div className="ViewsPad">
      <ControlButton onClick={() => {props.changeDisplay('natural')}} text={'N'} />
      <ControlButton onClick={() => {props.changeDisplay('biome')}} text={'B'} />
      <ControlButton onClick={() => {props.changeDisplay('elevation')}} text={'E'} />
      <ControlButton onClick={() => {props.changeDisplay('onshore')}} text={'C'} />
    </div>
  )
}

export default ViewsPad;