import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../Redux/Features/Users/AuthSlice";
import { connectListFavorite } from "../../Redux/Features/FavoritesMedia/FavoriteSlice";
import GeneralSectionHome from "./GeneralSectionHome";
import MovieSectionHome from "./MovieSectionHome";
import ShowTvSectionHome from "./ShowTvSectionHome";
import UseResetVisibility from "../../UseHooks/UseResetVisibility";


const Home = () => {

  //azzera l'asse Y dello schermo quando ricarichi la pagina
  UseResetVisibility();

  const dispatch = useDispatch();
  const typeMedia = useSelector((state) => state.listProducts.typeMedia);
  const userLoginCheck = JSON.parse(localStorage.getItem("user"));
  const userListFavorites = JSON.parse(localStorage.getItem("favoritesList"));

  useEffect(() => {
    if (userLoginCheck) {
      dispatch(loginSuccess(userLoginCheck));
      console.log("Home, accesso eseguito da:", userLoginCheck);
    } else {
      console.log("home: nessun accesso eseguito");
    }
  }, []);

  useEffect(() => {
    if (userListFavorites) {
      dispatch(connectListFavorite(userListFavorites));
      console.log("Home,lista preferiti caricata:", userListFavorites);
    } else {
      console.log("home, listFavorties: nessun accesso eseguito");
    }
  }, []);

  return (
    <>
      {typeMedia === "film" && <MovieSectionHome />}
      {typeMedia === "serieTV" && <ShowTvSectionHome />}
      {typeMedia === "general" && <GeneralSectionHome />}
    </>
  );
};

export default Home;
