import {UPDATE_DELETE_ACCOUNT_USERNAME, UPDATE_DELETE_ACCOUNT_PASSWORD} from "../actions";

let initialState = {
  username: "",
  password: ""
}

export default (state = initialState, action) => {
  switch(action.type){
    case UPDATE_DELETE_ACCOUNT_USERNAME:
      return {...state, username: action.username}
    case UPDATE_DELETE_ACCOUNT_PASSWORD:
      return {...state, password: action.password}
    default:
      return state
  }
}