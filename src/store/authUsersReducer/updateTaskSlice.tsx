import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface UpdateTaskData {
  task_id: string;
  name: string;
  project_id: string;
  description: string;
  status_id: string;
  id: string;
  start_date: string;
  end_date: string;
  image: FileList;
  user_ids: string[];
}

interface UpdateTaskState {
  isLoading: boolean;
  successTaskUpdate: boolean;
}

export const updateTaskRequest = createAsyncThunk(
  "update_task",
  async (data: UpdateTaskData, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    var form_data = new FormData();
    form_data.append("_method", "PUT");
    form_data.append("name", data.name);
    form_data.append("status_id", data.status_id);
    form_data.append("description", data.description);
    // form_data.append("user_ids[]", "");

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/update/task/${data.id}`,
        headers,
        form_data
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const updateTaskSlice = createSlice({
  name: "update_task",
  initialState: {
    isLoading: false,
    successTaskUpdate: false,
  } as UpdateTaskState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateTaskRequest.pending, (state) => {
        state.isLoading = true;
        state.successTaskUpdate = false;
      })
      .addCase(
        updateTaskRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload?.success) {
            state.successTaskUpdate = true;
          }
          state.isLoading = false;
        }
      )
      .addCase(updateTaskRequest.rejected, (state) => {
        state.isLoading = false;
        state.successTaskUpdate = false;
      });
  },
});

export default updateTaskSlice.reducer;
