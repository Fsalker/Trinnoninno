import React from "react"
import {connect} from "react-redux"
import {API_HOST} from "../config"
import {refreshBoardList} from "../utils";
import {updateMyBoardsCurrentlyOpenBoardId, updateEditBoardName} from "../actions"

let BoardLink = (props) => {
  let board = props.board

  let leaveBoard = async(boardId) => {
    let data = {session: props.session, boardId}
    let r = await fetch(`${API_HOST}/leaveBoard`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})
    if(r.status === 200)
      refreshBoardList(props.dispatch, props.session)
  }
  let openBoard = (dispatch, board) => {
    dispatch(updateMyBoardsCurrentlyOpenBoardId(board.id))
    dispatch(updateEditBoardName(board.name))
  }
  let removeBoard = async(boardId) => {
    let data = {session: props.session, boardId}
    let r = await fetch(`${API_HOST}/deleteBoard`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})
    if(r.status === 200)
      refreshBoardList(props.dispatch, props.session)
  }

  return (
    <div>
      <button onClick={() => leaveBoard(board.id)}>Leave</button>
      <button onClick={() => openBoard(props.dispatch, board)}>Open</button>
      <div style={{textAlign: "center", display: "inline-block", width: "200px"}}>{board.name}</div>
      <button onClick={() => removeBoard(board.id)}>Delete</button>
    </div>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session
})

export default connect(mapStateToProps)(BoardLink)