import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface StaffListData {
  userId: string;
}

interface StaffListState {
  isLoading: boolean;
  staff_data: any[];
}

export const staffListRequest = createAsyncThunk(
  "get/staff",
  async (userId: StaffListData, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    let url: string = "";
    if (userId) {
      url = `api/user/staff/${userId}`;
    } else {
      url = "api/user/staff";
    }

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_API_URL}${url}`,
        headers
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const staffListSlice = createSlice({
  name: "get/staff",
  initialState: {
    isLoading: false,
    staff_data: [],
  } as StaffListState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(staffListRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        staffListRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload?.success) {
            state.staff_data = action.payload.payload;
          }

          state.isLoading = false;
        }
      )
      .addCase(staffListRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default staffListSlice.reducer;
