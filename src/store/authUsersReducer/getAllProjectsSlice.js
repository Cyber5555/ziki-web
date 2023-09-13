import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const getAllProjectsRequest = createAsyncThunk(
  "getAllProjects",
  async ({ rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_API_URL}api/organization/projects`,
        headers
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const getAllProjectsSlice = createSlice({
  name: "getAllProjects",
  initialState: {
    isLoading: false,
    all_project_data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjectsRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProjectsRequest.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.all_project_data = action.payload.payload;
        }

        state.isLoading = false;
      })
      .addCase(getAllProjectsRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default getAllProjectsSlice.reducer;
