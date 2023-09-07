import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./authSystemReducer/loginSlice";
import getAllProjectsSlice from "./authUsersReducer/getAllProjectsSlice";
import addProjectSlice from "./authUsersReducer/addProjectSlice";
import addUserInProjectSlice from "./otherSlice/addUserInProjectSlice";
import getAllUsersSlice from "./authUsersReducer/getAllUsersSlice";
import getProjectColumnSlice from "./authUsersReducer/getProjectColumnSlice";

const rootReducer = combineReducers({
  loginSlice: loginSlice,
  getAllProjectsSlice: getAllProjectsSlice,
  addProjectSlice: addProjectSlice,
  addUserInProjectSlice: addUserInProjectSlice,
  getAllUsersSlice: getAllUsersSlice,
  getProjectColumnSlice: getProjectColumnSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
