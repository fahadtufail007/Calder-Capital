import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getAllContractors = createAsyncThunk('contractor/getContractors', async (data) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee`, {headers: {
          'Access-Control-Allow-Origin': '*',
        }});
        return res?.data;
      } catch (error) {
        console.error(error);
        throw new Error(error.response.data.message);
      }
});
  const convertDataFromDB = (contractors) => {
    debugger
    const newArray = contractors.map((obj) => {
      return {
        name: obj.f_name + ' ' + obj.l_name,
        email: obj.email,
        id: obj._id,
        role: obj.role,
        date: obj.date,
      };
    });
    console.log('newArray', contractors);
    return newArray;  
  }
const contractorsReducer = createSlice({
  name: 'contractor',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: {
    [getAllContractors.fulfilled]: (state, { payload }) => {
      
      state.data = convertDataFromDB(payload);
      // state.logedIn = true;
    },
  },
});

export const {  } = contractorsReducer.actions;
export default contractorsReducer.reducer;
