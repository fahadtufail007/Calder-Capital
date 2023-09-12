import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

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
    })

    if (res?.data) {
      dispatch(getClients());
      toast("Client added successfully", { type: "success" })
    }

    return res?.data;
  } catch (error) {
    console.error(error);
    toast(`Failed to add client: ${error.message}`, { type: "error" })
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
      toast("Client updated successfully", { type: "success" })
    }
    return res?.data;
  } catch (error) {
    console.error(error);
    toast(`Failed to update client: ${error.message}`, { type: "error" })
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
    toast("Client updated successfully", { type: "success" })

  } catch (error) {
    console.error(error);
    toast(`Failed to update client: ${error.message}`, { type: "error" })

  }
});
