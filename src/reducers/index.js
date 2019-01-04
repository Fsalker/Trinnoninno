import {combineReducers} from "redux"
import register from "./register"
import login from "./login"
import createBoard from "./createBoard"
import invitations from "./invitations"
import myBoards from "./myBoards"
import tasks from "./tasks"
import createTask from "./createTask"
import session from "./session"
import deleteAccount from "./deleteAccount"

export default combineReducers({
  register,
  login,
  createBoard,
  invitations,
  myBoards,
  tasks,
  createTask,
  session,
  deleteAccount
})