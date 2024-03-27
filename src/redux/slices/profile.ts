import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IId } from "../../types/global.typing";
import axios from "../../helpers/http.module";
import { IUserState, Loading } from "../../types/global.typing";

export const GetProfile = createAsyncThunk(
  "profile/GetProfile",
  async ({ userId }: { userId: IId }) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`api/Players/GetById/${userId.Id}`, {
      headers,
    });
    return data;
  }
);

export const GetAllPlayers = createAsyncThunk(
  "profile/GetAllPlayers",
  async () => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`api/Players/GetAll`, {
      headers,
    });
    return data;
  }
);

export const GetPlayerHistory = createAsyncThunk(
  "profile/GetPlayerHistory",
  async ({ userId }: { userId: IId }) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`api/Players/History/${userId.Id}`, {
      headers,
    });
    return data;
  }
);

const initialState: IUserState = {
  Data: null,
  History: null,
  Status: Loading.Idle,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProfile.pending, (state) => {
        state.Status = Loading.Loading;
        state.Data = null;
      })
      .addCase(GetProfile.fulfilled, (state, action) => {
        state.Status = Loading.Loaded;
        state.Data = action.payload;
      })
      .addCase(GetProfile.rejected, (state) => {
        state.Status = Loading.Error;
        state.Data = null;
      })
      .addCase(GetAllPlayers.pending, (state) => {
        state.Status = Loading.Loading;
        state.Data = null;
      })
      .addCase(GetAllPlayers.fulfilled, (state, action) => {
        state.Status = Loading.Loaded;
        state.Data = action.payload;
      })
      .addCase(GetAllPlayers.rejected, (state) => {
        state.Status = Loading.Error;
        state.Data = null;
      })
      .addCase(GetPlayerHistory.pending, (state) => {
        state.Status = Loading.Loading;
        state.History = null;
      })
      .addCase(GetPlayerHistory.fulfilled, (state, action) => {
        state.Status = Loading.Loaded;
        state.History = action.payload;
      })
      .addCase(GetPlayerHistory.rejected, (state) => {
        state.Status = Loading.Error;
        state.History = null;
      });
  },
});
export const selectorIsAuth = () =>
  window.localStorage.getItem("token") === null ? false : true;
export const profileReducer = profileSlice.reducer;
