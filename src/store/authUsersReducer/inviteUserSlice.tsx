import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface InviteUserData {
  email: string;
}

interface InviteUserResponse {
  success: boolean;
  data?: any;
  errors?: Record<string, string>;
}

interface InviteUserState {
  isLoading: boolean;
  inviteError: string;
}

export const inviteUserRequest = createAsyncThunk(
  "inviteUser",
  async (data: InviteUserData, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    let form_data = new FormData();
    form_data.append("email", data.email);

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/invite/user/organization`,
        headers,
        form_data
      );

      return response.data as InviteUserResponse;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const inviteUserSlice = createSlice({
  name: "inviteUser",
  initialState: {
    isLoading: false,
    inviteError: "",
  } as InviteUserState,
  reducers: {
    clearErrorInvite: (state) => {
      state.inviteError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(inviteUserRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(inviteUserRequest.fulfilled, (state, action) => {
        // Add relevant logic here if needed
      })
      .addCase(inviteUserRequest.rejected, (state, action) => {
        const errors = (action.payload as InviteUserResponse)?.errors;
        state.isLoading = false;
        state.inviteError = errors?.email || "An error occurred";
      });
  },
});

export default inviteUserSlice.reducer;
export const { clearErrorInvite } = inviteUserSlice.actions;
