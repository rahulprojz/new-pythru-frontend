import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Alert } from "../utils";
import rootReducer from "./root.reducer";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
const checkInternet = (store: any) => (next: any) => (action: any) => {
  if (!navigator.onLine) {
    return;
  } else {
    next(action);
  }
};
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger, checkInternet],
});
