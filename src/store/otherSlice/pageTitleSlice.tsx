import { createSlice } from "@reduxjs/toolkit";

interface PageTitleState {
  page_title: string;
  title: string;
}

const initialState: PageTitleState = {
  page_title: "",
  title: "",
};

const pageTitleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    changeTitle: (state, action) => {
      state.page_title = action.payload.title;
    },
  },
});

export default pageTitleSlice.reducer;
export const { changeTitle } = pageTitleSlice.actions;
