import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/http.module";
import { IUserLoginDTO, IUserSignInDTO } from "../../types/user.typing";
import { IUserState, Loading } from "../../types/global.typing";

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (userData: IUserLoginDTO) => {
    const { data } = await axios.post("api/Authentication/Login", userData);
    return data;
  }
);
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const token = window.localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { data } = await axios.get("api/Authentication/Me", {
    headers,
  });
  return data;
});
export const RegisterUser = createAsyncThunk(
  "auth/RegisterUser",
  async (userData: IUserSignInDTO) => {
    const { data } = await axios.post("api/Authentication/Register", userData);
    return data;
  }
);

const initialState: IUserState = {
  Data: null,
  Status: Loading.Idle,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.Data = null;
      state.Status = Loading.Idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.Status = Loading.Loading;
        state.Data = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.Status = Loading.Loaded;
        state.Data = action.payload;
      })
      .addCase(LoginUser.rejected, (state) => {
        state.Status = Loading.Error;
        state.Data = null;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.Status = Loading.Loading;
        state.Data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.Status = Loading.Loaded;
        state.Data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.Status = Loading.Error;
        state.Data = null;
      })
      .addCase(RegisterUser.pending, (state) => {
        state.Status = Loading.Loading;
        state.Data = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.Status = Loading.Success;
        state.Data = action.payload;
      })
      .addCase(RegisterUser.rejected, (state) => {
        state.Status = Loading.Error;
        state.Data = null;
      });
  },
});
export const selectorIsAuth = () =>
  window.localStorage.getItem("token") === null ? false : true;
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
