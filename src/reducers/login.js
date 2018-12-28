import {UPDATE_LOGIN_USERNAME, UPDATE_LOGIN_PASSWORD, UPDATE_LOGIN_ALERT} from "../actions"

let initialState = {
  username: "",
  password: "",
  alert: "",
}

export default (state = initialState, action) => {
  switch(action.type){
    case UPDATE_LOGIN_USERNAME:
      return {...state, username: action.username}
    case UPDATE_LOGIN_PASSWORD:
      return {...state, password: action.password}
    case UPDATE_LOGIN_ALERT:
      return {...state, alert: action.alert}
    default:
      return state
  }
}