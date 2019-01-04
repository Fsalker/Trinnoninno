import React from "react"
import {connect} from "react-redux"
import BoardLink from "./BoardLink"
import Loading from "../static/Loading.gif"

let MyBoards = (props) => {
  let BoardList

  if(!props.boardList)
    BoardList = <img src={Loading} alt="Loading Board List..."/>
  else if(props.boardList.length > 0)
    BoardList = props.boardList.map(board => <BoardLink board={board} key={board.id}/>)
  else
    BoardList = "There are no boards to show yet. You should join some!"

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