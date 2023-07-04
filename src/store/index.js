import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/login.reducer';
import clientReducer from './reducers/client.reducer';
import paymentReducer from './reducers/payment.reducer';

const reducers = combineReducers({
  auth: authReducer,
  client: clientReducer,
  payment: paymentReducer,
});


export const store = configureStore({
  reducer: reducers,
});