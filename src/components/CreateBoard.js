import React from "react"
import ReactiveInput from "./ReactiveInput";
import {connect} from "react-redux"
import {updateCreateBoardAlert, updateCreateBoardName} from "../actions"
import {API_HOST} from "../config";
import Alert from "./Alert"
import {refreshBoardList} from "../utils";

let CreateBoard = (props) => {
  let createBoard = async() => {
    let data = {session: props.session, boardName: props.name}
    let r = await fetch(`${API_HOST}/createBoard`, {headers: {"content-type": "application/json"}, method: "POST", body: JSON.stringify(data)})

    if(r.status === 200) {
      //props.dispatch(updateCreateBoardName(null))
      props.dispatch(updateCreateBoardAlert(null))
      refreshBoardList(props.dispatch, props.session)
    }
    else
      props.dispatch(updateCreateBoardAlert("An error has occured. Try again!"))
  }

  return (
    <div>
      <h1>Create Board</h1>
      <ReactiveInput placehold="Board Name" value={props.name} onchangeAction={updateCreateBoardName}/>
      <br/>
      <button onClick={() => createBoard()}>Create</button>
      <Alert text={props.alert}/>
    </div>
  )
}

let mapStateToProps = (state) => ({
  name: state.createBoard.name,
  alert: state.createBoard.alert,
  session: state.session.session,
})

export default connect(mapStateToProps)(CreateBoard)