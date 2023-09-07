import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getContractors = createAsyncThunk("employee/getContractors", async () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    const filteredData = res?.data?.filter((item) => {
      return item?.role !== "admin";
    });

    return filteredData;
  } catch (error) {
    console.error(error);
  }
});


export const addContractor = createAsyncThunk("employee/addEmployee", async (data, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/employee`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res?.data) {
      dispatch(getContractors());
    }

    return res?.data;
  } catch (error) {
    console.error(error);
  }
});


export const updateContractor = createAsyncThunk("employee/updateContractot", async ({ data, id }, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/employee/${id}`, data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    if (res?.data) {
      dispatch(getContractors());
    }
    return res?.data;
  } catch (error) {
    console.error(error);
  }
});

export const deleteContractor = createAsyncThunk("employee/deleteContractor", async ({ id }, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/employee/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getContractors());
  } catch (error) {
    console.error(error);
  }
});
