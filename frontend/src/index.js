import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, } from 'react-redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux-immutable'
import logger from 'redux-logger'

import postsData from './reducers/postList'
import headerData from './reducers/header'
import modifyData from './reducers/editPage'
import detailData from './reducers/detailPage'

//合并 reducer
const reducer = combineReducers({
  postsData,
  headerData,
  modifyData,
  detailData
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(applyMiddleware(thunk,logger))
const store = createStore(reducer, enhancer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
