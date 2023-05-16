import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RoalState {
  limit: number;
  page: number;
  search: string;
  fromDate: any;
  toDate: any;
  sort_type: any;
  sort_key: string;
  sort_key_member: string;
  roleId: string;
  status: string;
  roleList: Array<any>;
  roleDetail: any;
  membersList: Array<any>;
  roleFilter: boolean;
  memberFilter: boolean;
  rollFilterCount: number;
  memberFilterCount: number;
  memberDetail: any;
}

const initialState: RoalState = {
  limit: 10,
  page: 1,
  search: "",
  fromDate: "",
  toDate: "",
  sort_type: "-1",
  sort_key: "createdAt",
  sort_key_member: "createdAt",
  roleId: "",
  status: "",
  roleList: [],
  roleDetail: {},
  membersList: [],
  roleFilter: false,
  memberFilter: false,
  rollFilterCount: 0,
  memberFilterCount: 0,
  memberDetail: {},
};

export const teamManagement = createSlice({
  name: "productServices",
  initialState,
  reducers: {
    updateTeamManagement: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    resetTeamManagement: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTeamManagement, resetTeamManagement }: any =
  teamManagement.actions;

export default teamManagement.reducer;
