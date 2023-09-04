import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./authSystemReducer/loginSlice";
import getAllProjectsSlice from "./authUsersReducer/getAllProjectsSlice";
import addProjectSlice from "./authUsersReducer/addProjectSlice";

const rootReducer = combineReducers({
  loginSlice: loginSlice,
  getAllProjectsSlice: getAllProjectsSlice,
  addProjectSlice: addProjectSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
