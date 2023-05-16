import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface assetState {
  limit: number;
  page: number;
  search: string;
  sort_key: string;
  sort_type: string;

  fromAmount: string;
  toAmount: string;
  fromDate: string;
  toDate: string;
  purchaseFromDate: string;
  purchaseToDate: string;

  assetList: Array<any>;
  totalCount: number | null;
  totalPage: number | null;
  assetDetail: any;
  editAsset: boolean;
  minAmount?: number | null;
  maxAmount?: number | null;
}

const initialState: assetState = {
  limit: 10,
  page: 1,
  search: "",
  sort_type: "-1",
  sort_key: "createdAt",
  fromAmount: "",
  toAmount: "",
  fromDate: "",
  toDate: "",
  purchaseFromDate: "",
  purchaseToDate: "",
  assetList: [],
  totalCount: 0,
  totalPage: 0,
  assetDetail: {},
  editAsset: false,
};

export const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    updateAsset: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetAsset: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAsset, resetAsset }: any = assetSlice.actions;

export default assetSlice.reducer;
