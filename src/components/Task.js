import React from "react"
import {connect} from "react-redux"
import {API_HOST} from "../config";
import {refreshBoardTasksList} from "../utils";
import {
  updateBoardTasksEditingTask,
  updateBoardTasksEditTaskDescription,
  updateBoardTasksEditTaskTitle
} from "../actions";
import styles from "./Task.module.css"
import ReactiveInput from "./ReactiveInput";

let Task = (props) => {
  let {board} = props
  let task = props.taskList.filter(task => task.id === props.taskId)[0]

  let cancelEditTask = () => {
    props.dispatch(updateBoardTasksEditingTask(task.id, false))
  }

  let confirmEditTask = async() => {
    let data = {
      session: props.session,
      boardId: props.board.id,
      taskId: task.id,
      newTaskData: {
        title: task.title,
        description: task.description
      }
    }
    let r = await fetch(`${API_HOST}/editTask`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})
    if(r.status === 200)
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
  let content
  if(!task.editing) {
    buttonArr.push(editTaskButton)
    //<h3 style={{textAlign: "center", margin: "0"}}>{task.title}</h3>
    content = (
      <div>
        <h3 className={styles.title}>{task.title}</h3>
        <p>{task.description}</p>
      </div>
    )
  }
  else {
    buttonArr.push(cancelEditButton, confirmEditButton)
    content = (
      <div>
        <ReactiveInput classes={styles.titleInput} placehold="Title" value={task.title} onchangeAction={updateBoardTasksEditTaskTitle} additionalData={{taskId: task.id}}/>
        <ReactiveInput classes={styles.descriptionInput} placehold="Description" value={task.description} onchangeAction={updateBoardTasksEditTaskDescription} additionalData={{taskId: task.id}}/>
      </div>
    )
  }

  buttonArr.push(removeTaskButton)
  let managementButtons = <div className={styles.managementButtons}>{buttonArr}</div>

  return (
    <div className={styles.task}>
      {board.can_manage_tasks ? managementButtons : null}
      {content}
    </div>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session,
  board: state.myBoards.boardList.filter(board => board.id === state.myBoards.currentlyOpenBoardId)[0],
  taskList: state.boardTasks.taskList,
})

export default connect(mapStateToProps)(Task)