import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeImgProfileUser } from "../../Redux/Features/Api/UserApi";
import { useNavigate } from "react-router-dom";

const AppSetting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requestProfileSettingStart,actionProfileSettingSuccess, actionProfileSettingFailure} = useSelector(
    (state) => state.profile);
  const userLoginCheck = JSON.parse(
    localStorage.getItem("user")
  );


  const [imgSelected, setImgSelected] = useState({ imgprofile: "" });
  
  const handleImageSelect = (imgUrl) => {
    if (userLoginCheck) {
      setImgSelected({ imgprofile: imgUrl });
      dispatch(changeImgProfileUser(userLoginCheck.token, imgUrl));
      navigate("/MainProfile")
    }
  };



  return (
    <>
     <div className="h-screen flex justify-center items-center flex-col flex-wrap">
     <h2 className="pb-2 text-left mb-1 pl-3 text-white text-lg font-semibold font-sans">Scegli l'icona</h2>
  <div className="flex space-x-4">
    <button onClick={() => handleImageSelect("assets/users/user-profile-1.jpeg")} className="m-2 p-0 border-none bg-transparent focus:outline-none hover:outline-none active:outline-none">
      <img src="assets/users/user-profile-1.jpeg" className="w-20" alt="Profile Option 1" />
    </button>
    <button onClick={() => handleImageSelect("assets/users/user-profile-2.jpg")} className="m-2 p-0 border-none bg-transparent focus:outline-none hover:outline-none active:outline-none">
      <img src="assets/users/user-profile-2.jpg" className="w-20" alt="Profile Option 2" />
    </button>
  </div>
  <div className="flex space-x-4">
    <button onClick={() => handleImageSelect("assets/users/user-profile-3.jpeg")} className="m-2 p-0 border-none bg-transparent focus:outline-none hover:outline-none active:outline-none">
      <img src="assets/users/user-profile-3.jpeg" className="w-20" alt="Profile Option 1" />
    </button>
    <button onClick={() => handleImageSelect("assets/users/user-profile-4.jpg")} className="m-2 p-0 border-none bg-transparent focus:outline-none hover:outline-none active:outline-none">
      <img src="assets/users/user-profile-4.jpg" className="w-20" alt="Profile Option 2" />
    </button>
  </div>
  <div className="flex justify-center">
    <button onClick={() => handleImageSelect("assets/users/user-profile-5.jpg")} className="m-2 p-0 border-none bg-transparent focus:outline-none hover:outline-none active:outline-none">
      <img src="assets/users/user-profile-5.jpg" className="w-20" alt="Profile Option 2" />
    </button>
  </div>
</div>

    </>
  );
};

export default AppSetting;
