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


export const fecthClients = createAsyncThunk('payment/fecthClients', async (thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/client`);
    const resObj = response?.data.map((res) => ({ value: res._id, label: `${res?.f_name} ${res?.l_name}` }))
    return resObj;
  } catch (error) {
    console.error(error);
  };
});


export const addPayment = createAsyncThunk("payments/addClient", async (data) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/questions/getAll`, data);
    // setSubmitting(false);
    // console.log("Success", res?.data);
    // toast.success("Sucessfully Added Quiz!");
    return res?.data;
  } catch (error) {
    console.error(error);
  }
});