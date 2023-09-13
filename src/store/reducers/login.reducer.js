import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';

export const login = createAsyncThunk('auth/login', async ({ email, password, }) => {
  console.log('base url ', process.env.REACT_APP_BASE_URL);
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, { email, password });

    const { token, role, user } = response.data.token;
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('userId', user._id);

    if (localStorage.getItem('token') != null) {
      toast("LoggedIn successfully", { type: "success" })
    }

    return response.data.token;
  } catch (error) {
    toast(`Failed to Login: ${error.response.data.message}`, { type: "error" })
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
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.isLoggedIn = false
    }
  },
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

export const { logout } = authReducer.actions;
export default authReducer.reducer;
