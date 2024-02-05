import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/http.module";
import { IConnectionState, Loading } from "../../types/global.typing";


const initialState: IConnectionState = {
    connectionId: null,
    status: Loading.Idle,
};

const connSlice = createSlice({
    name: "connection",
    initialState,
    reducers: {
        setConnectionId: (state, action) => {
            state.connectionId = action.payload
        }
    },
});
export const { setConnectionId } = connSlice.actions;
export const connReducer = connSlice.reducer;
