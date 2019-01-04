import React from "react"
import {connect} from "react-redux"
import {updateMyBoardsCurrentlyOpenBoardId} from "../actions";
import InviteUser from "./InviteUser";
import EditBoard from "./EditBoard"
import CreateTask from "./CreateTask";
import BoardTasks from "./BoardTasks"
import {refreshBoardTasksList} from "../utils";

let Board = (props) => {
  let {board} = props

  refreshBoardTasksList(props.dispatch, props.session, props.board.id)

  let returnToDashboard = (dispatch) => {
    dispatch(updateMyBoardsCurrentlyOpenBoardId(null))
  }

  return (
    <div>
      <button onClick={() => returnToDashboard(props.dispatch)}>Return to Dashboard</button>
      <br/>
      <h1 style={{textAlign: "center"}}>{board.name}</h1>
      <BoardTasks/>
      {board.can_manage_tasks ? <CreateTask/> : null}
      {board.can_manage_users ? <InviteUser/> : null}
      {board.can_manage_board ? <EditBoard/> : null}
    </div>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session,
  board: state.myBoards.boardList.filter(board => board.id === state.myBoards.currentlyOpenBoardId)[0]
})

export default connect(mapStateToProps)(Board)