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
  expensesList: any;
  customerList: any;
  expensePriceMin: any;
  expensePriceMax: any;
  expenseDownload: any;
  filterCount: number;
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
  expensesList: [],
  customerList: [],
  expensePriceMin: null,
  expensePriceMax: null,
  expenseDownload: "",
  filterCount: 0,
};

export const expenseListSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    updateExpense: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetExpense: (state, action: any) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateExpense, resetExpense }: any = expenseListSlice.actions;

export default expenseListSlice.reducer;
