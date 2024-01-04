import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface LoginData {
  email: string;
  password: string;
}

interface LoginPayload {
  success: boolean;
  payload: {
    token: string;
    user: string;
  };
  error?: {
    message: string;
  };
}

interface LoginState {
  isLoading: boolean;
  successLogin: boolean;
  isError: string;
}

const initialState: LoginState = {
  isLoading: false,
  successLogin: false,
  isError: "",
};

export const loginRequest = createAsyncThunk<LoginPayload, LoginData>(
  "login",
  async (data, { rejectWithValue }) => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const form_data = new FormData();
    form_data.append("email", data.email);
    form_data.append("password", data.password);

    try {
      const response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/login`,
        myHeaders,
        form_data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearErrorLogin(state) {
      state.isError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginRequest.fulfilled,
        (state, action: PayloadAction<LoginPayload>) => {
          if (action.payload.success) {
            if (
              action.payload?.payload?.token !== null &&
              action.payload.payload.token !== undefined
            ) {
              localStorage.setItem("userToken", action.payload?.payload?.token);
              localStorage.setItem("role", action.payload?.payload?.user);
              state.successLogin = true;
              state.isError = "";
            }
          } else {
            // localStorage.setItem("userToken", null);
            state.isError = action.payload?.error?.message || "";
            state.successLogin = false;
          }

          state.isLoading = false;
        }
      )
      .addCase(loginRequest.rejected, (state, action) => {
        const error = (action.payload as LoginPayload)?.error;

        if (error) {
          state.isError = error.message || "An unknown error occurred.";
        } else {
          state.isError =
            "An error occurred, but no error details were provided.";
        }

        state.isLoading = false;
      });
  },
});

export default loginSlice.reducer;
export const { clearErrorLogin } = loginSlice.actions;
