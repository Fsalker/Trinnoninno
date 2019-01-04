import React from "react"
import {connect} from "react-redux"
import Loading from "../static/Loading.gif"
import Task from "./Task"

let BoardTasks = (props) => {
  let TaskList

  if(!props.taskList)
    TaskList = <img src={Loading} alt="Loading Tasks.."/>
  else if(props.taskList.length === 0)
    TaskList = "There are no tasks in this Board. Go add some!"
  else
    TaskList = props.taskList.map(task => <Task key={task.id} taskId={task.id}></Task>)

  return (
    <div>
      <h1>Tasks</h1>
      {TaskList}
    </div>
  )
}

let mapStateToProps = state => ({
  taskList: state.boardTasks.taskList
})

export default connect(mapStateToProps)(BoardTasks)