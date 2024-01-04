import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface AddProjectData {
  projectName: string;
  description?: string;
  startDate: string;
  endDate: string;
  users: string[];
  projectLogo: File;
  projectTz: File;
  data: any;
}

interface ErrorResponse {
  data: {
    errors: Record<string, string>;
  };
}

interface AddProjectState {
  isLoading: boolean;
  errorMessages: Record<string, string> | null;
}

export const addProjectRequest = createAsyncThunk(
  "add_project",
  async (data: AddProjectData, { rejectWithValue }) => {
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

    if (data.projectLogo) {
      form_data.append("project_logo", data.projectLogo);
    }
    if (data.projectTz) {
      form_data.append("project_tz", data.projectTz);
    }

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/store/project`,
        headers,
        form_data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
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
      .addCase(addProjectRequest.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addProjectRequest.rejected, (state, action) => {
        const { errors } = (action.payload as ErrorResponse).data;

        state.errorMessages = errors;
        state.isLoading = false;
      });
  },
});

export default addProjectSlice.reducer;
