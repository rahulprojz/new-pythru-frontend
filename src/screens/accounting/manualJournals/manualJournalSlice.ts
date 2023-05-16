import { createSlice } from "@reduxjs/toolkit";

export interface manualJournalState {
  limit: number;
  page: number;
  ///search: string | null;
  sort_key: string;
  sort_type: string | null;
  fromDate: string | null;
  toDate: string | null;
  debitCategoryId: string;
  creditCategoryId: string;
  totalCount: number | null;
  totalPage: number | null;
  list: Array<any>;
  selectedDebitCategories: Array<any>;
  selectedCreditCategories: Array<any>;
  detail: any;
}

const initialState: manualJournalState = {
  limit: 10,
  page: 1,
  //search: null,
  sort_type: "-1",
  sort_key: "createdAt",
  fromDate: "",
  toDate: "",
  totalCount: 0,
  totalPage: 0,
  debitCategoryId: "",
  creditCategoryId: "",
  list: [],
  selectedDebitCategories: [],
  selectedCreditCategories: [],
  detail: "",
};

export const manualJournalSlice = createSlice({
  name: "manualjournal",
  initialState,
  reducers: {
    updateManualJournal: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetManualJournal: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateManualJournal, resetManualJournal }: any =
  manualJournalSlice.actions;

export default manualJournalSlice.reducer;
