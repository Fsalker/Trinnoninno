import React from "react"
import {connect} from "react-redux"
import ReactiveInput from "./ReactiveInput";
import {updateInvitationSendAlert, updateInvitationUsername} from "../actions";
import {API_HOST} from "../config";
import Alert from "./Alert"

let InviteUser = (props) => {
  let inviteUser = async(dispatch, session, username, boardId) => {
    let data = {session, usernameInvitee: username, boardId}
    let r = await fetch(`${API_HOST}/sendBoardInvitation`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})

    if(r.status === 404)
      dispatch(updateInvitationSendAlert("The invited user does not exist!"))
    else if(r.status === 409) {
      let text = await r.text()
      if(text === "user already invited")
        dispatch(updateInvitationSendAlert("The user has already been invited."))
      else if(text === "user is already in board")
        dispatch(updateInvitationSendAlert("The user is already in the board."))
    }
    else if(r.status === 200)
      dispatch(updateInvitationSendAlert(""))
  }

  return (
    <div>
      <h1>Invite User</h1>
      <ReactiveInput placehold="Invitee's username" value={props.inviteeUsername} onchangeAction={updateInvitationUsername}/>
      <br/>
      <button onClick={() => inviteUser(props.dispatch, props.session, props.inviteeUsername, props.boardId)}>Invite</button>
      <br/>
      <Alert text={props.alert}/>
    </div>
  )
}

let mapStateToProps = (state) => ({
  inviteeUsername: state.invitations.username,
  alert: state.invitations.sendInviteAlert,
  session: state.session.session,
  boardId: state.myBoards.currentlyOpenBoardId,
})

export default connect(mapStateToProps)(InviteUser)