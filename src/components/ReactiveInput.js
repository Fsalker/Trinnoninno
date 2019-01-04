import React from "react"
import {connect} from "react-redux"

let ReactiveInput = ({value, placehold, onchangeAction, dispatch}) => {
  let type = placehold==="Password"?"password":"text"

  return (
    <div>
      <input type={type} placeholder={`${placehold}...`} value={value} onChange={(e) => dispatch(onchangeAction(e.target.value))}/>
    </div>
  )
}

export default connect()(ReactiveInput)