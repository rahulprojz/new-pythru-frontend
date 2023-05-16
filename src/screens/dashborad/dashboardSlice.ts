import { createSlice } from "@reduxjs/toolkit";

export interface dashboardState {
  invoiceChartData: any;
  billChartData: any;
  customer: number;
  vendor: number;
  invoiceFooterData: any;
  billFooterData: any;
  profitLosseData: any;

  reloadDashboard: boolean
}

const initialState: dashboardState = {
  invoiceChartData: {},
  billChartData: {},
  customer: 1,
  vendor: 1,
  invoiceFooterData: [],
  billFooterData: [],
  profitLosseData: {},
  reloadDashboard: false
};

export const dashboardListSlice = createSlice({
  name: "dashboardList",
  initialState,
  reducers: {
    updatedashboard: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetdashboard: (state, action: any) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatedashboard, resetdashboard }: any = dashboardListSlice.actions;

export default dashboardListSlice.reducer;
