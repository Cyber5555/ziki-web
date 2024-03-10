import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const deleteTaskRequest = createAsyncThunk(
  "delete/task",
  async (taskId, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await Http.delete(
        `${process.env.REACT_APP_API_URL}api/destroy/task/${taskId}`,
        headers
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const deleteTaskSlice = createSlice({
  name: "delete/task",
  initialState: {
    isLoadingRemoveTask: false,
    successDeleteTask: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTaskRequest.pending, (state, action) => {
        state.isLoadingRemoveTask = true;
        state.successDeleteTask = false;
      })
      .addCase(deleteTaskRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.successDeleteTask = true;
        }

        state.isLoadingRemoveTask = false;
      })
      .addCase(deleteTaskRequest.rejected, (state, action) => {
        state.isLoadingRemoveTask = false;
        state.successDeleteTask = false;
      });
  },
});

export default deleteTaskSlice.reducer;
