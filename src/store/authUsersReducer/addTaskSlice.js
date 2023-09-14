import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const addTaskRequest = createAsyncThunk(
  "add_task",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    let form_data = new FormData();
    form_data.append("name", data.name);
    form_data.append("project_id", data.project_id);
    form_data.append("description", data.description);
    form_data.append("status_id", data.status_id);
    form_data.append("start_date", data.start_date);
    form_data.append("end_date", data.end_date);
    Object.values(data.image).map((value) =>
      form_data.append("images[]", value)
    );
    Object.values(data.user_ids).map((value) =>
      form_data.append("user_ids[]", value)
    );

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/store/task`,
        headers,
        form_data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const addTaskSlice = createSlice({
  name: "add_task",
  initialState: {
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTaskRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskRequest.fulfilled, (state, action) => {
        // if (action.payload?.success) {

        // }

        state.isLoading = false;
      })
      .addCase(addTaskRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addTaskSlice.reducer;
