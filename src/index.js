import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from "redux"
import mainReducer from "./reducers"

let store = createStore(mainReducer)
store.subscribe(() => console.log(store.getState()))

ReactDOM.render(<App />, document.getElementById('root'));