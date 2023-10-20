import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClients } from "./client.thunk";
import axios from "axios";
import { toast } from 'react-toastify';

export const getPayments = createAsyncThunk("payments/getPayments", async (date, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    let query = ''
    if (date) {
      query = `?startDate=${date?.startDate}&endDate=${date?.endDate}`;
    }
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment${query}`, {
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

export const getCsvDataPayment = createAsyncThunk("payments/myCsvData", async (date, { dispatch }) => {
  // console.log("into get CSCDATA")
  const token = localStorage.getItem("token");
  // console.log("token", token)
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment/csv?startDate=${date.startDate}&endDate=${date.endDate}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("dddddddddd?????", res)
    const transformedData = [];
    res?.data.forEach(item => {
      const employeeDetails = item.employeDetail.map((emp, index) => ({
        name: index === 0 ? item.name : '',  // Display name only in the first row of employee detail
        dateRange: index === 0 ? item.dateRange : '',
        payment: index === 0 ? item.payment : '',
        employeeDetail: emp
      }));
      transformedData.push(...employeeDetails);
    });

    return transformedData;
  } catch (error) {
    // console.error(error);
    toast(`Failed to download csv: ${error.message}`, { type: "error" })
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
    toast("Payment deleted successfully", { type: "success" })
  } catch (error) {
    console.error(error);
    toast(`Failed to delete payment: ${error.message}`, { type: "error" })
  }
});

export const updatePayment = createAsyncThunk("payments/updatePayment", async ({ data, id }, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/payment/${id}`, data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    if (res?.data) {
      console.log('first')
      dispatch(getPayments());
      toast("Payment updated successfully", { type: "success" })
    }
    return res?.data;
  } catch (error) {
    console.error(error);
    toast(`Failed to update payment: ${error.message}`, { type: "error" })
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
    toast("Payment added successfully", { type: "success" })
    return res?.data;
  } catch (error) {
    console.error(error);
    toast(`Failed to add payment: ${error.message}`, { type: "error" })
  }


});