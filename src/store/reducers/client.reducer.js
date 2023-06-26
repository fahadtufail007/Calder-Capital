import { createSlice } from '@reduxjs/toolkit'
// import styles from "../styles/Clients.module.css";

// import { loginAction } from '../thunk/login.thunk';

const initialState = {
  data: [
    {
      name: "John Doe",
      email: "johndoe247340@gmail.com",
      date: "May 3, 2023",
      assigned: [
        {id: '13434', value: 'Person1', commission: '5'},
        {id: '564', value: 'Person2', commission: '5'},
        {id: '435', value: 'Person3', commission: '5'},
        {id: '657', value: 'Person4', commission: '5'},

      ],
    },
    {
      name: "John Doe",
      email: "johndoe247340@gmail.com",
      date: "May 3, 2023",
      assigned: [
        {id: '4574', value: 'Person1', commission: '5'},
        {id: '3643', value: 'Person2', commission: '5'},
        {id: '6756', value: 'Person3', commission: '5'},
        {id: '3456', value: 'Person4', commission: '5'},
      ],
    },
  ],
  assignedTo: [
    {value: 'Abdullah', id: '113'},
    {value: 'Asad', id: '3445'},
    {value: "Arham", id: '3453' },
    {value: "Rehan", id: '654' },
    {value: "Irfan", id: '6804' }
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
//   extraReducers: {
//     [loginAction.fulfilled]: (state, { payload }) => {
//       state.user = payload;
//       state.logedIn = true;
//     },
//   },
});

export const { logOut, adminLogout } = clientReducer.actions;
export default clientReducer.reducer