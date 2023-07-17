import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClients } from "./client.thunk";
import axios from "axios";

export const getEarnings = createAsyncThunk("earning/myEarnings", async (data, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/earning/myEarnings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data) {
      dispatch(getClients());
    }
    console.log(res?.data, 'this is data');
    return res?.data;
  } catch (error) {
    console.error(error);
  }
});

export const deleteEarning = createAsyncThunk("earning/delete", async ({ id }, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/earning/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getEarnings());
  } catch (error) {
    console.error(error);
  }
});

// export const updatePayment = createAsyncThunk("payments/updatePayment", async ({ data, id }, { dispatch }) => {
//   const token = localStorage.getItem("token");
//   try {
//     const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/payment/${id}`, data,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     if (res?.data) {
//       dispatch(getPayments());
//     }
//     return res?.data;
//   } catch (error) {
//     console.error(error);
//   }
// });
