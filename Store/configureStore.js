// Store/configureStore.js

import { createStore, combineReducers } from 'redux';
import account from './Reducers/accountReducer'

export default createStore(combineReducers({account}))