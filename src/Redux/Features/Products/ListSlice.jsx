import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    typeMedia:"general",
    postBasicList:[],
    postList:[],
    singlePost:[],
    listLoading:false,
    listError:null
};

const postListSlice = createSlice({
    name:"postList",
    initialState,
    reducers:{
        selectTypeMedia: (state,action) => {
            state.typeMedia = action.payload;
        },
        requestListPostStart: (state) => {
            state.listLoading = true;
            state.listError = null;
        },
        listPostSuccess: (state, action) => {
            state.listLoading = false;
            state.postList = action.payload;
        },
        listPostBasicSuccess: (state, action) => {
            state.listLoading = false;
            state.postBasicList = action.payload;
        },
        singlePostSuccess: (state, action) => {
            state.listLoading = false;
            state.singlePost = action.payload;
        },
        listPostFailure: (state, action) => {
            state.listLoading = false;
            state.listError = action.payload;
        }
    }
});

export const {selectTypeMedia, requestListPostStart, listPostSuccess, listPostFailure,listPostBasicSuccess,singlePostSuccess} = postListSlice.actions;
export default postListSlice.reducer;