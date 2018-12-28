import {UPDATE_SESSION_SESSIONHASH} from "../actions";

let initialState = {
  session: ""
}

export default (state = initialState, action) => {
  switch(action.type){
    case UPDATE_SESSION_SESSIONHASH:
      return {...state, session: action.session}
    default:
      return state
  }
}