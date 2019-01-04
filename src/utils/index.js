import {API_HOST} from "../config";
import {updateMyBoardsList, updateInvitationList} from "../actions"

export let refreshBoardList = async(props) => {
  let data = {session: props.session}
  let r = await fetch(`${API_HOST}/viewMyBoards`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})

  let boardList = await r.json()
  boardList = boardList.sort((a, b) => a.id > b.id ? -1 : 1)
  props.dispatch(updateMyBoardsList(boardList))
}

export let refreshInvitationsList = async(props) => {
  let data = {session: props.session}
  let r = await fetch(`${API_HOST}/viewBoardInvitations`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})

  let invitationList = await r.json()
  invitationList = invitationList.sort((a, b) => a.id > b.id ? -1 : 1)

  props.dispatch(updateInvitationList(invitationList))
}