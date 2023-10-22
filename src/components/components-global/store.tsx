'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  unReadNotifications: undefined,
};

export const ppmntSlice = createSlice({
  name: "ppmnt",
  initialState,
  reducers: {
    setUnReadNotifications: (state: any, action: PayloadAction<any>) => { 
      state.unReadNotifications = action.payload.unReadNotifications;
    },
  },
});

export const {
  setUnReadNotifications
} = ppmntSlice.actions;

export default ppmntSlice.reducer