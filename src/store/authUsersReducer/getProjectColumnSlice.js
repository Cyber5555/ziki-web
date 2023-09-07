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

      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const getProjectColumnSlice = createSlice({
  name: "getProjectColumn",
  initialState: {
    isLoading: false,
    project_columns: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectColumnRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectColumnRequest.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.project_columns = action.payload.payload;
        }
        state.isLoading = false;
      })
      .addCase(getProjectColumnRequest.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default getProjectColumnSlice.reducer;
