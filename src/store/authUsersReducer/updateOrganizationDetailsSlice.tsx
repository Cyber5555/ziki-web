import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface UpdateOrganizationDetailsState {
  isLoading: boolean;
  // staff_data: any[];
}

interface UpdateOrganizationDetailsData {
  logo: any;
  name: string;
}

export const updateOrganizationDetailsRequest = createAsyncThunk(
  "update/details/organizations",
  async (data: UpdateOrganizationDetailsData, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const form_data = new FormData();

    if (data.logo) {
      alert(data.logo);
      form_data.append("logo", data.logo);
    }
    if (data.name) {
      form_data.append("name", data.name);
    }

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/update/organization`,
        headers,
        form_data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const updateOrganizationDetailsSlice = createSlice({
  name: "update/details/organizations",
  initialState: {
    isLoading: false,
    // staff_data: [],
  } as UpdateOrganizationDetailsState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateOrganizationDetailsRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateOrganizationDetailsRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          // if (action.payload?.success) {
          //    state.staff_data = action.payload.payload;
          // }

          state.isLoading = false;
        }
      )
      .addCase(updateOrganizationDetailsRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default updateOrganizationDetailsSlice.reducer;
