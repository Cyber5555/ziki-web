import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface UpdateProfileState {
  isLoading: boolean;
  // staff_data: any[];
}

interface UpdateProfileData {
  avatar: any;
  name: string;
  stack: string;
  email: string;
}

export const updateProfileRequest = createAsyncThunk(
  "update/details/profile",
  async (data: UpdateProfileData, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const form_data = new FormData();

    if (data.avatar) {
      alert(data.avatar);
      form_data.append("avatar", data.avatar);
    }
    if (data.email) {
      form_data.append("email", data.email);
    }
    if (data.name) {
      form_data.append("name", data.name);
    }
    if (data.stack) {
      form_data.append("stack", data.stack);
    }

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/update-profile`,
        headers,
        form_data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const updateProfileSlice = createSlice({
  name: "update/details/profile",
  initialState: {
    isLoading: false,
    // staff_data: [],
  } as UpdateProfileState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateProfileRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateProfileRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          // if (action.payload?.success) {
          //   state.staff_data = action.payload.payload;
          // }

          state.isLoading = false;
        }
      )
      .addCase(updateProfileRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default updateProfileSlice.reducer;
