import React from "react"
import {connect} from "react-redux"
import Loading from "../static/Loading.gif"
import UserLink from "./UserLink"

let BoardUsers = (props) => {
  let users = props.board.users

  let content
  if(!users)
    content = <img src={Loading} alt="Loading Users..."/>
  else if(users.length === 0)
    content = "There are no Users to show. However, this is practically impossible since you are already reading this message yourself as an user of this board... :D"
  else {
    let userRows = users.map(user => <UserLink key={user.id} user={user}/>)
    console.log(userRows)
    content = (
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Can manage Board</th>
            <th>Can manage Users</th>
            <th>Can manage Tasks</th>
            <th>Update Rights</th>
          </tr>
          {userRows}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h1>Users</h1>
      {content}
    </div>
  )
}

let mapStateToProps = (state) => ({
  board: state.myBoards.boardList.filter(board => board.id === state.myBoards.currentlyOpenBoardId)[0],
})

export default connect(mapStateToProps)(BoardUsers)