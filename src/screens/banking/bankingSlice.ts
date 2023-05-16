import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export interface bankingState {
  list: Array<[]>;
  page: number;
  iframeUrl: any;
  userAccountList: Array<[]>;
  userTransactionList: Array<[]>;
  userBalance: any;
  userNewBalance: any;
  limit: number;
  totalCount: number | null;
  totalPage: number | null;
  search: string;
  sort_key: string;
  sort_type: string | null;
  fromDate: any;
  toDate: any;
  addBankAccountType: any;
  transactionId: any;
}
var date = new Date();
const initialState: bankingState = {
  list: [],
  page: 1,
  iframeUrl: "",
  userAccountList: [],
  userTransactionList: [],
  userBalance: "****",
  userNewBalance: "****",
  limit: 200,
  totalCount: 0,
  totalPage: 0,
  search: "",
  sort_type: "-1",
  sort_key: "createdAt",
  fromDate: new Date(date.getFullYear(), date.getMonth(), 1),
  toDate: new Date(),
  addBankAccountType: "",
  transactionId: "",
};

export const bankingSlice: any = createSlice({
  name: "banking",
  initialState,
  reducers: {
    updateBanking: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetBanking: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBanking, resetBanking }: any = bankingSlice.actions;

export default bankingSlice.reducer;
