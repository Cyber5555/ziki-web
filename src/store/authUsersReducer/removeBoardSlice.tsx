import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface RemoveBoardData {
  boardId: string;
  payload: any;
}

interface RemoveBoardState {
  isLoadingRemove: boolean;
  error: any;
  removedStatus: string;
}

const initialState: RemoveBoardState = {
  isLoadingRemove: false,
  error: null,
  removedStatus: "",
};

export const removeBoardRequest = createAsyncThunk<
  RemoveBoardData[],
  { boardId: string }
>("remove_board", async (boardId, { rejectWithValue }) => {
  const token = localStorage.getItem("userToken");
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await Http.delete(
      `${process.env.REACT_APP_API_URL}api/destroy/status/${boardId}`,
      headers
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const removeBoardSlice = createSlice({
  name: "remove_board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeBoardRequest.pending, (state) => {
        state.isLoadingRemove = true;
      })
      .addCase(
        removeBoardRequest.fulfilled,
        (state, action: PayloadAction<RemoveBoardData[]>) => {
          state.isLoadingRemove = false;
          const firstItemPayload = action.payload[0]?.payload;
          state.removedStatus = firstItemPayload || "";
        }
      )
      .addCase(removeBoardRequest.rejected, (state, action) => {
        state.isLoadingRemove = false;
        state.error = action.payload;
      });
  },
});

export default removeBoardSlice.reducer;
