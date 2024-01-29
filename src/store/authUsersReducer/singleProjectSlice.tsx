import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface SingleProjectData {
  project_id: string;
}

interface SingleProjectState {
  isLoading: boolean;
  single_data: any;
  error: any;
}

const initialState: SingleProjectState = {
  isLoading: false,
  single_data: null,
  error: null,
};

export const singleProjectRequest = createAsyncThunk<any, SingleProjectData>(
  "single_project_data",
  async (project_id, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await Http.get(
        `${process.env.REACT_APP_API_URL}api/organization/project/${project_id}`,
        headers
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const singleProjectSlice = createSlice({
  name: "single_project_data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(singleProjectRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error state on pending
      })
      .addCase(singleProjectRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.single_data = action.payload?.payload || null;
        state.error = null; // Reset error state on fulfillment
      })
      .addCase(singleProjectRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Save error information on rejection
      });
  },
});

export default singleProjectSlice.reducer;
