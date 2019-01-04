import React from 'react';
import {connect} from "react-redux"
import "./App.css"
import Dashboard from "./Dashboard"
import WelcomeScreen from "./WelcomeScreen"
import Board from "./Board"

let App = (props) => {
  let CurrentlyRenderedElement

  if(!props.session)
    CurrentlyRenderedElement = <WelcomeScreen/>
  else {
    if(!props.currentlyOpenBoardId)
      CurrentlyRenderedElement = <Dashboard/>
    else
      CurrentlyRenderedElement = <Board/>
  }

  return (
    <div>
      {CurrentlyRenderedElement}
    </div>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session,
  currentlyOpenBoardId: state.myBoards.currentlyOpenBoardId
});

export default connect(mapStateToProps)(App);