import { createSlice } from "@reduxjs/toolkit";
import { IGameState, Loading } from "../../types/global.typing";

const initialState: IGameState = {
  data: null,
  status: Loading.Idle,
};

const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(CreateGame.pending, (state) => {
  //         state.status = Loading.Loading;
  //         state.data = null;
  //       })
  //       .addCase(CreateGame.fulfilled, (state, action) => {
  //         state.status = Loading.Loaded;
  //         state.data = action.payload;
  //       })
  //       .addCase(CreateGame.rejected, (state) => {
  //         state.status = Loading.Error;
  //         state.data = null;
  //       });
  //   },
});
export const wsReducer = wsSlice.reducer;
