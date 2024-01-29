import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface RemoveProjectData {
  id: string;
}

interface RemoveProjectState {
  isLoadingRemove: boolean;
  error: any;
}

const initialState: RemoveProjectState = {
  isLoadingRemove: false,
  error: null,
};

export const removeProjectRequest = createAsyncThunk<
  RemoveProjectData[],
  { id: string }
>("remove_project", async (id, { rejectWithValue }) => {
  const token = localStorage.getItem("userToken");
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await Http.delete(
      `${process.env.REACT_APP_API_URL}api/destroy/project/${id}`,
      headers
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const removeProjectSlice = createSlice({
  name: "remove_project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeProjectRequest.pending, (state) => {
        state.isLoadingRemove = true;
      })
      .addCase(
        removeProjectRequest.fulfilled,
        (state, action: PayloadAction<RemoveProjectData[]>) => {
          state.isLoadingRemove = false;
        }
      )
      .addCase(removeProjectRequest.rejected, (state, action) => {
        state.isLoadingRemove = false;
        state.error = action.payload;
      });
  },
});

export default removeProjectSlice.reducer;
