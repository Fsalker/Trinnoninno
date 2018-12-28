import React from 'react';
import {connect} from "react-redux"
import "./App.css"
import Register from "./Register"
import Login from "./Login"
import Logout from "./Logout"

let App = (props) => {
  let Session = () => {
    if(props.session)
      return <p>Session: {props.session}</p>
    return null
  }

  return (
    <div>
      <Register/>
      <Login/>
      <Logout/>
      <Session/>
    </div>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session
});

export default connect(mapStateToProps)(App);