import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SignupState {
  fullName: string;
  mobileNumber: number | null;
  email: string;
  password: string;
  confirmPassword: string;
  termAndCondition: boolean;
  countryCode: string;
}

const initialState: SignupState = {
  fullName: "",
  mobileNumber: null,
  email: "",
  password: "",
  confirmPassword: "",
  termAndCondition: false,
  countryCode: "91",
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateSignup: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    resetStateOfSignup: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSignup, resetStateOfSignup }: any = signupSlice.actions;
export default signupSlice.reducer;
