import { createSlice } from '@reduxjs/toolkit'
import { loginAction } from '../thunk/login.thunk';

const initialState = {
  user: null,
  logedIn: false,
};

export const loginReducer = createSlice({
  name: "login",
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
    [loginAction.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.logedIn = true;
    },
  },
});

export const { logOut, adminLogout } = loginReducer.actions;
export default loginReducer.reducer