import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface CreateUserState {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  stack: string;
}

interface CreateUserData {
  isLoadingUserCreate: boolean;
  name_error: string;
  email_error: string;
  password_error: string;
  password_confirmation_error: string;
  stack_error: string;
}

interface CreateUserResponse {
  errors: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    stack: string;
  };
  data: any[];
  success: boolean;
}

export const adminCreateNewUserRequest = createAsyncThunk(
  "adminCreateNewUser",
  async (data: CreateUserState, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const form_data = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      stack: data.stack,
    };

    try {
      const response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/store/organization-user`,
        headers,
        form_data
      );

      return response.data as CreateUserResponse;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const adminCreateNewUserSlice = createSlice({
  name: "adminCreateNewUser",
  initialState: {
    isLoadingUserCreate: false,
    name_error: "",
    email_error: "",
    password_error: "",
    password_confirmation_error: "",
    stack_error: "",
  } as CreateUserData,
  reducers: {
    clearCreateUserError: (state) => {
      state.name_error = "";
      state.email_error = "";
      state.password_error = "";
      state.password_confirmation_error = "";
      state.stack_error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminCreateNewUserRequest.pending, (state) => {
        state.isLoadingUserCreate = true;
      })
      .addCase(adminCreateNewUserRequest.fulfilled, (state, action) => {
        state.isLoadingUserCreate = false;
      })
      .addCase(adminCreateNewUserRequest.rejected, (state, action) => {
        state.isLoadingUserCreate = false;

        const { email, name, password, password_confirmation, stack } = (
          action.payload as CreateUserResponse
        )?.errors;
        state.email_error = email;
        state.name_error = name;
        state.password_error = password;
        state.password_confirmation_error = password_confirmation;
        state.stack_error = stack;
      });
  },
});

export default adminCreateNewUserSlice.reducer;
export const { clearCreateUserError } = adminCreateNewUserSlice.actions;
