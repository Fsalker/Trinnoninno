import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore} from "redux"
import mainReducer from "./reducers"
import {Provider} from "react-redux"
import {updateSessionSessionhash} from "./actions";
import {API_HOST} from "./config";

let store = createStore(mainReducer)

let storeLogger = () => {
  console.log(store.getState())
}

let getSavedSession = () => {
  let session = localStorage.getItem("session")
  if(session)
    store.dispatch(updateSessionSessionhash(session))

  return session
}

let validateSession = async(session) => {
  let data = {session: session}
  let r = await fetch(`${API_HOST}/validateSession`, {headers: {"content-type": "application/json"}, method: "POST", body: JSON.stringify(data)})
  if(r.status === 401)
    store.dispatch(updateSessionSessionhash(null))
}

let initialiseApp = async() => {
  store.subscribe(storeLogger)

  let session = getSavedSession()
  await validateSession(session)
}

initialiseApp()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));