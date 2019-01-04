import React from "react"
import {connect} from "react-redux"
import {API_HOST} from "../config";
import {refreshBoardTasksList} from "../utils";
import {updateBoardTasksEditingTask} from "../actions";

let Task = (props) => {
  let {board, task} = props

  let cancelEditTask = () => {
    props.dispatch(updateBoardTasksEditingTask(task.id, false))
  }

  let confirmEditTask = () => {
    // send the ajax request here
    props.dispatch(updateBoardTasksEditingTask(task.id, false))
  }

  let editTask = () => {
    props.dispatch(updateBoardTasksEditingTask(task.id, true))
  }

  let removeTask = async(session, boardId, taskId) => {
    let data = {session, boardId, taskId}
    let r = await fetch(`${API_HOST}/deleteTask`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})

    if(r.status === 200)
      refreshBoardTasksList(props.dispatch, props.session, props.board.id)
  }

  let cancelEditButton = <button key="1" onClick={() => cancelEditTask()}>Cancel</button>
  let confirmEditButton = <button key="2" onClick={() => confirmEditTask()}>Confirm</button>
  let editTaskButton = <button key="3" onClick={() => editTask()}>Edit</button>
  let removeTaskButton = <button key="4" onClick={() => removeTask(props.session, board.id, task.id)}>Remove</button>

  let buttonArr = []
  console.log(task)
  console.log(task.editing)
  if(!task.editing)
    buttonArr.push(editTaskButton)
  else
    buttonArr.push(cancelEditButton, confirmEditButton)
  buttonArr.push(removeTaskButton)
  let managementButtons = <div style={{display:"table", marginLeft:"auto"}}>{buttonArr}</div>

  return (
    <div style={{padding:"4px", width:"400px", marginBottom: "8px", border:"2px solid black", backgroundColor:"#DDF"}}>
      {board.can_manage_tasks ? managementButtons : null}
      <h3 style={{textAlign: "center", margin: "0"}}>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  )
}

let mapStateToProps = (state, props) => ({
  session: state.session.session,
  board: state.myBoards.boardList.filter(board => board.id === state.myBoards.currentlyOpenBoardId)[0],
  task: state.boardTasks.taskList.filter(task => task.id === props.taskId)[0],
})

export default connect(mapStateToProps)(Task)