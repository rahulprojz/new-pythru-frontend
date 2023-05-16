import { createSlice } from "@reduxjs/toolkit";

export interface EmailPostVerfication {
data: any
}

const initialState: EmailPostVerfication = {
  data :[]
};

export const emailPostVerficationSlice = createSlice({
  name: "salepurchase",
  initialState,
  reducers: {
    updateEmailPostVerification: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetEmailPostVerification: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateEmailPostVerification, resetEmailPostVerification }: any =
emailPostVerficationSlice.actions;

export default emailPostVerficationSlice.reducer;
