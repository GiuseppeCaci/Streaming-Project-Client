import axios from "axios";
import {
  requestListPostStart,
  listPostSuccess,
  listPostFailure,
  listPostBasicSuccess,
  singlePostSuccess
} from "../Products/ListSlice";
import {
  requestOperationListStart,
  OperationListSuccess,
  OperationListFailure,
} from "../Products/OperationSlice";

//TUTTI I POST
export const ListPostGetAll = () => {
  return async (dispatch) => {
    dispatch(requestListPostStart());
    try {
      const response = await axios.get(import.meta.env.VITE_LIST_GET_ALL);
      dispatch(listPostSuccess(response.data));
    } catch (error) {
      dispatch(listPostFailure(error.message));
    }
  };
};

//TUTTI I POST (INFO BASIC)
export const ListBasicGetAll = () => {
  return async (dispatch) => {
    dispatch(requestListPostStart());
    try {
      const response = await axios.get(import.meta.env.VITE_LIST_BASIC_GET_ALL);
      dispatch(listPostBasicSuccess(response.data));
    } catch (error) {
      dispatch(listPostFailure(error.message));
    }
  };
};

//RECUPERO POST SINGOLO
export const fetchSinglePost = (id) => async (dispatch) => {
  dispatch(requestListPostStart());
  try {
    const response = await axios.get(`${import.meta.env.VITE_FETCH_SINGLE_POST}/single-post/${id}`);
    dispatch(singlePostSuccess(response.data));
  } catch (error) {
    dispatch(listPostFailure(error.message));
  }
};

//CANCELLA POST
export const fetchVisualPostDelete = (idPost) => async (dispatch) => {
  dispatch(requestOperationListStart());
  try {
    const response = await axios.delete(
     `${import.meta.env.VITE_FETCH_VISUAL_POST_DELETE}/products/${idPost}`
    );
    dispatch(OperationListSuccess(response.data));
  } catch (error) {
    dispatch(OperationListFailure(error.message));
  }
};

//MODIFICO POST
export const fethVisualPostModifiy = (id, body) => async (dispatch) => {
  dispatch(requestOperationListStart());
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_FETCH_VISUAL_POST_MODIFY}/products/${id}`,
      body
    );
    dispatch(OperationListSuccess(response.data));
  } catch (error) {
    dispatch(OperationListFailure(error.message));
  }
};

//AGGIUNGO POST
export const fetchVisualPostADDPOST = (body) => async (dispatch) => {
  dispatch(requestOperationListStart());
  try {
    const response = await axios.post(  import.meta.env.VITE_FETCH_VISUAL_POST_MODIFY, body);
    dispatch(OperationListSuccess(response.data));
  } catch (error) {
    dispatch(OperationListFailure(error.message));
  }
};
