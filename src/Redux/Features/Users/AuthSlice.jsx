import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    users:[],
    loading:false,
    error:null
};

const authSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        requestStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state,action) => {
            state.loading = false;
            state.user = action.payload;
        },
        actionSuccess: (state,action) => {
            state.loading = false;
            state.users = action.payload;
        },
        actionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        actionReset: (state) => {
            state.loading = false;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const {requestStart, loginSuccess, actionSuccess, actionFailure, actionReset, logout} = authSlice.actions;
export default authSlice.reducer;