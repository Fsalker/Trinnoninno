import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore} from "redux"
import mainReducer from "./reducers"
import {Provider} from "react-redux"
import {updateSessionSessionhash} from "./actions";

let store = createStore(mainReducer)

let initialiseApp = () => {
  store.subscribe(() => {
    console.log(store.getState())
  })

  let savedSession = localStorage.getItem("session")
  if(savedSession)
    store.dispatch(updateSessionSessionhash(savedSession))
}

initialiseApp()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));