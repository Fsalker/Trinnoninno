import React from "react"
import {connect} from "react-redux"
import {API_HOST} from "../config";
import {updateSessionSessionhash} from "../actions";
import {updateDeleteAccountUsername, updateDeleteAccountPassword} from "../actions";
import ReactiveInput from "./ReactiveInput"

let DeleteAccount = (props) => {
  let deleteAccount = async(username, password) =>{
    let data = {username, password}
    let r = await fetch(`${API_HOST}/removeUser`, {method: "POST", body: JSON.stringify(data), headers: {"content-type": "application/json"}})
    if(r.status == 200){
      props.dispatch(updateSessionSessionhash(null))
    }
  }

  return (
    <div>
      <h1>Delete Account</h1>
      <ReactiveInput placehold="Username" value={props.username} onchangeAction={updateDeleteAccountUsername}/>
      <ReactiveInput placehold="Password" value={props.password} onchangeAction={updateDeleteAccountPassword}/>
      <br/>
      <button onClick={() => deleteAccount(props.username, props.password)}>Delete Account</button>
    </div>
  )
}

let mapStateToProps = (state) => ({
  username: state.deleteAccount.username,
  password: state.deleteAccount.password,
})

export default connect(mapStateToProps)(DeleteAccount)