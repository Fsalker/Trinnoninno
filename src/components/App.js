import React from 'react';
import {connect} from "react-redux"
import "./App.css"
import Dashboard from "./Dashboard"
import WelcomeScreen from "./WelcomeScreen"

let App = (props) => {
  return (
    <div>
      <WelcomeScreen/>
      <Dashboard/>
    </div>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session,
});

export default connect(mapStateToProps)(App);