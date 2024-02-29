import { createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface LogoutResponse {
  success: boolean;
}

export const logoutRequest = createAsyncThunk<LogoutResponse, void>(
  "logout",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    const header = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    try {
      const response = await Http.get(
        `${process.env.REACT_APP_API_URL}api/logout`,
        header
      );
      return response.data; // Assuming response.data has the expected structure
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
