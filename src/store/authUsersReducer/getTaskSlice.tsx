import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface GetTaskData {
  taskId: string;
}

interface GetTaskState {
  isLoading: boolean;
  task_data: any[];
}

export const getTaskRequest = createAsyncThunk(
  "get_task",
  async (taskId: GetTaskData, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_API_URL}api/project/task/${taskId}`,
        headers
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const getTaskSlice = createSlice({
  name: "get_task",
  initialState: {
    isLoading: false,
    task_data: [],
  } as GetTaskState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getTaskRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getTaskRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log("📢 [getTaskSlice.tsx:53]", action.payload);
          if (action.payload?.success) {
            state.task_data = action.payload.payload;
          }

          state.isLoading = false;
        }
      )
      .addCase(getTaskRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default getTaskSlice.reducer;
