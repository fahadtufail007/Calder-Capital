import { createSlice } from '@reduxjs/toolkit'
import { getEarnings } from '../thunk/earning.thunk';

const initialState = {
  data: {
    earnings: [],
    totalEarning: 0,
    totalClients: 0,
    name: "",
    email: ""
  },
  laoding: false,
};

export const earningReducer = createSlice({
  name: "earning",
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
    [getEarnings.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.laoding = false;
    },
    [getEarnings.pending]: (state) => {
      state.laoding = true;
    },
    [getEarnings.rejected]: (state) => {
      state.laoding = false;
    }
  },
});

export const { logOut, adminLogout } = earningReducer.actions;
export default earningReducer.reducer