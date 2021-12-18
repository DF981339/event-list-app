import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
