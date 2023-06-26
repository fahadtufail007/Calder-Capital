import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAction = createAsyncThunk(
    "users/login",
    async ({ values, navigate }) => {
      try {
        navigate("/clients")

        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth`, values);
        // localStorage.setItem("Token", res.data.accessToken);
        // localStorage.setItem("Name", res.data.name);
        // localStorage.setItem("Email", res.data.email);
        // localStorage.setItem("Id", res.data._id);
        // toast.success("Successfull loged in");
        // if (res.data == 5150) navigate("/admin");
        return res?.data;
      } catch (error) {
        console.error(error);
      }
    }
  );
  export const signup = createAsyncThunk(
    "signup",
    async ({ values, setSubmitting }) => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, values);
        setSubmitting(false);
        // toast.success("Sucessfully Signed up!");
        return res?.data;
      } catch (error) {
        setSubmitting(false);
      }
    }
  );