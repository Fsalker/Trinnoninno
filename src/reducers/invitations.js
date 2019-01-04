import {UPDATE_INVITATION_LIST} from "../actions"

let initialState = {
  invitationList: null
}

export default (state = initialState, action) => {
  switch(action.type){
    case UPDATE_INVITATION_LIST:
      return {...state, invitationList: action.invitationList}
    default:
      return state
  }
}