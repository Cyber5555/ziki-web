import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface RegisterData {
  email: string;
  password: string;
  password_confirmation: string;
  avatar: File;
  name: string;
}

interface RegisterPayload {
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
  };
}

interface RegisterState {
  isLoading: boolean;
  successRegister: boolean;
  isError: string;
  emailError: string;
  passwordError: string;
  passwordConfirmError: string;
  nameError: string;
  avatarError: string;
}

const initialState: RegisterState = {
  isLoading: false,
  successRegister: false,
  isError: "",
  emailError: "",
  passwordError: "",
  passwordConfirmError: "",
  nameError: "",
  avatarError: "",
};

export const registerRequest = createAsyncThunk<RegisterPayload, RegisterData>(
  "register",
  async (data, { rejectWithValue }) => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const formData = new FormData();
    console.log(data.avatar);

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("avatar", data.avatar);

    try {
      const response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/register`,
        myHeaders,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearErrorRegister(state) {
      state.isError = "";
      state.emailError = "";
      state.passwordError = "";
      state.passwordConfirmError = "";
      state.nameError = "";
      state.avatarError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerRequest.fulfilled,
        (state, action: PayloadAction<RegisterPayload>) => {
          if (action.payload.success) {
            state.successRegister = true;
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
            state.successRegister = false;
          }

          state.isLoading = false;
        }
      )
      .addCase(registerRequest.rejected, (state, action) => {
        const error = (action.payload as RegisterPayload)?.errors;

        if (error) {
          state.isError = error.message || "An unknown error occurred.";
          // Set specific error fields for each input
          state.emailError = error.email || "";
          state.passwordError = error.password || "";
          state.passwordConfirmError = error.password_confirmation || "";
          state.nameError = error.name || "";
          state.avatarError = error.avatar || "";
        } else {
          state.isError =
            "An error occurred, but no error details were provided.";
        }

        state.isLoading = false;
      });
  },
});

export default registerSlice.reducer;
export const { clearErrorRegister } = registerSlice.actions;
