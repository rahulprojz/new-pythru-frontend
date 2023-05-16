import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  email: any;
  token: string;
}

const initialState: CounterState = {
  email: "",
  token: "",
};

export const forgotPasswordSlice = createSlice({
  name: "forgotEmail",
  initialState,
  reducers: {
    userEmailOrPhone: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userEmailOrPhone,updateToken }: any = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
