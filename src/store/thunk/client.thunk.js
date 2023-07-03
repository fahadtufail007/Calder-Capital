import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getClients = createAsyncThunk("client/getClinets", async (data) => {
    // const token = localStorage.getItem("Token");
    console.log("token", data);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/client`, {headers: {
        'Access-Control-Allow-Origin': '*',
      }});
      // setSubmitting(false);
      // console.log("Success", res?.data);
      // toast.success("Sucessfully Added Quiz!");
      return res?.data;
    } catch (error) {
      console.error(error);
    }
});


export const addClient = createAsyncThunk("client/addClient", async (data) => {
// const token = localStorage.getItem("Token");
    // console.log("token", data);
    try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/client`, data, {headers: {
          'Access-Control-Allow-Origin': '*',
        }});
        // setSubmitting(false);
        // console.log("Success", res?.data);
        // toast.success("Sucessfully Added Quiz!");
        return res?.data;
    } catch (error) {
        console.error(error);
    }
});

export const updateClient = createAsyncThunk("client/updateClient", async ({data, id}) => {
  // const token = localStorage.getItem("Token");
      // console.log("token", data);
      try {
          // console.log("EEJE", data, id);
          const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/client/${id}`, data);
          // setSubmitting(false);
          // console.log("Success", res?.data);
          // toast.success("Sucessfully Added Quiz!");
          return res?.data;
      } catch (error) {
          console.error(error);
      }
  });

export const deleteClient = createAsyncThunk("client/deleteClient", async ({id}) => {
  // const token = localStorage.getItem("Token");
      // console.log("token", data);
      try {
          console.log("EEJE", id);
          const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/client/${id}`);
          // setSubmitting(false);
          // console.log("Success", res?.data);
          // toast.success("Sucessfully Added Quiz!");
          return res?.data;
      } catch (error) {
          console.error(error);
      }
});