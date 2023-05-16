import { createSlice } from "@reduxjs/toolkit";

export interface notificationListState {
  notificationList: any;
  notificationCount: number;
}

const initialState: notificationListState = {
  notificationList: [],
  notificationCount: 0,
};

export const notificationSlice = createSlice({
  name: "notificationList",
  initialState,
  reducers: {
    updatenotificationList: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetnotificationList: () => {
      return initialState;
    },
  },
});

export const { updatenotificationList, resetnotificationList }: any =
  notificationSlice.actions;

export default notificationSlice.reducer;
