import {UPDATE_CREATE_TASK_TITLE, UPDATE_CREATE_TASK_DESCRIPTION} from "../actions";

let initialState = {
  title: "",
  description: "",
}

export default(state = initialState, action) => {
  switch(action.type){
    case UPDATE_CREATE_TASK_TITLE:
      return {...state, title: action.title}
    case UPDATE_CREATE_TASK_DESCRIPTION:
      return {...state, description: action.description}
    default:
      return state
  }
}