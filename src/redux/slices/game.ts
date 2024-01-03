import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/http.module";
import { IGameState, Loading } from "../../types/global.typing";
import { IGame, IGameId } from "../../types/game.typing";

export const CreateGame = createAsyncThunk("game/CreateGame", async () => {
  const body = {
    gameStatus: 0,
    isPrivate: false,
    chatId: 0,
    fieldId: 0,
  };
  const token = window.localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { data } = await axios.post(
    `api/Game/CreateGame`,
    { body },
    { headers }
  );
  return data;
});

export const GetOpenGames = createAsyncThunk("game/GetOpenGames", async () => {
  const token = window.localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { data } = await axios.get(`api/Game/GetOpenGames`, {
    headers,
  });
  return data;
});

export const JoinToGame = createAsyncThunk(
  "game/JoinToGame",
  async ({ game }: { game: IGame }) => {
    const gameId = game.id;
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(game);
    const { data } = await axios.post(
      `api/Game/JoinToGame`,
      { gameId },
      { headers }
    );
    return data;
  }
);

const initialState: IGameState = {
  data: null,
  status: Loading.Idle,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateGame.pending, (state) => {
        state.status = Loading.Loading;
        state.data = null;
      })
      .addCase(CreateGame.fulfilled, (state, action) => {
        state.status = Loading.Loaded;
        state.data = action.payload;
      })
      .addCase(CreateGame.rejected, (state) => {
        state.status = Loading.Error;
        state.data = null;
      })
      .addCase(GetOpenGames.pending, (state) => {
        state.status = Loading.Loading;
        state.data = null;
      })
      .addCase(GetOpenGames.fulfilled, (state, action) => {
        state.status = Loading.Loaded;
        state.data = action.payload;
      })
      .addCase(GetOpenGames.rejected, (state) => {
        state.status = Loading.Error;
        state.data = null;
      })
      .addCase(JoinToGame.pending, (state) => {
        state.status = Loading.Loading;
        state.data = null;
      })
      .addCase(JoinToGame.fulfilled, (state, action) => {
        state.status = Loading.Loaded;
        state.data = action.payload;
      })
      .addCase(JoinToGame.rejected, (state) => {
        state.status = Loading.Error;
        state.data = null;
      });
  },
});
export const gameReducer = gameSlice.reducer;
