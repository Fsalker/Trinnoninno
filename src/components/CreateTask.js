import React from "react"
import {connect} from "react-redux"
import ReactiveInput from "./ReactiveInput";
import {updateCreateTaskDescription, updateCreateTaskTitle} from "../actions";
import {API_HOST} from "../config";
import {refreshBoardTasksList} from "../utils";

let CreateTask = (props) => {
  let createTask = async(session, boardId, title, description) => {
    let data = {session, boardId, title, description}
    let r = await fetch(`${API_HOST}/createTask`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})

    if(r.status === 200)
      refreshBoardTasksList(props.dispatch, props.session, props.boardId)
  }

  return (
    <div>
      <h1>Create Task</h1>
      <ReactiveInput placehold="Title" value={props.title} onchangeAction={updateCreateTaskTitle}/>
      <ReactiveInput placehold="Description" value={props.description} onchangeAction={updateCreateTaskDescription}/>
      <br/>
      <button onClick={() => createTask(props.session, props.boardId, props.title, props.description)}>Create</button>
    </div>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session,
  boardId: state.myBoards.currentlyOpenBoardId,
  title: state.createTask.title,
  description: state.createTask.description,
})

export default connect(mapStateToProps)(CreateTask)