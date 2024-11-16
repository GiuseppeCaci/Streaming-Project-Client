import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useLocation } from "react-router-dom";

const Footer = () => {
  //controllo se l'user ha fatto l'accesso
  const userLoginCheck = JSON.parse(localStorage.getItem("user"));

  //gestisco la visibilità del footer in base alla localizzazione
  const [pageOfMenu, setPageOfMenu] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setPageOfMenu(false);
    } else if (/^\/categories\/[^/]+\/[^/]+$/.test(location.pathname)) {
      setPageOfMenu(true);
    } else if (location.pathname === "/SearchPage") {
      setPageOfMenu(true);
    } else if (location.pathname === "/welcome-page") {
      setPageOfMenu(true);
    }
  },[location.pathname])

    return (
        <>
        {pageOfMenu? 
       null
        :
        <>
         <div className="fixed bottom-0 left-0 w-full bg-netflixLightGray bg-opacity-60 backdrop-blur-lg py-2 mt-5  z-40">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div>
        <Link className="text-netflixWhite text-xs" to="/"><div className="flex flex-col items-center justify-center"><HomeIcon fontSize="large"></HomeIcon>
        <p className="text-xs text-netflixWhite">Home</p></div></Link>
        </div>
        
        <div className="flex space-x-6">
            {userLoginCheck? (
              <>
                <Link to="/MainProfile"><div className="flex flex-col items-center justify-center"><img src={`${userLoginCheck.imgprofile}`} className="w-9"></img>
                <p className="text-xs text-netflixWhite">My profile</p></div></Link>
              </>
            ) : (
              <>
                <Link to="/register" className="text-netflixWhite hover:text-gray-200">
                  Register
                </Link>
                <Link to="/login" className="text-netflixWhite hover:text-gray-200">
                  Login
                </Link>
              </>
            )}
          </div>

    
      </div>
    </div>
        </>}
        </>
      )
}

export default Footer;