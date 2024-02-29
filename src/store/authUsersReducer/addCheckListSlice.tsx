import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface AddCheckListData {
  name: string;
  project_id: string;
  description: string;
  status_id: string;
  start_date: string;
  end_date: string;
  image: FileList;
  user_ids: string[];
}

interface AddCheckListState {
  isLoading: boolean;
}

export const addTaskRequest = createAsyncThunk(
  "add_task",
  async (data: AddCheckListData, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    let headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_API_URL}api/store/checklist`,
        headers
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const addTaskSlice = createSlice({
  name: "add_task",
  initialState: {
    isLoading: false,
  } as AddCheckListState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addTaskRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addTaskRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          // if (action.payload?.success) {

          // }

          state.isLoading = false;
        }
      )
      .addCase(addTaskRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addTaskSlice.reducer;
