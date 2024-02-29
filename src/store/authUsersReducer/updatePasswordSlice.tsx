import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";
interface UpdatePasswordData {
  old_password: string;
  password: string;
  password_confirmation: string;
}

interface UpdatePasswordState {
  old_password_error: string;
  password_error: string;
  password_confirmation_error: string;
  isLoadingUpdatePassword: boolean;
}

interface UpdatePasswordResponse {
  success: any;
  errors?: Record<string, string>;
  error?: Record<string, string>;
  data: any[];
}

export const updatePasswordRequest = createAsyncThunk(
  "update-password",
  async (data: UpdatePasswordData, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/update-password`,
        headers,
        data
      );

      return response?.data as UpdatePasswordResponse;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const updatePasswordSlice = createSlice({
  name: "update-password",
  initialState: {
    old_password_error: "",
    password_error: "",
    password_confirmation_error: "",
    isLoadingUpdatePassword: false,
  } as UpdatePasswordState,

  reducers: {
    clearErrorUpdatePassword: (state) => {
      state.isLoadingUpdatePassword = false;
      state.old_password_error = "";
      state.password_error = "";
      state.password_confirmation_error = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updatePasswordRequest.pending, (state, action) => {
        state.isLoadingUpdatePassword = true;
      })
      .addCase(updatePasswordRequest.fulfilled, (state, action) => {
        state.isLoadingUpdatePassword = false;
        localStorage.clear();
      })
      .addCase(updatePasswordRequest.rejected, (state, action) => {
        const errors = (action.payload as UpdatePasswordResponse)?.errors;
        const error = (action.payload as UpdatePasswordResponse)?.error;
        state.isLoadingUpdatePassword = false;
        console.log(error);

        if (errors) {
          state.old_password_error = errors.old_password;

          state.password_error =
            errors.password.length > 1 ? errors.password[0] : errors.password;

          if (errors.password) {
          }
          state.password_confirmation_error = errors.password;
        } else if (error) {
          state.old_password_error = error.message
        }
      });
  },
});

export default updatePasswordSlice.reducer;
export const { clearErrorUpdatePassword } = updatePasswordSlice.actions;
