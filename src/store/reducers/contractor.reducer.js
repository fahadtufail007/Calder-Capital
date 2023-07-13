import { createSlice } from '@reduxjs/toolkit'
import { getClients } from '../thunk/client.thunk';
import { getContractors } from '../thunk/contractor.thunk';

const initialState = {
  data: [],
  laoding: false,
};

export const contractorReducer = createSlice({
  name: "contractor",
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
    [getContractors.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.laoding = false;
    },
    [getContractors.pending]: (state) => {
      state.laoding = true;
    },
    [getContractors.rejected]: (state) => {
      state.laoding = false;
    },
  },
});

export const { logOut, adminLogout } = contractorReducer.actions;
export default contractorReducer.reducer