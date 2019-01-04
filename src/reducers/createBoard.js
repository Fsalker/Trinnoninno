import {UPDATE_CREATE_BOARD_NAME, UPDATE_CREATE_BOARD_ALERT} from "../actions"

let initialState = {
  name: ""
}

export default (state = initialState, action) => {
  switch(action.type){
    case UPDATE_CREATE_BOARD_NAME:
      return {...state, name: action.name}
    case UPDATE_CREATE_BOARD_ALERT:
      return {...state, alert: action.alert}
    default:
      return state
  }
}