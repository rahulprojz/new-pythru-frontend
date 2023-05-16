import { createSlice } from "@reduxjs/toolkit";

export interface salePurchaseState {
  type: number;
  documentType: number;
  limit: number;
  page: number;
  search: string;
  status: string;
  sort_key: string;
  sort_type: string;
  fromAmount: string;
  toAmount: string;
  fromDate: string;
  toDate: string;
  purchaseFromDate: string;
  purchaseToDate: string;
  salePurchaseList: Array<any>;
  totalCount: number | null;
  totalPage: number | null;
  salePurchaseDetail: any;
  customerList: any;
  stateList: any;
  productServiceList: any;
  isEdit: boolean;
  minAmount?: number | null;
  maxAmount?: number | null;
  documentNumber: string;
  referenceNumber: string;
  overDue: string;
  dashboardList: any;
  refList: any;
  filterCount: number;
  responseData: any;
  saleOrderEmail: Array<any>;
  customerTransactionDetail: Array<[]>;
  customerTransactionAmount: any;
  filterFromDate: string;
  filterToDate: string;
  fromDueDate: string;
  toDueDate: string;
  sequence: any;
}

const initialState: salePurchaseState = {
  type: 1,
  documentType: 1,
  limit: 10,
  page: 1,
  search: "",
  status: "",
  sort_type: "-1",
  sort_key: "createdAt",
  fromAmount: "",
  toAmount: "",
  fromDate: "",
  toDate: "",
  purchaseFromDate: "",
  purchaseToDate: "",
  salePurchaseList: [],
  customerList: [],
  stateList: [],
  productServiceList: [],
  totalCount: 0,
  totalPage: 0,
  salePurchaseDetail: {},
  isEdit: false,
  documentNumber: "",
  referenceNumber: "",
  overDue: "",
  dashboardList: [],
  filterCount: 0,
  refList: [],
  responseData: {},
  saleOrderEmail: [],
  customerTransactionDetail: [],
  customerTransactionAmount: "",
  filterFromDate: "",
  filterToDate: "",
  fromDueDate: "",
  toDueDate: "",
  sequence: 0,
};

export const salePurchaseSlice = createSlice({
  name: "salepurchase",
  initialState,
  reducers: {
    updateSalePurchase: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetSalePurchase: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSalePurchase, resetSalePurchase }: any =
  salePurchaseSlice.actions;

export default salePurchaseSlice.reducer;
