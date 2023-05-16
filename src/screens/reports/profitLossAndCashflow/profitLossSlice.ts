import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface profitLossState {
  toDate: string;
  fromDate: string;
  profitLossList: any;
}

const initialState: profitLossState = {
  fromDate: "",
  toDate: "",
  profitLossList: {},
};

export const profitLossSlice = createSlice({
  name: "profitLoss",
  initialState,
  reducers: {
    updateProfitLoss: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetProfitLoss: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProfitLoss, resetProfitLoss }: any = profitLossSlice.actions;

export default profitLossSlice.reducer;
