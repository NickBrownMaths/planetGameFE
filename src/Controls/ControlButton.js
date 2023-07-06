function ControlButton(props) {
  return (
    <button className='ControlButton' onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default ControlButton;