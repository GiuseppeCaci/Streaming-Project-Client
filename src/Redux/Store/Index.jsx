import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Users/AuthSlice"
import emailReducer from "../Features/Users/EmailSlice"
import profileReducer from "../Features/Users/ProfileSlice"
import postListReducer from "../Features/Products/ListSlice"
import operationReducer from "../Features/Products/OperationSlice"
import favoritesMediaReducer from "../Features/FavoritesMedia/FavoriteSlice"


const store = configureStore({
    reducer:{
        auth:authReducer,
        controlEmail:emailReducer,
        profile:profileReducer,
        listProducts:postListReducer,
        listOperation:operationReducer,
        listFavoriteUser:favoritesMediaReducer,
    },
});

export default store

