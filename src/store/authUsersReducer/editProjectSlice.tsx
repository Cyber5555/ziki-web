import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface EditProjectData {
  projectName: string;
  description?: string;
  startDate: string;
  endDate: string;
  users: any[];
  projectLogo: File;
  projectTZ: File;
  data: any;
  project_id: string;
}

interface ErrorResponse {
  data: {
    errors: Record<string, string>;
  };
}

interface EditProjectState {
  isLoading: boolean;
  errorMessages: Record<string, string> | null;
}

export const editProjectRequest = createAsyncThunk(
  "edit_project",
  async (data: EditProjectData, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    let form_data = new FormData();
    form_data.append("_method", "PUT");

    form_data.append("name", data.projectName);
    if (data.description?.length) {
      form_data.append("description", data.description);
    }
    form_data.append("start_date", data.startDate);
    form_data.append("end_date", data.endDate);

    for (let i = 0; i < data.users.length; i++) {


      form_data.append("users[]", data.users[i]?.id);
    }

    if (data.projectLogo) {
      form_data.append("project_logo", data.projectLogo);
    }
    if (data.projectTZ) {
      form_data.append("project_tz", data.projectTZ);
    }

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/update/project/${data.project_id}`,
        headers,
        form_data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const editProjectSlice = createSlice({
  name: "edit_project",
  initialState: {
    isLoading: false,
    errorMessages: null,
  } as EditProjectState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProjectRequest.pending, (state) => {
        state.isLoading = true;
        state.errorMessages = null;
      })
      .addCase(editProjectRequest.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editProjectRequest.rejected, (state, action) => {
        const { errors } = (action.payload as ErrorResponse).data;

        state.errorMessages = errors;
        state.isLoading = false;
      });
  },
});

export default editProjectSlice.reducer;
