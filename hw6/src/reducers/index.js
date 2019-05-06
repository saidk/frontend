import WebSocketReducer from './WebSocketReducer';
import Reducer from './Reducer';

import {combineReducers} from 'redux';

// `combineReducers` is used to create different _slices_ of application state
// which are managed by different reducers.
export default combineReducers({
  connection: WebSocketReducer,
  reducer: Reducer
});
