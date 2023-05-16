import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
    globalLoader: boolean;
}

const initialState: CounterState = {
    globalLoader: false
};

export const globalLoaderSlice = createSlice({
    name: "globalLoader",
    initialState,
    reducers: {
        updateGlobalLoader: (state, action: PayloadAction<boolean>) => {
            state.globalLoader = action.payload;
        },

    },
});

// Action creators are generated for each case reducer function
export const { updateGlobalLoader }: any = globalLoaderSlice.actions;
export default globalLoaderSlice.reducer;
