import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface productState {
  type: any;
  limit: number;
  page: number;
  search: string;
  fromDate: any;
  toDate: any;
  sort_type: any;
  sort_key: string;
  productServiceList: any;
  productServicesCategory: Array<any>;
  salesUnit: Array<any>;
  queryFor: string;
  SearchFor: string;
  imageUrl: string;
  sacCodeList: Array<any>;
  hsnCodeList: Array<any>;
  gstRate: Array<any>;
  salesPriceMin: any;
  salesPriceMax: any;
  typeOfCOA: any;
  incomeCategory: Array<any>;
  expenseCategory: Array<any>;
  editProductData: any;
  fromSalePrice: any;
  toSalePrice: any;
  productServiceDetail: any;
  categories: any;
  lowStock: any;
  outOfStock: any;
  lowStockFilter: any;
  outOfStockFilter: any;
  status: string;
  fileUrl: string;
}

const initialState: productState = {
  type: "1",
  limit: 10,
  page: 1,
  search: "",
  fromDate: "",
  fromSalePrice: "",
  toSalePrice: "",
  toDate: "",
  categories: "",
  sort_type: "-1",
  sort_key: "createdAt",
  productServiceList: [],
  productServicesCategory: [],
  queryFor: "",
  SearchFor: "",
  salesUnit: [],
  hsnCodeList: [],
  sacCodeList: [],
  gstRate: [],
  imageUrl: "",
  salesPriceMin: null,
  salesPriceMax: null,
  typeOfCOA: "",
  incomeCategory: [],
  expenseCategory: [],
  editProductData: "",
  productServiceDetail: {},
  lowStock: 0,
  outOfStock: 0,
  lowStockFilter: "",
  outOfStockFilter: "",
  status: "",
  fileUrl: "",
};

export const productServicesSlice = createSlice({
  name: "productServices",
  initialState,
  reducers: {
    updateProductAndServices: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetProductServices: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProductAndServices, resetProductServices }: any =
  productServicesSlice.actions;

export default productServicesSlice.reducer;
