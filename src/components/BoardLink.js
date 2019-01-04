import React from "react"
import {connect} from "react-redux"
import {API_HOST} from "../config"
import {refreshBoardList} from "../utils";

let BoardLink = (props) => {
  let board = props.board

  let leaveBoard = async(boardId) => {
    let data = {session: props.session, boardId}
    let r = await fetch(`${API_HOST}/leaveBoard`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})
    if(r.status == 200)
      refreshBoardList(props)
  }
  let openBoard = async(boardId) => {

  }
  let removeBoard = async(boardId) => {
    let data = {session: props.session, boardId}
    let r = await fetch(`${API_HOST}/deleteBoard`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})
    if(r.status == 200)
      refreshBoardList(props)
  }

  return (
    <div>
      <button onClick={() => leaveBoard(board.id)}>Leave</button>
      <button onClick={() => openBoard(board.id)}>Open</button>
      <div style={{textAlign: "center", display: "inline-block", width: "200px"}}>{board.name}</div>
      <button onClick={() => removeBoard(board.id)}>Delete</button>
    </div>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session
})

export default connect(mapStateToProps)(BoardLink)