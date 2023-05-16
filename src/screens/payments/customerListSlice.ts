import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface customerState {
  type: any;
  limit: number;
  page: number;
  search: string;
  fromDate: any;
  toDate: any;
  fromAmount: any;
  toAmount: any;
  sort_type: any;
  sort_key: string;
  userId: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  isCustomerVendor: number;
  status: string;
  state: string;
  createdAt: string;
  customersList: any;
  stateList: any;
  imageUrl: string;
  citiesList: any;
  shippingCitiesList: any;
  customerDetails: any;
  duePriceMin: any;
  duePriceMax: any;
  filterCount: number;
  customerTransactionType: any;
}

const initialState: customerState = {
  type: "1",
  limit: 10,
  page: 1,
  search: "",
  fromDate: "",
  toDate: "",
  fromAmount: "",
  toAmount: "",
  sort_type: "-1",
  sort_key: "createdAt",
  userId: "",
  displayName: "",
  phoneNumber: "",
  email: "",
  isCustomerVendor: 1,
  status: "",
  createdAt: "",
  customersList: [],
  stateList: [],
  state: "",
  imageUrl: "",
  citiesList: [],
  shippingCitiesList: [],
  customerDetails: {},
  duePriceMin: 0,
  duePriceMax: 1000,
  filterCount: 0,
  customerTransactionType: 0,
};

export const customerListSlice = createSlice({
  name: "customerList",
  initialState,
  reducers: {
    updateCustomer: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetCustomer: (state, action: any) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCustomer, resetCustomer }: any = customerListSlice.actions;

export default customerListSlice.reducer;
