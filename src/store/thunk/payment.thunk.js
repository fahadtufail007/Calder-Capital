import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClients } from "./client.thunk";
import axios from "axios";

export const getPayments = createAsyncThunk("payments/getPayments", async (data, { dispatch }) => {
  const token = localStorage.getItem("token");
  console.log("token", data);
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data) {
      dispatch(getClients());
    }
    return res?.data;
  } catch (error) {
    console.error(error);
  }
});

export const deletePayment = createAsyncThunk("payments/deletePayment", async ({ id }, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/payment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getPayments());
  } catch (error) {
    console.error(error);
  }
});


export const addPayment = createAsyncThunk("payments/addClient", async (data, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getPayments());
    return res?.data;
  } catch (error) {
    console.error(error);
  }
});