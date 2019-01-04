import React from "react"
import {connect} from "react-redux"
import BoardLink from "./BoardLink"

let MyBoards = (props) => {
  let BoardList = ""
  if(props.boardList)
    BoardList = props.boardList.map(board => <BoardLink board={board} key={board.id}/>)

  return (
    <div>
      <h1>My Boards</h1>
      {BoardList}
    </div>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session,
  boardList: state.myBoards.boardList
})

export default connect(mapStateToProps)(MyBoards)