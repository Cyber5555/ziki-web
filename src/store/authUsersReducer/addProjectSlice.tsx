import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Http} from "../../http";

interface AddProjectData {
  projectName: string;
  description?: string;
  startDate: string;
  endDate: string;
  users: string[];
  projectLogo: File;
  projectTz: File;
}

interface AddProjectResponse {
  // Define the expected structure of the API response
  // Adjust it based on the actual response structure
  success: boolean;
  data?: any; // Adjust it based on the actual response structure
  errors?: Record<string, string>;
}

interface AddProjectState {
  isLoading: boolean;
  errorMessages: Record<string, string> | null;
}

export const addProjectRequest = createAsyncThunk(
  "add_project",
  async (data: AddProjectData, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem("userToken");
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const form_data = new FormData();
      form_data.append("name", data.projectName);
      if (data.description?.length) {
        form_data.append("description", data.description);
      }
      form_data.append("start_date", data.startDate);
      form_data.append("end_date", data.endDate);
      form_data.append(
        "organization_id",
        localStorage.getItem("organization_id") || ""
      );

      for (let i = 0; i < data.users.length; i++) {
        form_data.append("users[]", data.users[i]);
      }

      if (data.projectLogo) {
        form_data.append("project_logo", data.projectLogo);
      }
      if (data.projectTz) {
        form_data.append("project_tz", data.projectTz);
      }

      const apiUrl = `${process.env.REACT_APP_API_URL}api/store/project`;
      const response = await Http.post(apiUrl, headers, form_data);

      return response.data as AddProjectResponse;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const addProjectSlice = createSlice({
  name: "add_project",
  initialState: {
    isLoading: false,
    errorMessages: null,
  } as AddProjectState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProjectRequest.pending, (state) => {
        state.isLoading = true;
        state.errorMessages = null;
      })
      .addCase(addProjectRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        // You can handle the success response here if needed
      })
      .addCase(addProjectRequest.rejected, (state, action) => {
        const errors = (action.payload as AddProjectResponse)?.errors;

        state.errorMessages = errors || {general: "An error occurred"};
        state.isLoading = false;
      });
  },
});

export default addProjectSlice.reducer;
