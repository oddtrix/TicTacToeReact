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
    const { data } = await axios.get(`api/Players/GetById/${userId.id}`, {
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
  data: null,
  status: Loading.Idle,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProfile.pending, (state) => {
        state.status = Loading.Loading;
        state.data = null;
      })
      .addCase(GetProfile.fulfilled, (state, action) => {
        state.status = Loading.Loaded;
        state.data = action.payload;
      })
      .addCase(GetProfile.rejected, (state) => {
        state.status = Loading.Error;
        state.data = null;
      })
      .addCase(GetAllPlayers.pending, (state) => {
        state.status = Loading.Loading;
        state.data = null;
      })
      .addCase(GetAllPlayers.fulfilled, (state, action) => {
        state.status = Loading.Loaded;
        state.data = action.payload;
      })
      .addCase(GetAllPlayers.rejected, (state) => {
        state.status = Loading.Error;
        state.data = null;
      });
  },
});
export const selectorIsAuth = () =>
  window.localStorage.getItem("token") === null ? false : true;
export const profileReducer = profileSlice.reducer;
