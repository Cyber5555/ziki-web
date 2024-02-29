import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";



interface OrganizationDetailsState {
  isLoading: boolean;
  organization_data: any[];
}

export const organizationDetailsRequest = createAsyncThunk(
  "organization/details",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_API_URL}api/organization/details`,
        headers
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const organizationDetailsSlice = createSlice({
  name: "organization/details",
  initialState: {
    isLoading: false,
    organization_data: [],
  } as OrganizationDetailsState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(organizationDetailsRequest.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(
        organizationDetailsRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload?.success) {
            state.organization_data = action.payload.payload;
          }

          state.isLoading = false;
        }
      )

      .addCase(organizationDetailsRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default organizationDetailsSlice.reducer;
