import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { profileReducer } from "./slices/profile";
import { gameReducer } from "./slices/game";
import { wsReducer } from "./slices/ws";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    game: gameReducer,
    ws: wsReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;