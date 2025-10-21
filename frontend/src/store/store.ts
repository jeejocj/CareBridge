import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/authSlice";
import tokenReducer from "./slices/tokenSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,   
    token: tokenReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
