import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface generalAndTrail {
  toDate: string;
  fromDate: string;
  generalAndTrailList: any;
  selectedCategories: any;
  filterCount: number;
}

const initialState: generalAndTrail = {
  fromDate: "",
  toDate: "",
  generalAndTrailList: [],
  selectedCategories: [],
  filterCount: 0,
};

export const generalAndTrail = createSlice({
  name: "generalAndTrail",
  initialState,
  reducers: {
    updateGeneralAndTrail: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetGeneralAndTrail: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateGeneralAndTrail, resetGeneralAndTrail } : any=
  generalAndTrail.actions;

export default generalAndTrail.reducer;
