import React from "react"
import {connect} from "react-redux"

let ReactiveInput = ({value, placehold, onchangeAction, dispatch, additionalData = null, classes = null}) => {
  let type = placehold==="Password"?"password":"text"

  return (
    <div>
      <input className={classes} type={type} placeholder={`${placehold}...`} value={value} onChange={(e) => dispatch(onchangeAction(e.target.value, additionalData))}/>
    </div>
  )
}

export default connect()(ReactiveInput)