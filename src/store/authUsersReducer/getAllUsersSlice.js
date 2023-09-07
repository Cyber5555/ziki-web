import { Http } from "../../http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUsersRequest = createAsyncThunk(
  "getAllUsers",
  async ({ rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_API_URL}api/organization/staff`,
        headers
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState: {
    isLoading: false,
    all_users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersRequest.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.all_users = action.payload.payload;
        }
        state.isLoading = false;
      })
      .addCase(getAllUsersRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default getAllUsersSlice.reducer;
