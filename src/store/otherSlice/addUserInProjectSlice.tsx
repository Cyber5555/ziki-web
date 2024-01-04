import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddUserInProjectState {
  selectedUsers: string[]; // Adjust the type based on the type of your user IDs
}

const initialState: AddUserInProjectState = {
  selectedUsers: [],
};

const addUserInProjectSlice = createSlice({
  name: "addUserInProjectSlice",
  initialState,
  reducers: {
    toggleSelectUser: (state, action: PayloadAction<string>) => {
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
