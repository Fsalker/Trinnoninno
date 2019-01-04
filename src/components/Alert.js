import React from "react"

let Alert = (props) => {
  if(props.text)
    return <p className="alert">{props.text}</p>
  return null
}

export default Alert