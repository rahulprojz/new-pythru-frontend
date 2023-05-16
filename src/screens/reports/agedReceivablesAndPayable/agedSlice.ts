import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface expenseState {
  type: any;
  limit: number;
  page: number;
  search: string;
  fromDate: any;
  toDate: any;
  transFromDate: any;
  transEndDate: any;
  sort_type: any;
  sort_key: string;
  fromAmount: string;
  toAmount: string;
  categories: any;
  createdAt: string;
  status: any;
  tableList: any;
  customerList: any;
  expensePriceMin: any;
  expensePriceMax: any;
  expenseDownload: any;
  filterCount: number;
  documentType: any;
}

const initialState: expenseState = {
  type: "1",
  limit: 10,
  page: 1,
  search: "",
  fromDate: "",
  toDate: "",
  transFromDate: "",
  transEndDate: "",
  sort_type: "-1",
  sort_key: "createdAt",
  toAmount: "",
  fromAmount: "",
  categories: "",
  status: "",
  createdAt: "",
  tableList: [],
  customerList: [],
  expensePriceMin: null,
  expensePriceMax: null,
  expenseDownload: "",
  filterCount: 0,
  documentType: 3,
};

export const agedPayableSlice = createSlice({
  name: "payableAdged",
  initialState,
  reducers: {
    updateAged: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetAdged: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAged, resetAdged } : any= agedPayableSlice.actions;

export default agedPayableSlice.reducer;
