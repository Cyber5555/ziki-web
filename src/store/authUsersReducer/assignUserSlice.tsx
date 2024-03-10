import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface AssignUserResponse {
  id: string;
}

export const assignUserRequest = createAsyncThunk(
  "assign/user",
  async (data: AssignUserResponse, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    const headers = {
      Access: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/assign/task/${data.id}`,
        headers
      );
      console.log(response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const assignUserSlice = createSlice({
  name: "assign/user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(assignUserRequest.pending, (state) => {})
      .addCase(assignUserRequest.fulfilled, (state, action) => {})
      .addCase(assignUserRequest.rejected, (state, action) => {});
  },
});

export default assignUserSlice.reducer;
