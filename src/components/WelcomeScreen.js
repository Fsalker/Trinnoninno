import React from "react"
//import {connect} from "react-redux"
import Register from "./Register"
import Login from "./Login"

let WelcomeScreen = (props) => {
  /*let Session = () => {
    if(props.session)
      return <p>Session: {props.session}</p>
    return null
  }*/

  return (
    <div>
      <Register/>
      <Login/>
    </div>
  )
}

export default WelcomeScreen

/*let mapStateToProps = (state) => ({
  session: state.session.session
})

export default connect(mapStateToProps)(WelcomeScreen)*/