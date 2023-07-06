// import { createSlice } from '@reduxjs/toolkit'
// // import styles from "../styles/Clients.module.css";
// import { getClients } from '../thunk/client.thunk';
// // import { loginAction } from '../thunk/login.thunk';

// const convertDataFromDB = (clients) => {
//   debugger
//   const newArray = clients.map((obj) => {
//     return {
//       name: obj.f_name + ' ' + obj.l_name,
//       email: obj.email,
//       id: obj._id,
//       role: obj.role,
//       date: obj.date,
//     };
//   });
//   console.log('clients newArray', clients);
//   return newArray;  
// }
// export const clientReducer = createSlice({
//   name: "client",
//   initialState: {
//     data:[]
//   },
//   reducers: {
//     logOut: (state) => {
//       state.logedIn = false;
//     },
//     adminLogout: (state) => {
//       state.user = 2001;
//     },
//   },
//   extraReducers: {
//     [getClients.fulfilled]: (state, { payload }) => {
//       state.data = convertDataFromDB(payload);
//       // state.logedIn = true;
//     },
//   },
// });

// export const { logOut, adminLogout } = clientReducer.actions;
// export default clientReducer.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getAllClients = createAsyncThunk('client/getAllClients', async (data) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/client`, {headers: {
          'Access-Control-Allow-Origin': '*',
        }});
        return res?.data;
      } catch (error) {
        console.error(error);
        throw new Error(error.response.data.message);
      }
});
  const convertDataFromDB = (clients) => {
    const newArray = clients.map((obj) => {
      return {
        name: obj.f_name + ' ' + obj.l_name,
        email: obj.email,
        id: obj._id,
        role: obj.role,
        date: obj.date,
      };
    });
    console.log('newArray', clients);
    return newArray;  
  }
const clientsReducer = createSlice({
  name: 'client',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: {
    [getAllClients.fulfilled]: (state, { payload }) => {
      
      state.data = convertDataFromDB(payload);
      // state.logedIn = true;
    },
  },
});

export const {  } = clientsReducer.actions;
export default clientsReducer.reducer;
