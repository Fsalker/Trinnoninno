import {UPDATE_REGISTER_USERNAME, UPDATE_REGISTER_PASSWORD, UPDATE_REGISTER_ALERT} from "../actions"

let initialState = {
  username: "",
  password: "",
  alert: "",
}

export default (state = initialState, action) => {
  switch(action.type){
    case UPDATE_REGISTER_USERNAME:
      return {...state, username: action.username}
    case UPDATE_REGISTER_PASSWORD:
      return {...state, password: action.password}
    case UPDATE_REGISTER_ALERT:
      return {...state, alert: action.alert}
    default:
      return state
  }
}