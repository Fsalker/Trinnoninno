import React from "react"
import {connect} from "react-redux"
import BoardInvitationLink from "./BoardInvitationLink"

let BoardInvitations = (props) => {
  let InvitationList
  if(props.invitationList)
    InvitationList = props.invitationList.map( invitation => <BoardInvitationLink key={invitation.id} invitation={invitation}/>)

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