import React from "react"
import {connect} from "react-redux"
import {updateSessionSessionhash} from "../actions";

let Logout = (props) => {
  let logoutHandler = () => {
    localStorage.removeItem("session")
    props.dispatch(updateSessionSessionhash(null))
  }

  return (
    <div>
      <h2>Log out</h2>
      <button onClick={() => logoutHandler()}>Log out</button>
    </div>
  )
}

export default connect()(Logout)