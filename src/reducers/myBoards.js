import {UPDATE_MY_BOARDS_LIST, UPDATE_MY_BOARDS_CURRENTLY_OPEN_BOARD_ID} from "../actions";

let initialState = {
  boardList: null,
  currentlyOpenBoardId: null
}

export default (state = initialState, action) => {
  switch(action.type){
    case UPDATE_MY_BOARDS_LIST:
      return {...state, boardList: action.boardList}
    case UPDATE_MY_BOARDS_CURRENTLY_OPEN_BOARD_ID:
      return {...state, currentlyOpenBoardId: action.boardId}
    default:
      return state
  }
}