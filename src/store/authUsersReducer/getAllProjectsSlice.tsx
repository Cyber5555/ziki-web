import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface ProjectData {
  success: boolean;
  payload: any[]; // Replace 'any[]' with the actual type of payload data
}

export const getAllProjectsRequest = createAsyncThunk(
  "getAllProjects",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const role = localStorage.getItem("role");
    let url: string = "";
    if (role) {
      const roleId = parseInt(role, 10); // или Number(role)
      if (roleId === 2) {
        url = "api/organization/projects";
      } else if (roleId === 3) {
        url = "api/user/projects";
      }
    }

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_API_URL}${url}`,
        headers
      );

      return response.data as ProjectData;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

interface GetAllProjectsState {
  isLoading: boolean;
  all_project_data: any[]; // Replace 'any[]' with the actual type of all_project_data
}

const getAllProjectsSlice = createSlice({
  name: "getAllProjects",
  initialState: {
    isLoading: false,
    all_project_data: [],
  } as GetAllProjectsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjectsRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProjectsRequest.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.all_project_data = action.payload.payload;
        }

        state.isLoading = false;
      })
      .addCase(getAllProjectsRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default getAllProjectsSlice.reducer;
