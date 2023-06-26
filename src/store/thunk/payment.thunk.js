import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPayments = createAsyncThunk("payments/getClinets", async (data) => {
    // const token = localStorage.getItem("Token");
    console.log("token", data);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/questions/getAll`);
      // setSubmitting(false);
      // console.log("Success", res?.data);
      // toast.success("Sucessfully Added Quiz!");
      return res?.data;
    } catch (error) {
      console.error(error);
    }
});


export const addPayment = createAsyncThunk("payments/addClient", async (data) => {
// const token = localStorage.getItem("Token");
    console.log("token", data);
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