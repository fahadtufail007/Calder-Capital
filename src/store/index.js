import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/login.reducer';
import clientReducer from './reducers/client.reducer';
import paymentReducer from './reducers/payment.reducer';
import contractorReducer from './reducers/contractor.reducer';
import earningReducer from './reducers/earning.reducer';

const reducers = combineReducers({
  auth: authReducer,
  client: clientReducer,
  payment: paymentReducer,
  contractor: contractorReducer,
  earning: earningReducer
});


export const store = configureStore({
  reducer: reducers,
});