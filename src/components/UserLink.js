import React from "react"
import {connect} from "react-redux"
import styles from "./UserLink.module.css"
import {updateMyBoardUserCanManageBoard, updateMyBoardUserCanManageUsers, updateMyBoardUserCanManageTasks} from "../actions";
import {API_HOST} from "../config";

let UserLink = (props) => {
  let {user} = props

  const YEAH = "YES"
  const NAH = "NO"

  let updateUserRights = async() => {
    let data = {
      session: props.session,
      boardId: props.boardId,
      targetUsername: user.username,
      newRights: {
        can_manage_board: user.can_manage_board,
        can_manage_users: user.can_manage_users,
        can_manage_tasks: user.can_manage_tasks,
      }
    }
    let r = await fetch(`${API_HOST}/editUserRights`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})
  }

  console.log(styles)
  return (
    <tr>
      <td>{user.username}</td>
      <td className={styles.toggleable} onClick={() => props.dispatch(updateMyBoardUserCanManageBoard(user.id, !user.can_manage_board, props.boardId))}>{user.can_manage_board ? YEAH : NAH}</td>
      <td className={styles.toggleable} onClick={() => props.dispatch(updateMyBoardUserCanManageUsers(user.id, !user.can_manage_users, props.boardId))}>{user.can_manage_users ? YEAH : NAH}</td>
      <td className={styles.toggleable} onClick={() => props.dispatch(updateMyBoardUserCanManageTasks(user.id, !user.can_manage_tasks, props.boardId))}>{user.can_manage_tasks ? YEAH : NAH}</td>
      <td onClick={() => updateUserRights()}><button>Update Rights</button></td>
    </tr>
  )
}

let mapStateToProps = (state) => ({
  session: state.session.session,
  boardList: state.myBoards.boardList,
  boardId: state.myBoards.currentlyOpenBoardId
})

export default connect(mapStateToProps)(UserLink)