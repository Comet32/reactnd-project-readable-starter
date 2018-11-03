import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, } from 'react-redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux-immutable'

import  postsData  from './reducers'
import  headerData  from './reducers/header'

//合并 reducer
const reducer = combineReducers({
  postsData,
  headerData
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(reducer, enhancer)

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>
, document.getElementById('root'));
