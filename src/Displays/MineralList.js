function MineralList(props) {

  let text = 'This Region contains:'

  if (props.localResources.length > 0) {
    return (
      <p>
        {text}
        < ul >
          {
            props.localResources.map((resource, index) => (
              <li key={index}>{resource.NAME}{" ("}{resource.TYPE}{")"}</li>
            ))
          }
        </ul >
      </p>
    )
  }
  else {return (<div />)}
}

export default MineralList;
