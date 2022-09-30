import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginRes } from "../apis/auth/types";
const tokens={
  access:{
    expires:"",
    token : ""
  },
  refresh:{
    expires:"",
    token : ""
  }
}
const authSlice = createSlice({
  name: "auth",
  initialState: {
    tokens:{
      access:{
        expires:"",
        token : ""
      },
      refresh:{
        expires:"",
        token : ""
      }
    },
    user: null,
  } as loginRes,
  reducers: {
    setCurrentAuth: (state, { payload }: PayloadAction<loginRes | null>) => {
      state.user = payload?.user || null;
      state.tokens = payload?.tokens || tokens
  }
}
});

export default authSlice;
export const { setCurrentAuth } = authSlice.actions;
