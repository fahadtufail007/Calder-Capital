import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './reducers/login.reducer';
const reducers = combineReducers({
  login: loginReducer,
});


export const store = configureStore({
  reducer: reducers,
  // middleware: [thunk],
});