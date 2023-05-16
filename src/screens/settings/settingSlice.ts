import { createSlice } from "@reduxjs/toolkit";

export interface settingState {
  productServicesCategory: Array<any>;
  type: any;
  limit: any;
  page: any;
  search: any;
  sort_type: any;
  sort_key: any;
  totalCount: any;
  totalPages: any;
  filterState: any;
  editData: any;
  filterCount: any;
  categories: any;
  changePasswordDrawer: any;
  organizationDeatil: any;
}

let initialState: settingState = {
  productServicesCategory: [],
  type: "1",
  limit: 10,
  page: 1,
  search: "",
  sort_type: "-1",
  sort_key: "categoryName",
  totalCount: 0,
  totalPages: 0,
  filterState: false,
  editData: null,
  filterCount: 0,
  categories: [],
  changePasswordDrawer: false,
  organizationDeatil: null,
};
export const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettingsState: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetSettings: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSettingsState, resetSettings }: any = settingSlice.actions;

export default settingSlice.reducer;
