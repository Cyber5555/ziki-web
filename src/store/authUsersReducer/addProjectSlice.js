import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const addProjectRequest = createAsyncThunk(
  "add_project",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    let form_data = new FormData();
    form_data.append("name", data.projectName);
    if (data.description?.length) {
      form_data.append("description", data.description);
    }
    form_data.append("start_date", data.startDate);
    form_data.append("end_date", data.endDate);

    for (let i = 0; i < data.users.length; i++) {
      form_data.append("users[]", data.users[i]);
    }

    if (Object.keys(data.projectLogo).length) {
      form_data.append("project_logo", data.projectLogo);
    }
    if (Object.keys(data.projectTz).length) {
      form_data.append("project_tz", data.projectTz);
    }

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/store/project`,
        headers,
        form_data
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const addProjectSlice = createSlice({
  name: "add_project",
  initialState: {
    isLoading: false,
    // all_project_data: [],
    errorMessages: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProjectRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProjectRequest.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addProjectRequest.rejected, (state, action) => {
        state.errorMessages = action.payload?.data?.errors;

        state.isLoading = false;
      });
  },
});

export default addProjectSlice.reducer;
