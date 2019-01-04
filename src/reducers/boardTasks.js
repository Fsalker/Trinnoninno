import {UPDATE_BOARD_TASKS_EDITING_TASK, UPDATE_BOARD_TASKS_LIST} from "../actions";

let initialState = {
  taskList: null,
}

export default (state = initialState, action) => {
  switch(action.type){
    case UPDATE_BOARD_TASKS_LIST:
      return {...state, taskList: action.taskList}
    case UPDATE_BOARD_TASKS_EDITING_TASK:
      let newTaskList = state.taskList.slice()
      newTaskList.forEach(task => task.editing = (task.id !== action.taskId ? task.editing : task.editing ? !task.editing : action.isBeingEdited))
      console.log(newTaskList)
      console.log(newTaskList[0].editing)
      return {...state, taskList: newTaskList}
    default:
      return state
  }
}