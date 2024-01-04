import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

// Define the type for your API response data
interface ProjectColumnData {
  // Adjust the properties based on your API response
  id: string;
  // Add other properties...
}

// Define the type for your state
interface GetProjectColumnState {
  isLoading: boolean;
  data: ProjectColumnData[]; // Adjust the data type based on your API response
  error: any; // Adjust the error type based on your needs
}

const initialState: GetProjectColumnState = {
  isLoading: false,
  data: [],
  error: null,
};

export const getProjectColumnRequest = createAsyncThunk<
  ProjectColumnData[],
  { id: string }
>("getProjectColumn", async (data, { rejectWithValue }) => {
  const token = localStorage.getItem("userToken");
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await Http.get(
      `${process.env.REACT_APP_API_URL}api/organization/project/${data.id}`,
      headers
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const getProjectColumnSlice = createSlice({
  name: "getProjectColumn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectColumnRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProjectColumnRequest.fulfilled,
        (state, action: PayloadAction<ProjectColumnData[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(getProjectColumnRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default getProjectColumnSlice.reducer;
