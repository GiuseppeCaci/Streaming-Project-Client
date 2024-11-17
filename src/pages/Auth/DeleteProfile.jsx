import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchUserDeleteProfile } from "../../Redux/Features/Api/UserApi";
import { logout } from "../../Redux/Features/Users/AuthSlice";
import { logoutAccountList } from "../../Redux/Features/FavoritesMedia/FavoriteSlice";

const DeleteProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    requestProfileSettingStart,
    actionProfileSettingSuccess,
    actionProfileSettingFailure,
  } = useSelector((state) => state.profile);
  const userLoginCheck = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log("dalle impostazioni foto", userLoginCheck);
  }, [userLoginCheck]);

  const handleDeleteProfile = () => {
    if (userLoginCheck) {
      dispatch(fetchUserDeleteProfile(userLoginCheck.token));
      dispatch(logout());
      dispatch(logoutAccountList());
      localStorage.removeItem("user");
      localStorage.removeItem("favoritesList");
      navigate("/");
    }
  };

  return (
    <>
<div className="h-screen pt-36 bg-black flex flex-col items-center text-center">
  <h2 className="pl-3 pb-3 text-white text-lg font-semibold font-sans mb-4">
    Sei sicuro di voler cancellare il profilo?
  </h2>
  <p className="text-white text-lg font-semibold font-sans mb-6">
    Tutti i tuoi dati andranno persi!
  </p>

  <div className="flex justify-center items-center gap-4">
    <Link
      to="/profile"
      className="text-blue-500 hover:text-blue-400 font-sans font-semibold"
    >
      Torna indietro
    </Link>

    <button
      className="bg-red-700 text-white w-44 py-2 rounded-lg font-sans font-semibold hover:bg-red-800 transition-colors duration-300"
      onClick={handleDeleteProfile}
    >
      Cancella il profilo
    </button>
  </div>
</div>

    </>
  );
};

export default DeleteProfile;
