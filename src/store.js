import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userRoleReducer,
  userRoleCreateReducer,
  userRoleUpdateReducer,
} from './reducers/userRoleReducer';

const reducer = combineReducers({
  role: userRoleReducer,
  roleCreate: userRoleCreateReducer,
  roleUpdate: userRoleUpdateReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
