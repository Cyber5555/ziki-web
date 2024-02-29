import { combineReducers, configureStore } from "@reduxjs/toolkit";
import getAllProjectsSlice from "./authUsersReducer/getAllProjectsSlice.tsx";
import addProjectSlice from "./authUsersReducer/addProjectSlice.tsx";
import addUserInProjectSlice from "./otherSlice/addUserInProjectSlice.tsx";
import authUserDetailSlice from "./authUsersReducer/authUserDetailSlice.tsx";
import updateTaskSortSlice from "./authUsersReducer/updateTaskSortSlice.tsx";
import openAsideSlice from "./otherSlice/openAsideSlice.tsx";
import addTaskSlice from "./authUsersReducer/addTaskSlice.tsx";
import loginSlice from "./authSystemReducer/loginSlice.tsx";
import pageTitleSlice from "./otherSlice/pageTitleSlice.tsx";
import singleProjectSlice from "./authUsersReducer/singleProjectSlice.tsx";
import removeProjectSlice from "./authUsersReducer/removeProjectSlice.tsx";
import editProjectSlice from "./authUsersReducer/editProjectSlice.tsx";
import getTaskSlice from "./authUsersReducer/getTaskSlice.tsx";
import removeBoardSlice from "./authUsersReducer/removeBoardSlice.tsx";
import registerSlice from "./authSystemReducer/registerSlice.tsx";
import createCompanySlice from "./authSystemReducer/createCompanySlice.tsx";
import registerUserSlice from "./authSystemReducer/registerUserSlice.tsx";
import staffListSlice from "./authUsersReducer/staffListSlice.tsx";
import inviteUserSlice from "./authUsersReducer/inviteUserSlice.tsx";
import organizationDetailsSlice from "./authUsersReducer/organizationDetailsSlice.tsx";
import updatePasswordSlice from "./authUsersReducer/updatePasswordSlice.tsx";

const rootReducer = combineReducers({
  loginSlice,
  getAllProjectsSlice,
  addProjectSlice,
  addUserInProjectSlice,
  authUserDetailSlice,
  updateTaskSortSlice,
  addTaskSlice,
  openAsideSlice,
  pageTitleSlice,
  singleProjectSlice,
  removeProjectSlice,
  editProjectSlice,
  getTaskSlice,
  removeBoardSlice,
  registerSlice,
  createCompanySlice,
  registerUserSlice,
  staffListSlice,
  inviteUserSlice,
  organizationDetailsSlice,
  updatePasswordSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
