import React from "react"
import {connect} from "react-redux"
import Logout from "./Logout"
import CreateBoard from "./CreateBoard"
import BoardInvitations from "./BoardInvitations"
import MyBoards from "./MyBoards"
import DeleteAccount from "./DeleteAccount"
import {updateMyBoardsList} from "../actions"
import {refreshBoardList, refreshInvitationsList} from "../utils";

let Dashboard = (props) => {
  if(!props.session)
    return null
  refreshBoardList(props)
  refreshInvitationsList(props)

  return (
    <div>
      <CreateBoard/>
      <BoardInvitations/>
      <MyBoards/>
      <Logout/>
      <DeleteAccount/>
    </div>
  )
  /*
   */
}

let mapStateToProps = (state) => ({
  session: state.session.session
})

export default connect(mapStateToProps)(Dashboard)