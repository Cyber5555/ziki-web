import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const authUserDetailRequest = createAsyncThunk(
  "user_detail",
  async ({ rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_API_URL}api/user-detail`,
        headers
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const authUserDetailSlice = createSlice({
  name: "user_detail",
  initialState: {
    isLoading: false,
    user_data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authUserDetailRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUserDetailRequest.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.user_data = action.payload.payload;
        }

        state.isLoading = false;
      })
      .addCase(authUserDetailRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authUserDetailSlice.reducer;
