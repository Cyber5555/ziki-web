import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface UserDetailResponse {
  success: boolean;
  payload: any[]; // Replace 'any[]' with the actual type of payload data
}

export const authUserDetailRequest = createAsyncThunk(
  "user_detail",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_API_URL}api/user-detail`,
        headers
      );

      return response.data as UserDetailResponse;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

interface AuthUserDetailState {
  isLoading: boolean;
  user_data: any[]; // Replace 'any[]' with the actual type of user_data
}

const authUserDetailSlice = createSlice({
  name: "user_detail",
  initialState: {
    isLoading: false,
    user_data: [],
  } as AuthUserDetailState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authUserDetailRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUserDetailRequest.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.user_data = action.payload.payload;
          localStorage.setItem(
            "organization_id",
            action.payload.payload.organization_id
          );
        }

        state.isLoading = false;
      })
      .addCase(authUserDetailRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authUserDetailSlice.reducer;
