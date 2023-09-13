import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const loginRequest = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var form_data = new FormData();
    form_data.append("email", data.email);
    form_data.append("password", data.password);

    try {
      let response = await Http.post(
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
  initialState: {
    isLoading: false,
    successLogin: false,
    isError: "",
  },
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
      .addCase(loginRequest.fulfilled, (state, action) => {
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
          state.isError = action.payload?.error?.message;
          state.successLogin = false;
        }

        state.isLoading = false;
      })
      .addCase(loginRequest.rejected, (state, action) => {
        console.log(action.payload);
        state.isError = action?.payload.error.message;
        state.isLoading = false;
      });
  },
});

export default loginSlice.reducer;
export const { clearErrorLogin } = loginSlice.actions;
