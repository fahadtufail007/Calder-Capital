import { createSlice } from '@reduxjs/toolkit'
// import styles from "../styles/Clients.module.css";
import { deleteClient, getClients } from '../thunk/client.thunk';
// import { loginAction } from '../thunk/login.thunk';

const initialState = {
  data: [],
  assignedTo: [

  ],
  laoding: false,
};

export const clientReducer = createSlice({
  name: "client",
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
    [getClients.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.laoding = false;
    },
    [getClients.pending]: (state) => {
      state.laoding = true;
    },
    [getClients.rejected]: (state) => {
      state.laoding = false;
    },
    [deleteClient.fulfilled]: (state) => {
      state.laoding = false;
    },
    [deleteClient.pending]: (state) => {
      state.laoding = true;
    },
    [deleteClient.rejected]: (state) => {
      state.laoding = false;
    },
  },
});

export const { logOut, adminLogout } = clientReducer.actions;
export default clientReducer.reducer