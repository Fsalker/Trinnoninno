import React from "react"
import {connect} from "react-redux"
import ReactiveInput from "./ReactiveInput"
import {updateEditBoardName} from "../actions"
import {refreshBoardList} from "../utils";
import {API_HOST} from "../config"

let EditBoard = (props) => {
  let editBoard = async(dispatch, session, boardName, boardId) => {
    let data = {session, boardId, newBoardData: {name: boardName}}
    console.log(data)
    let r = await fetch(`${API_HOST}/editBoard`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})
    if(r.status === 200)
      refreshBoardList(dispatch, session)
  }

  return (
    <div>
      <h1>Edit Board</h1>
      <ReactiveInput placehold="Board Name" value={props.boardName} onchangeAction={updateEditBoardName}/>
      <br/>
      <button onClick={() => editBoard(props.dispatch, props.session, props.boardName, props.boardId)}>Edit</button>
    </div>
  )
}

let mapStateToProps = (state) => ({
  boardName: state.editBoard.boardName,
  boardId: state.myBoards.currentlyOpenBoardId,
  session: state.session.session,
})

export default connect(mapStateToProps)(EditBoard)
