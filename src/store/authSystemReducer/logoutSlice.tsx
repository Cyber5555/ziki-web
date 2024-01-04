import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface LogoutState {
  isLoading: boolean;
}

export const logoutRequest = createAsyncThunk<void, void>(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Http.get(
        `${process.env.REACT_APP_API_URL}api/logout`,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          Accept: "application/json",
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    isLoading: false,
  } as LogoutState,
  reducers: {
    clearLogoutState(state) {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutRequest.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(logoutRequest.fulfilled, (state, action) => {
        const payload = action.payload as { success: boolean } | undefined;
        if (payload?.success) {
          localStorage.clear();
        }
        state.isLoading = false;
      })

      .addCase(logoutRequest.rejected, (state) => {
        // You might want to handle the error more gracefully here
        console.error("Logout request failed.");
        state.isLoading = false;
      });
  },
});

export const { clearLogoutState } = logoutSlice.actions;
export default logoutSlice.reducer;
