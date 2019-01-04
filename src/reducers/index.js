import {combineReducers} from "redux"
import register from "./register"
import login from "./login"
import session from "./session"
import deleteAccount from "./deleteAccount"
import createBoard from "./createBoard"
import editBoard from "./editBoard"
import myBoards from "./myBoards"
import invitations from "./invitations"
import tasks from "./tasks"
import createTask from "./createTask"
import boardTasks from "./boardTasks"

export default combineReducers({
  register,
  login,
  createBoard,
  invitations,
  myBoards,
  tasks,
  createTask,
  session,
  deleteAccount,
  editBoard,
  boardTasks,
})