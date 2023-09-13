import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const getProjectColumnRequest = createAsyncThunk(
  "getProjectColumn",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_API_URL}api/organization/project/${data.id}`,
        headers
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const getProjectColumnSlice = createSlice({
  name: "getProjectColumn",
  initialState: [],
  reducers: {
    dropHandlerState: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectColumnRequest.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getProjectColumnRequest.fulfilled, (state, action) => {
        // state.isLoading = false;
      })
      .addCase(getProjectColumnRequest.rejected, (state, action) => {
        // state.isLoading = false;
      });
  },
});

export default getProjectColumnSlice.reducer;
export const { dropHandlerState } = getProjectColumnSlice.actions;
