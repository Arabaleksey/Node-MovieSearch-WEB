import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";

export const login = createAsyncThunk(
  "login",
  async (email: any, password: any) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }
);

export const registration = createAsyncThunk(
  "registration",
  async (email: any, password: any) => {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkAPI: any) => {
  try {
    const response = await AuthService.logout();
    localStorage.removeItem("token");
  } catch (e: any) {
    console.log(e.response?.data?.message);
  }
});
