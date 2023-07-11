import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, { email, password });
    const {token, role} = response.data.token;
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    return response.data.token;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: null,
    role: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.role = action.payload.role
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
}); 

export const { logOut, adminLogout } = authReducer.actions;
export default authReducer.reducer;
