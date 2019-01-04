import {UPDATE_EDIT_BOARD_NAME} from "../actions";

let initialState = {
  boardName: ""
}

export default (state = initialState, action) => {
  switch(action.type){
    case UPDATE_EDIT_BOARD_NAME:
      return {...state, boardName: action.boardName}
    default:
      return state
  }
}