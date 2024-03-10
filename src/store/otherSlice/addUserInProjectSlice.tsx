import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  // other properties
}

interface AddUserInProjectState {
  selectedUsers: User[];
}

const initialState: AddUserInProjectState = {
  selectedUsers: [],
};

const addUserInProjectSlice = createSlice({
  name: "addUserInProjectSlice",
  initialState,
  reducers: {
    toggleSelectUser: (state, action: PayloadAction<User>) => {
      const toggledUser = action.payload;
      const isUserInFavorites = state.selectedUsers.some(
        (user) => user.id === toggledUser.id
      );

      try {
        if (isUserInFavorites) {
          const filteredUsers = state.selectedUsers.filter(
            (user) => user.id !== toggledUser.id
          );

          // Update state with filtered users
          state.selectedUsers = filteredUsers;
        } else {
          // Check if the user is already in the selectedUsers array
          const isUserAlreadySelected = state.selectedUsers.some(
            (user) => user.id === toggledUser.id
          );

          if (!isUserAlreadySelected) {
            // Update state with added user
            state.selectedUsers.push(toggledUser);
          }
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    },
  },
});

export default addUserInProjectSlice.reducer;
export const { toggleSelectUser } = addUserInProjectSlice.actions;
