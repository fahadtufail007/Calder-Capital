import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './reducers/login.reducer';
import clientReducer from './reducers/client.reducer';
import paymentReducer from './reducers/payment.reducer';
const reducers = combineReducers({
  login: loginReducer,
  client: clientReducer,
  payment: paymentReducer,
});


export const store = configureStore({
  reducer: reducers,
  // middleware: [thunk],
});