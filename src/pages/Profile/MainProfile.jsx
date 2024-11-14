import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import PasswordIcon from "@mui/icons-material/Password";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import MovieIcon from "@mui/icons-material/Movie";

const MainProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userLoginCheck = JSON.parse(localStorage.getItem("user"));

  const capitalizeFirstLetter = (text) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <>
      <div className="max-w-sm mx-auto h-screen flex justify-center items-center flex-col p-6">
        {userLoginCheck ? (
          <>
            <div>
              <img
                src={`${userLoginCheck.imgprofile}`}
                className="w-20 rounded-md"
              ></img>
              <p className="text-lg font-semibold font-sans text-white">
                {capitalizeFirstLetter(userLoginCheck.username)}
              </p>
            </div>
            <div className="mt-8">
              <ul className="text-left">
                <li className="py-3 flex items-center text-white">
                  <MovieIcon className="pr-1"></MovieIcon>{" "}
                  <Link to="/mylistmedia" className="text-white">
                    La mia Lista
                  </Link>
                </li>
                <li className="py-3 flex items-center text-white">
                  <EditIcon className="pr-1"></EditIcon>
                  <Link to="/AppSetting" className="text-white">
                    Modifica immagine di profilo
                  </Link>
                </li>
                <li className="py-3 flex items-center text-white">
                  <SettingsIcon className="pr-1"></SettingsIcon>
                  <Link to="/PasswordReset" className="text-white">
                    Cambia Password
                  </Link>
                </li>
                <li className="py-3 flex items-center text-white">
                  <DeleteIcon className="pr-1"></DeleteIcon>
                  <Link to="/DeleteProfile" className="text-white">
                    Cancella profilo
                  </Link>
                </li>
                <li className="py-3 flex items-center text-white">
                  <LogoutIcon className="pr-1"></LogoutIcon>
                  <Link to="/logout" className="text-white">
                    Esci
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <p>Non hai accesso a questa pagina, accedi</p>
          </>
        )}
      </div>
    </>
  );
};

export default MainProfile;
