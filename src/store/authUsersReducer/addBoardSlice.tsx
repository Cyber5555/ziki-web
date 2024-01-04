import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface AddBoardData {
  newBoardName: string;
  board_id: string;
}

interface AddBoardState {
  isLoading: boolean;
}

export const addBoardRequest = createAsyncThunk(
  "add_board",
  async (data: AddBoardData, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    let form_data = new FormData();
    form_data.append("name", data.newBoardName);
    form_data.append("project_id", data.board_id);

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/store/status`,
        headers,
        form_data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const addBoardSlice = createSlice({
  name: "add_board",
  initialState: {
    isLoading: false,
  } as AddBoardState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addBoardRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addBoardRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          // if (action.payload?.success) {

          // }

          state.isLoading = false;
        }
      )
      .addCase(addBoardRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addBoardSlice.reducer;
