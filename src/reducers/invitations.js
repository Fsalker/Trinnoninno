  import {UPDATE_INVITATION_SEND_ALERT, UPDATE_INVITATION_LIST, UPDATE_INVITATION_USERNAME} from "../actions"

let initialState = {
  invitationList: null,
  username: "",
  sendInviteAlert: ""
}

export default (state = initialState, action) => {
  switch(action.type){
    case UPDATE_INVITATION_LIST:
      return {...state, invitationList: action.invitationList}
    case UPDATE_INVITATION_USERNAME:
      return {...state, username: action.username}
    case UPDATE_INVITATION_SEND_ALERT:
      return {...state, sendInviteAlert: action.sendInviteAlert}

    default:
      return state
  }
}