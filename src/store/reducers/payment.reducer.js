import { createSlice } from '@reduxjs/toolkit'
// import { loginAction } from '../thunk/login.thunk';
import { getPayments, getCsvDataPayment } from '../thunk/payment.thunk';

const initialState = {
  payments: [],
  csvData: [],
  laoding: false,
};

export const pyamentReducer = createSlice({
  name: "payment",
  initialState,
  reducers: {
    logOut: (state) => {
      state.logedIn = false;
    },
    adminLogout: (state) => {
      state.user = 2001;
    },
  },
  extraReducers: {
    [getPayments.fulfilled]: (state, { payload }) => {
      state.payments = payload;
      state.laoding = false;
    },
    [getPayments.pending]: (state) => {
      state.laoding = true;
    },
    [getPayments.rejected]: (state) => {
      state.laoding = false;
    },
    [getCsvDataPayment.fulfilled]: (state, { payload }) => {
      state.csvData = payload;
      state.laoding = false;
    },
    [getCsvDataPayment.pending]: (state) => {
      state.laoding = true;
    },
    [getCsvDataPayment.rejected]: (state) => {
      state.laoding = false;
    }
  },
});

export const { logOut, adminLogout } = pyamentReducer.actions;
export default pyamentReducer.reducer