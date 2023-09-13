import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const updateTaskSortRequest = createAsyncThunk(
  "getProjectColumn",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    let form_data = new FormData();
    form_data.append("_method", "PUT");
    form_data.append("board_data", data.board_data);
    form_data.append("project_id", localStorage.getItem("idea"));

    try {
      let response = await Http.post(
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
  name: "getProjectColumn",
  initialState: [],
  reducers: {
    dropHandlerState: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTaskSortRequest.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(updateTaskSortRequest.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state = action.payload.payload;
        }
        // state.isLoading = false;
      })
      .addCase(updateTaskSortRequest.rejected, (state, action) => {
        // state.isLoading = false;
      });
  },
});

export default updateTaskSortSlice.reducer;
export const { dropHandlerState } = updateTaskSortSlice.actions;
