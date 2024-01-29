import { Http } from "../../http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserData {
  success: boolean;
  payload: any[]; // Replace 'any[]' with the actual type of payload data
}

export const getAllUsersRequest = createAsyncThunk(
  "getAllUsers",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_API_URL}api/organization/staff`,
        headers
      );
      return response.data as UserData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface GetAllUsersState {
  isLoading: boolean;
  all_users: any[]; // Replace 'any[]' with the actual type of all_users
}

const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState: {
    isLoading: false,
    all_users: [],
  } as GetAllUsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersRequest.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.all_users = action.payload.payload;
        }
        state.isLoading = false;
      })
      .addCase(getAllUsersRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default getAllUsersSlice.reducer;
