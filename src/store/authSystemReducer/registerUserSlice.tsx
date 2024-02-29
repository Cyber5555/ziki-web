import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface RegisterUserData {
  email: string;
  password: string;
  password_confirmation: string;
  avatar: File;
  name: string;
  stack: string;
}

interface RegisterUserPayload {
  success: boolean;
  payload: {
    token: string;
    user: string;
  };
  errors?: {
    message: string;
    // Add specific error fields for each input
    email?: string;
    password?: string;
    password_confirmation?: string;
    name?: string;
    avatar?: string;
    stack?: string;
  };
}

interface RegisterUserState {
  isLoading: boolean;
  isError: string;
  emailError: string;
  passwordError: string;
  passwordConfirmError: string;
  nameError: string;
  avatarError: string;
  stackError: string;
}

const initialState: RegisterUserState = {
  isLoading: false,
  isError: "",
  emailError: "",
  passwordError: "",
  passwordConfirmError: "",
  nameError: "",
  avatarError: "",
  stackError: "",
};

export const registerUserRequest = createAsyncThunk<
  RegisterUserPayload,
  RegisterUserData
>("register/user", async (data, { rejectWithValue }) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("password_confirmation", data.password_confirmation);
  formData.append("avatar", data.avatar);
  formData.append("stack", data.stack);

  try {
    const response = await Http.post(
      `${process.env.REACT_APP_API_URL}api/register/user`,
      myHeaders,
      formData
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const registerUserSlice = createSlice({
  name: "register/user",
  initialState,
  reducers: {
    clearErrorRegister(state) {
      state.isError = "";
      state.emailError = "";
      state.passwordError = "";
      state.passwordConfirmError = "";
      state.nameError = "";
      state.avatarError = "";
      state.stackError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerUserRequest.fulfilled,
        (state, action: PayloadAction<RegisterUserPayload>) => {
          if (action.payload.success) {
            state.isError = "";
          } else {
            state.isError = action.payload?.errors?.message || "";
            // Set specific errors fields for each input
            state.emailError = action.payload?.errors?.email || "";
            state.passwordError = action.payload?.errors?.password || "";
            state.passwordConfirmError =
              action.payload?.errors?.password_confirmation || "";
            state.nameError = action.payload?.errors?.name || "";
            state.avatarError = action.payload?.errors?.avatar || "";
            state.stackError = action.payload?.errors?.stack || "";
          }

          state.isLoading = false;
        }
      )
      .addCase(registerUserRequest.rejected, (state, action) => {
        const error = (action.payload as RegisterUserPayload)?.errors;

        if (error) {
          state.isError = error.message || "An unknown error occurred.";
          // Set specific error fields for each input
          state.emailError = error.email || "";
          state.passwordError = error.password || "";
          state.passwordConfirmError = error.password_confirmation || "";
          state.nameError = error.name || "";
          state.avatarError = error.avatar || "";
          state.stackError = error.stack || "";
        } else {
          state.isError =
            "An error occurred, but no error details were provided.";
        }

        state.isLoading = false;
      });
  },
});

export default registerUserSlice.reducer;
export const { clearErrorRegister } = registerUserSlice.actions;
