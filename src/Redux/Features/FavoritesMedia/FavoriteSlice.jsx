import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accountConnect:null,
    mediaFavorite:null,
    favoriteLoading:false,
    favoriteError:null
};

const favoriteMediaSlice = createSlice({
    name:"mediaFavorite",
    initialState,
    reducers:{
        connectListFavorite: (state,action) => {
            state.accountConnect = action.payload;
        },
        requestFavoriteStart: (state) => {
            state.favoriteLoading = true;
            state.favoriteError = null;
        },
        favoriteSuccess: (state, action) => {
            state.favoriteLoading = false;
            state.mediaFavorite = action.payload;
        },
        favoriteFailure: (state, action) => {
            state.favoriteLoading = false;
            state.favoriteError = action.payload;
        },
        logoutAccountList: (state) => {
            state.accountConnect = null;
            state.mediaFavorite = null;
        }
    }
});

export const {connectListFavorite, requestFavoriteStart, favoriteSuccess, favoriteFailure, logoutAccountList} = favoriteMediaSlice.actions;
export default favoriteMediaSlice.reducer;