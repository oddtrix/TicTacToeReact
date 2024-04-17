import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/http.module";
import { IGameState, IId, Loading } from "../../types/global.typing";
import { updatedGameState } from "../../helpers/singnalrGameService";

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
  async ({ Id }: { Id: IId }) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.post(
      `api/Game/JoinToGame`,
      { Id },
      { headers }
    );
    return data;
  }
);

export const MakeMove = createAsyncThunk(
  "game/MakeMove",
  async ({ gameId, fieldId, fieldMovesId, playerId, index } : { gameId: IId, fieldId: IId, fieldMovesId: IId, playerId: IId, index: number }) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.post(
      `api/Game/MakeMove`,
      { gameId, fieldId, fieldMovesId, playerId, index },
      { headers }
    );

    await updatedGameState(data.Id, data)
    return data;
  }
);

export const SetWinner = createAsyncThunk(
  "game/SetWinner",
  async ({ winnerId, loserId, gameId } : { winnerId : IId, loserId : IId, gameId: IId }) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.post(
      `api/Game/SetWinner`,
      { winnerId, loserId, gameId },
      { headers }
    );
    return data;
  }
);

export const SetDraw = createAsyncThunk(
  "game/SetDraw",
  async ({ Id } : { Id: IId }) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.post(
      `api/Game/SetDraw`,
      { Id },
      { headers }
    );
    return data;
  }
);

export const SendMessage = createAsyncThunk(
  "game/SendMessage",
  async ({ gameId, messageBody, chatId, playerId } : { gameId: IId, messageBody: string, chatId: IId, playerId: IId, }) => {
    const token = window.localStorage.getItem("token");
    const Id = gameId
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.post(
      `api/Game/SendMessage`,
      { Id, messageBody, chatId, playerId },
      { headers }
    );

    await updatedGameState(data.Id, data)
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
      state.Status = action.payload.GameStatus
      state.Data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateGame.pending, (state) => {
        state.Status = Loading.Idle;
        state.Data = null;
      })
      .addCase(CreateGame.fulfilled, (state, action) => {
        state.Status = Loading.Loading;
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
      })
      .addCase(MakeMove.pending, (state) => {
        state.Status = Loading.Loading;
        state.Data = null;
      })
      .addCase(MakeMove.fulfilled, (state, action) => {
        state.Status = Loading.Loaded;
        state.Data = action.payload;
      })
      .addCase(MakeMove.rejected, (state) => {
        state.Status = Loading.Error;
        state.Data = null;
      })
      .addCase(SetWinner.pending, (state) => {
        state.Status = Loading.Loading;
        state.Data = null;
      })
      .addCase(SetWinner.fulfilled, (state, action) => {
        state.Status = Loading.Loaded;
        state.Data = action.payload;
      })
      .addCase(SetWinner.rejected, (state) => {
        state.Status = Loading.Error;
        state.Data = null;
      })
      .addCase(SetDraw.pending, (state) => {
        state.Status = Loading.Loading;
        state.Data = null;
      })
      .addCase(SetDraw.fulfilled, (state, action) => {
        state.Status = Loading.Loaded;
        state.Data = action.payload;
      })
      .addCase(SetDraw.rejected, (state) => {
        state.Status = Loading.Error;
        state.Data = null;
      })
      .addCase(SendMessage.pending, (state) => {
        state.Status = Loading.Loading;
        state.Data = null;
      })
      .addCase(SendMessage.fulfilled, (state, action) => {
        state.Status = Loading.Loaded;
        state.Data = action.payload;
      })
      .addCase(SendMessage.rejected, (state) => {
        state.Status = Loading.Error;
        state.Data = null;
      });
  },
});
export const { updateGameState } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
