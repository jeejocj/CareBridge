import { createSlice,type  PayloadAction } from "@reduxjs/toolkit";
import { type UserData } from "@/types/auth";

interface UserState {
  userData?: UserData | null;
}

const initialState: UserState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    removeUser: (state) => {
      state.userData = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
