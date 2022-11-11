import React from "react"
import  ReactDOM  from "react-dom"
import { Provider } from "react-redux";
import {  applyMiddleware, compose  } from "redux";
import { legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk"
import App from "./App"
import reducres from "./reducres";
import './index.css'


const store = createStore(reducres,compose(applyMiddleware(thunk)))
ReactDOM.render(
<Provider store={store}>
< App /> 
</Provider>,
document.getElementById("root"));