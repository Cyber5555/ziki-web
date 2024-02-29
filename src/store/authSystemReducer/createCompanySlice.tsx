import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface createCompanyData {
  logo: File;
  name: string;
  organization_owner_id: string;
}

interface createCompanyPayload {
  success: boolean;
  payload: {
    token: string;
    user: string;
  };
  errors?: {
    message: string;
    // Add specific error fields for each input

    name?: string;
    logo?: string;
  };
}

interface createCompanyState {
  isLoadingCreateCompany: boolean;
  isErrorCreateCompany: string;
  companyNameError: string;
  companyLogoError: string;
}

const initialState: createCompanyState = {
  isLoadingCreateCompany: false,
  isErrorCreateCompany: "",
  companyNameError: "",
  companyLogoError: "",
};

export const createCompanyRequest = createAsyncThunk<
  createCompanyPayload,
  createCompanyData
>("create_company", async (data, { rejectWithValue }) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("logo", data.logo);
  formData.append("organization_owner_id", data.organization_owner_id);

  try {
    const response = await Http.post(
      `${process.env.REACT_APP_API_URL}api/store/organization`,
      myHeaders,
      formData
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const createCompanySlice = createSlice({
  name: "create_company",
  initialState,
  reducers: {
    clearErrorCreateCompany(state) {
      state.isErrorCreateCompany = "";
      state.companyNameError = "";
      state.companyLogoError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompanyRequest.pending, (state) => {
        state.isLoadingCreateCompany = true;
        state.isErrorCreateCompany = "";
      })
      .addCase(
        createCompanyRequest.fulfilled,
        (state, action: PayloadAction<createCompanyPayload>) => {
          if (action.payload.success) {
            state.isErrorCreateCompany = "";
            state.companyLogoError = "";
            state.companyNameError = "";
          } else {
            state.isErrorCreateCompany = action.payload?.errors?.message || "";
            // Set specific errors fields for each input
            state.companyNameError = action.payload?.errors?.name || "";
            state.companyLogoError = action.payload?.errors?.logo || "";
          }

          state.isLoadingCreateCompany = false;
        }
      )
      .addCase(createCompanyRequest.rejected, (state, action) => {
        const error = (action.payload as createCompanyPayload)?.errors;

        if (error) {
          state.isErrorCreateCompany =
            error.message || "An unknown error occurred.";
          // Set specific error fields for each input

          state.companyNameError = error.name || "";
          state.companyLogoError = error.logo || "";
        } else {
          state.isErrorCreateCompany =
            "An error occurred, but no error details were provided.";
        }

        state.isLoadingCreateCompany = false;
      });
  },
});

export default createCompanySlice.reducer;
export const { clearErrorCreateCompany } = createCompanySlice.actions;
