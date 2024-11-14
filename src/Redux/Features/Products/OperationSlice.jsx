import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actionSearchResult: [],
  operationListData: null,
  loadingOperationList: false,
  errorOperationList: null,
};

const operationSlice = createSlice({
  name: "operationListData",
  initialState,
  reducers: {
    OperationSearchResult: (state, action) => {
      state.actionSearchResult = action.payload;
    },
    requestOperationListStart: (state) => {
      state.loadingOperationList = true;
      state.errorOperationList = null;
    },
    OperationListSuccess: (state, action) => {
      state.loadingOperationList = false;
      state.operationListData = action.payload;
    },
    OperationListFailure: (state, action) => {
      state.loadingOperationList = false;
      state.errorOperationList = action.payload;
    },
    OperationListReset: (state) => {
      (state.operationListData = null), (state.loadingOperationList = false);
      state.errorOperationList = null;
    },
  },
});

export const {
  OperationSearchResult,
  requestOperationListStart,
  OperationListSuccess,
  OperationListFailure,
  OperationListReset,
} = operationSlice.actions;
export default operationSlice.reducer;
