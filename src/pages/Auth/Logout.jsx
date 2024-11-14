import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Features/Users/AuthSlice";
import { logoutAccountList } from "../../Redux/Features/FavoritesMedia/FavoriteSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const userLoginCheck = JSON.parse(localStorage.getItem("user"));
  const userListFavorites = JSON.parse(localStorage.getItem("favoritesList"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handlerLogout = () => {
    if (userLoginCheck && userListFavorites) {
      dispatch(logout());
      dispatch(logoutAccountList());
      localStorage.removeItem("user");
      localStorage.removeItem("favoritesList");
      navigate("/");
      console.log("logout eseguito");
    }
  };

  return (
    <>
      <div className="h-screen pt-36 bg-black flex flex-col items-center text-center">
        {userLoginCheck ? (
          <>
           <h2 className="pl-3 pb-3 text-white text-lg font-semibold font-sans mb-4">Sei sicuro 
            di voler disconnetere il profilo?</h2>
            
        <div className="flex justify-center items-center gap-4">
            <Link to="/MainProfile"  className="text-blue-500 hover:text-blue-400 font-sans font-semibold">torna indietro</Link>
            <button onClick={handlerLogout} className="bg-red-700 text-white w-44 py-2 rounded-lg font-sans font-semibold
             hover:bg-red-800 transition-colors duration-300">Esci</button>
             </div>
          </>
        ) : (
          <>
              <h2 className="pl-3 pb-3 text-white text-lg font-semibold font-sans mb-4">
                Non hai accesso a questa pagina, accedi</h2>
          </>
        )}
      </div>
    </>
  );
};

export default Logout;
