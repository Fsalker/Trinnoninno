import {UPDATE_MY_BOARDS_LIST, UPDATE_MY_BOARDS_CURRENTLY_OPEN_BOARD_ID, UPDATE_MY_BOARD_USER_CAN_MANAGE_BOARD, UPDATE_MY_BOARD_USER_CAN_MANAGE_USERS, UPDATE_MY_BOARD_USER_CAN_MANAGE_TASKS} from "../actions";

let initialState = {
  boardList: null,
  currentlyOpenBoardId: null
}

let getUserFromBoardList = (boardList, boardId, userId) => {
  let userList = boardList.find(board => board.id === boardId).users
  let user = userList.find(user => user.id === userId)
  return user
}

export default (state = initialState, action) => {
  let newBoardList, user
  switch(action.type){
    case UPDATE_MY_BOARDS_LIST:
      return {...state, boardList: action.boardList}
    case UPDATE_MY_BOARDS_CURRENTLY_OPEN_BOARD_ID:
      return {...state, currentlyOpenBoardId: action.boardId}
    case UPDATE_MY_BOARD_USER_CAN_MANAGE_BOARD:
      newBoardList = state.boardList.slice()
      user = getUserFromBoardList(newBoardList, action.boardId, action.userId)
      user.can_manage_board = action.can_manage_board
      return {...state, boardList: newBoardList}
    case UPDATE_MY_BOARD_USER_CAN_MANAGE_USERS:
      newBoardList = state.boardList.slice()
      user = getUserFromBoardList(newBoardList, action.boardId, action.userId)
      user.can_manage_users = action.can_manage_users
      return {...state, boardList: newBoardList}
    case UPDATE_MY_BOARD_USER_CAN_MANAGE_TASKS:
      newBoardList = state.boardList.slice()
      user = getUserFromBoardList(newBoardList, action.boardId, action.userId)
      user.can_manage_tasks = action.can_manage_tasks
      return {...state, boardList: newBoardList}
    default:
      return state
  }
}