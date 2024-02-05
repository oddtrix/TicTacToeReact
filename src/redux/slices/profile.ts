import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserId } from "../../types/user.typing";
import axios from "../../helpers/http.module";
import { IUserState, Loading } from "../../types/global.typing";

export const GetProfile = createAsyncThunk(
  "profile/GetProfile",
  async ({ userId }: { userId: IUserId }) => {
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
    console.log(data);
    return data;
  }
);

const initialState: IUserState = {
  Data: null,
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
      });
  },
});
export const selectorIsAuth = () =>
  window.localStorage.getItem("token") === null ? false : true;
export const profileReducer = profileSlice.reducer;
