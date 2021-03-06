import React from "react"
import {connect} from "react-redux"
import ReactiveInput from "./ReactiveInput"
import {updateRegisterAlert, updateRegisterPassword, updateRegisterUsername, updateSessionSessionhash} from "../actions"
import {API_HOST} from "../config";
import Alert from "./Alert"

let Register = (props) => {
  let doRegister = async(props) => {
    let data ={
      username: props.registerUsername,
      password: props.registerPassword,
    }
    let r = await fetch(`${API_HOST}/register`, {headers: {"content-type": "application/json"}, method: "POST", body: JSON.stringify(data)})
    if(r.status === 200) {
      let session = (await r.json()).session
      window.localStorage.setItem("session", session)
      props.dispatch(updateSessionSessionhash(session))
      props.dispatch(updateRegisterAlert(null))
    }
    else {
      let alertText = "An error has occurred when logging in. Please try again!"
      if(r.status === 409)
        alertText = "Username is already taken!"
      props.dispatch(updateRegisterAlert(alertText))
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <ReactiveInput placehold="Username" value={props.registerUsername} onchangeAction={updateRegisterUsername}/>
      <ReactiveInput placehold="Password" value={props.registerPassword} onchangeAction={updateRegisterPassword}/>
      <Alert text={props.registerAlert}/>
      <br/>
      <button onClick={() => doRegister(props)}>Register</button>
    </div>
  )
}

let mapStateToProps = (state) => ({
  registerUsername: state.register.username,
  registerPassword: state.register.password,
  registerAlert: state.register.alert,
})

export default connect(mapStateToProps)(Register)