import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClients } from "./client.thunk";
import axios from "axios";
import { toast } from 'react-toastify';

export const getEarnings = createAsyncThunk("earning/myEarnings", async (userId, { dispatch }) => {
  // console.log(userId, "halso");

  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/earning/myEarnings/${userId}`, {
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

export const getCsvData = createAsyncThunk("earning/myCsvData", async (userId, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/earning/myCsvData/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.error(error);
    toast(`Failed to download csv: ${error.message}`, { type: "error" })
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
    toast("Earning deleted successfully", { type: "success" })
  } catch (error) {
    console.error(error);
    toast(`Failed to delete earning: ${error.message}`, { type: "error" })
  }
});

