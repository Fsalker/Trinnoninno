import {UPDATE_BOARD_TASKS_EDITING_TASK, UPDATE_BOARD_TASKS_LIST, UPDATE_BOARD_TASKS_EDIT_TASK_TITLE, UPDATE_BOARD_TASKS_EDIT_TASK_DESCRIPTION} from "../actions";

let initialState = {
  taskList: null,
}

export default (state = initialState, action) => {
  let newTaskList

  switch(action.type){
    case UPDATE_BOARD_TASKS_LIST:
      return {...state, taskList: action.taskList}
    case UPDATE_BOARD_TASKS_EDITING_TASK:
      newTaskList = state.taskList.slice()
      newTaskList.forEach(task => task.editing = (task.id !== action.taskId ? task.editing : action.isBeingEdited))
      return {...state, taskList: newTaskList}
    case UPDATE_BOARD_TASKS_EDIT_TASK_TITLE:
      newTaskList = state.taskList.slice()
      newTaskList.forEach(task => task.title = (task.id !== action.taskId ? task.title : action.title))
      return {...state, taskList: newTaskList}
    case UPDATE_BOARD_TASKS_EDIT_TASK_DESCRIPTION:
      newTaskList = state.taskList.slice()
      newTaskList.forEach(task => task.description = (task.id !== action.taskId ? task.description : action.description))
      return {...state, taskList: newTaskList}
    default:
      return state
  }
}