import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileSettingData:null,
    loadingProfileSetting:false,
    errorProfileSetting:null
};

const profileSlice = createSlice({
    name:"profileSettingData",
    initialState,
    reducers:{
        requestProfileSettingStart: (state) => {
            state.loadingProfileSetting = true;
            state.errorProfileSetting = null;
        },
        actionProfileSettingSuccess: (state,action) => {
            state.loadingProfileSetting = false;
            state.profileSettingData = action.payload;
        },
        actionProfileSettingFailure: (state, action) => {
            state.loadingProfileSetting = false;
            state.errorProfileSetting = action.payload;
        },
        resetProfileSetting: (state) => {
            state.profileSettingData = null;
            state.loadingProfileSetting = false;
            state.errorProfileSetting = null;
        }
    }
});

export const {requestProfileSettingStart, actionProfileSettingSuccess, actionProfileSettingFailure,resetProfileSetting} = profileSlice.actions;
export default profileSlice.reducer;