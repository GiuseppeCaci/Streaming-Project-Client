import axios from "axios";
import {
  connectListFavorite,
  requestFavoriteStart,
  favoriteSuccess,
  favoriteFailure,
} from "../FavoritesMedia/FavoriteSlice";

//CREA Lista favoriti di un account
export const createdFavoriteListUser = (idUser) => async (dispatch) => {
    dispatch(requestFavoriteStart());
    try{
        const respose = await axios.post(
          import.meta.env.VITE_CREATE_FAVORITE_LIST_USER, 
            idUser
        );
       dispatch(favoriteSuccess(respose))
    } catch (error) {
        dispatch(favoriteFailure(error))
    }
}


//CARICA lista favoriti di un user
export const favoritesListByUserId = (userId) => async (dispatch) => {
    dispatch(requestFavoriteStart());
    try {
      const response = await axios.post(import.meta.env.VITE_UPLOAD_FAVORITE_LIST_USER, { userId }); // POST con userId nel body
      dispatch(connectListFavorite(response.data.data)); // Passa solo i dati necessari
    } catch (error) {
      dispatch(favoriteFailure(error.response?.data?.message || 'Errore nel recuperare i preferiti'));
    }
  };

  //AGGIUNGI ai preferiti di una lista 
  export const addMediaInFavoriteList = (userId, mediaId ) => async (dispatch) => {
    dispatch(requestFavoriteStart());
    const object = {userId:userId, mediaId:mediaId}
    try{
        const response = await axios.patch(import.meta.env.VITE_ADD_MEDIA_IN_FAVORITE_LIST,object);
        dispatch(favoriteSuccess(response.data))
        return response;
    } catch (error) {
        dispatch(favoriteFailure(error))
        throw error;
    }
  };
  
// Rimuovi ai preferiti di una lista
export const removeMediaInFavoriteList = (userId, mediaId) => async (dispatch) => {
    dispatch(requestFavoriteStart());
    const object = { userId: userId, mediaId: mediaId };
    try {
      const response = await axios.patch(import.meta.env.VITE_REMOVE_MEDIA_IN_FAVORITE_LIST, object); 
      dispatch(favoriteSuccess(response.data));
      return response;
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      dispatch(favoriteFailure({ message: errorMessage }));
      throw error;
    }
  };
  