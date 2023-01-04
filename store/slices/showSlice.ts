import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

// Define a type for the slice state
export interface initState {
  isSideBar?: boolean;
}
// Define the initial state using that type
const initialState: initState = {
  isSideBar: true,
};

export const showSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBar = !state.isSideBar;
      return state;
    },
  },
});

export const { toggleSideBar } = showSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectIsSideBar = (state: RootState) => state.showSlice.isSideBar;

export default showSlice.reducer;
