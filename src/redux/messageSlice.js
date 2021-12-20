import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  msg: "",
  type: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setCurrMessage: (state, action) => {
      state.msg = action.payload.msg;
      state.type = action.payload.type;
    },
  },
});

export const { setCurrMessage } = messageSlice.actions;

export default messageSlice.reducer;
