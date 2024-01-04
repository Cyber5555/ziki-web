import { createSlice } from "@reduxjs/toolkit";

interface OpenAsideState {
  isOpenAside: boolean;
}

const initialState: OpenAsideState = {
  isOpenAside: false,
};

const openAsideSlice = createSlice({
  name: "toggle_aside",
  initialState,
  reducers: {
    toggleAside: (state) => {
      state.isOpenAside = !state.isOpenAside;
    },
  },
});

export default openAsideSlice.reducer;
export const { toggleAside } = openAsideSlice.actions;
