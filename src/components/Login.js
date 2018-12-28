import React from "react"
import {connect} from "react-redux"
import ReactiveInput from "./ReactiveInput";
import {updateLoginAlert, updateLoginPassword, updateLoginUsername, updateSessionSessionhash} from "../actions";
import {API_HOST} from "../config";

let Login = (props) => {
  let doLogin = async(props) => {
    let data ={
      username: props.loginUsername,
      password: props.loginPassword,
    }
    let r = await fetch(`${API_HOST}/login`, {headers: {"content-type": "application/json"}, method: "POST", body: JSON.stringify(data)})
    if(r.status ==   200) {
      let session = (await r.json()).session
      window.localStorage.setItem("session", session)
      props.dispatch(updateSessionSessionhash(session))
      props.dispatch(updateLoginAlert(null))
    }
    else {
      let alertText = "An error has occurred when logging in. Please try again!"
      if(r.status == 404)
        alertText = "Username does not exist!"
      props.dispatch(updateLoginAlert(alertText))
    }
  }

  let LoginAlert = () => {
    if(props.loginAlert)
      return <p className="alert">{props.loginAlert}</p>
    return null
  }

  return (
    <div>
      <h2>Login</h2>
      <ReactiveInput placehold="Username" value={props.loginUsername} onchangeAction={updateLoginUsername}/>
      <ReactiveInput placehold="Password" value={props.loginPassword} onchangeAction={updateLoginPassword}/>
      <LoginAlert/>
      <br/>
      <input type="Submit" value="Login" onClick={() => doLogin(props)}/>
    </div>
  )
}

let mapStateToProps = (state) => ({
  loginUsername: state.login.username,
  loginPassword: state.login.password,
  loginAlert: state.login.alert,
})

export default connect(mapStateToProps)(Login)