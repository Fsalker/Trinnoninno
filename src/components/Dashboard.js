import React from "react"
import {connect} from "react-redux"
import Logout from "./Logout"
import CreateBoard from "./CreateBoard"
import BoardInvitations from "./BoardInvitations"
import MyBoards from "./MyBoards"
import DeleteAccount from "./DeleteAccount"
import {refreshBoardList, refreshInvitationsList} from "../utils";

let Dashboard = (props) => {
  // if(!props.session)
  //   return null
  refreshBoardList(props.dispatch, props.session)
  refreshInvitationsList(props.dispatch, props.session)

  return (
    <div>
      <CreateBoard/>
      <BoardInvitations/>
      <MyBoards/>
      <Logout/>
      <DeleteAccount/>
    </div>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session
})

export default connect(mapStateToProps)(Dashboard)