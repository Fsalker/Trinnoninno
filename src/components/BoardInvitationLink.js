import React from "react"
import {connect} from "react-redux"
import {API_HOST} from "../config";
import {refreshBoardList, refreshInvitationsList} from "../utils";

let BoardInvitationLink = (props) => {
  let invitation = props.invitation

  let answerInvitation = async(session, invitationId, accepting) => {
    let data = {session, invitationId, accepting}
    let r = await fetch(`${API_HOST}/answerBoardInvitation`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})
    if(r.status == 200) {
      refreshInvitationsList(props)
      if(accepting)
        refreshBoardList()
    }
  }

  return (
    <div>
      <button onClick={() => answerInvitation(props.session, props.id, false)}>Decline</button>
      <button onClick={() => answerInvitation(props.session, props.id, true)}>Accept</button>
      <div style={{backgroundColor: "#CFC",textAlign: "center", display: "inline-block", width: "200px"}}>{invitation.name}</div>
      <div style={{textAlign: "center", display: "inline-block", width: "100px"}}>{invitation.username}</div>
    </div>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session
})

export default connect(mapStateToProps)(BoardInvitationLink)