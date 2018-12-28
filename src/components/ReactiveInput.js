import React from "react"
import {connect} from "react-redux"

let ReactiveInput = ({value, placehold, onchangeAction, dispatch}) => {
  return (
    <div>
      <input placeholder={`Fill in your ${placehold} here...`} value={value} onChange={(e) => dispatch(onchangeAction(e.target.value))}/>
    </div>
  )
}

export default connect()(ReactiveInput)