import { createSlice } from '@reduxjs/toolkit'
// import { loginAction } from '../thunk/login.thunk';

const initialState = {
  data: [
    {
        // id: '111',
        name: "John Doe",
        date: "01 May, 2023 - 31 May, 2023",
        payment: "USD 5000",
        emplyees: "Abdullah",
        amount: "USD 500",
    },
    {
        // id: '1333',
        name: "John Doe",
        date: "01 May, 2023 - 31 May, 2023",
        payment: "USD 5000",
        emplyees: "Abdullah",
        amount: "USD 500",
    },
  ],
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
//   extraReducers: {
//     [loginAction.fulfilled]: (state, { payload }) => {
//       state.user = payload;
//       state.logedIn = true;
//     },
//   },
});

export const { logOut, adminLogout } = pyamentReducer.actions;
export default pyamentReducer.reducer