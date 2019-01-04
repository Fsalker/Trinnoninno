import React from "react"
import {connect} from "react-redux"
import BoardInvitationLink from "./BoardInvitationLink"
import Loading from "../static/Loading.gif"

let BoardInvitations = (props) => {
  let InvitationList

  if(!props.invitationList)
    InvitationList = <img src={Loading} alt="Loading Invitation List..."/>
  else if(props.invitationList.length > 0)
    InvitationList = props.invitationList.map( invitation => <BoardInvitationLink key={invitation.id} invitation={invitation}/>)
  else
    InvitationList = "There are no new invitations for you to check out."

  return (
    <div>
      <h1>Board Invitations</h1>
      {InvitationList}
    </div>
  )
}

let mapStateToProps = (state) => ({
  invitationList: state.invitations.invitationList
})

export default connect(mapStateToProps)(BoardInvitations)