import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getClients = createAsyncThunk("client/getClients", async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/client`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return res?.data;
  } catch (error) {
    console.error(error);
  }
});


export const addClient = createAsyncThunk("client/addClient", async (data, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/client`, data, {
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


export const updateClient = createAsyncThunk("client/updateClient", async ({ data, id }, { dispatch }) => {
  const token = localStorage.getItem("token");
  // console.log("token", data);
  try {
    // console.log("EEJE", data, id);
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/client/${id}`, data,
      {
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

export const deleteClient = createAsyncThunk("client/deleteClient", async ({ id }, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/client/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getClients());
  } catch (error) {
    console.error(error);
  }
});
