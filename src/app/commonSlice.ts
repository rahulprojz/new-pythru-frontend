import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface customerState {
  chartOfAccountMasterData: Array<any>;
  state: Array<any>;
  citiesList: any;
  permissions: any;
  ipAddress: string;
}

const initialState: customerState = {
  chartOfAccountMasterData: [],
  state: [],
  permissions: "",
  citiesList: [],
  ipAddress: "",
};

export const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    updateCommonData: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetCustomer: (state, action: any) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCommonData, resetCustomer }: any = commonSlice.actions;

export default commonSlice.reducer;
