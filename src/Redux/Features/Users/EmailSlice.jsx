import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataEmail:null,
    loadingEmail:false,
    errorEmail:null
};

const emailSlice = createSlice({
    name:"dataUserEmail",
    initialState,
    reducers:{
        requestEmailStart: (state) => {
            state.loadingEmail = true;
            state.errorEmail = null;
        },
        actionEmailSuccess: (state,action) => {
            state.loadingEmail = false;
            state.dataEmail = action.payload;
        },
        actionEmailFailure: (state, action) => {
            state.loadingEmail = false;
            state.errorEmail = action.payload;
        }
    }
});

export const {requestEmailStart, actionEmailSuccess, actionEmailFailure} = emailSlice.actions;
export default emailSlice.reducer;