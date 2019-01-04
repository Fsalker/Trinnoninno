import {API_HOST} from "../config";
import {updateMyBoardsList, updateInvitationList, updateBoardTasksList} from "../actions"

export let refreshBoardList = async(dispatch, session) => {
  let data = {session}
  let r = await fetch(`${API_HOST}/viewMyBoards`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})

  let boardList = await r.json()
  boardList = boardList.sort((a, b) => a.id > b.id ? -1 : 1)
  dispatch(updateMyBoardsList(boardList))
}

export let refreshInvitationsList = async(dispatch, session) => {
  let data = {session}
  let r = await fetch(`${API_HOST}/viewBoardInvitations`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})

  let invitationList = await r.json()
  invitationList = invitationList.sort((a, b) => a.id > b.id ? -1 : 1)

  dispatch(updateInvitationList(invitationList))
}

export let refreshBoardTasksList = async(dispatch, session, boardId) => {
  let data = {session, boardId}
  let r = await fetch(`${API_HOST}/viewBoardTasks`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})

  let taskList = await r.json()
  taskList = taskList.sort((a, b) => a.id > b.id ? -1 : 1)

  dispatch(updateBoardTasksList(taskList))
}