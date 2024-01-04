import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface UpdateTaskSortData {
  board_data: string;
  board_id: string;
}

interface UpdateTaskSortState {
  isLoading: boolean;
  data: any; // Adjust the data type based on your API response
  error: any; // Adjust the error type based on your needs
}

const initialState: UpdateTaskSortState = {
  isLoading: false,
  data: null,
  error: null,
};

export const updateTaskSortRequest = createAsyncThunk<any, UpdateTaskSortData>(
  "updateTaskSort",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const form_data = new FormData();
    form_data.append("_method", "PUT");
    form_data.append("board_data", data.board_data);
    form_data.append("project_id", data.board_id || "");

    try {
      const response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/task/change-bord`,
        headers,
        form_data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const updateTaskSortSlice = createSlice({
  name: "updateTaskSort",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTaskSortRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateTaskSortRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload?.success) {
            state.data = action.payload.payload;
          }
          state.isLoading = false;
        }
      )
      .addCase(updateTaskSortRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default updateTaskSortSlice.reducer;
