import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/http.module";
import { IGameState, Loading } from "../../types/global.typing";
import { IGame } from "../../types/game.typing";

export const CreateGame = createAsyncThunk("game/CreateGame", async () => {
  const body = {
    GameStatus: 0,
    IsPrivate: false,
    ChatId: 0,
    FieldId: 0,
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
    const gameId = game.Id;
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
  Data: null,
  Status: Loading.Idle,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGameState: (state, action) => {
      state.Data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateGame.pending, (state) => {
        state.Status = Loading.Loading;
        state.Data = null;
      })
      .addCase(CreateGame.fulfilled, (state, action) => {
        state.Status = Loading.Loaded;
        state.Data = action.payload;
      })
      .addCase(CreateGame.rejected, (state) => {
        state.Status = Loading.Error;
        state.Data = null;
      })
      .addCase(GetOpenGames.pending, (state) => {
        state.Status = Loading.Loading;
        state.Data = null;
      })
      .addCase(GetOpenGames.fulfilled, (state, action) => {
        state.Status = Loading.Loaded;
        state.Data = action.payload;
      })
      .addCase(GetOpenGames.rejected, (state) => {
        state.Status = Loading.Error;
        state.Data = null;
      })
      .addCase(JoinToGame.pending, (state) => {
        state.Status = Loading.Loading;
        state.Data = null;
      })
      .addCase(JoinToGame.fulfilled, (state, action) => {
        state.Status = Loading.Loaded;
        state.Data = action.payload;
      })
      .addCase(JoinToGame.rejected, (state) => {
        state.Status = Loading.Error;
        state.Data = null;
      });
  },
});
export const { updateGameState } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
