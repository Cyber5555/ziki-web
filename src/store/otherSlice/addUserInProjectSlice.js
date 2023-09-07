import { createSlice } from "@reduxjs/toolkit";

const addUserInProjectSlice = createSlice({
  name: "addUserInProjectSlice",
  initialState: {
    selectedUsers: [],
  },
  reducers: {
    toggleSelectUser: (state, action) => {
      const userId = action.payload;
      const selectedIndex = state.selectedUsers.indexOf(userId);

      if (selectedIndex === -1) {
        state.selectedUsers.push(userId);
      } else {
        state.selectedUsers.splice(selectedIndex, 1);
      }
    },
  },
});
export default addUserInProjectSlice.reducer;
export const { toggleSelectUser } = addUserInProjectSlice.actions;
