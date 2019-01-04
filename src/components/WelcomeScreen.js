import React from "react"
import {connect} from "react-redux"
import Register from "./Register"
import Login from "./Login"

let Dashboard = (props) => {
  if(props.session)
    return null

  let Session = () => {
    if(props.session)
      return <p>Session: {props.session}</p>
    return null
  }

  return (
    <div>
      <Register/>
      <Login/>
      <Session/>
    </div>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session
})

export default connect(mapStateToProps)(Dashboard)