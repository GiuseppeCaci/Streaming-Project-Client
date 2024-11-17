import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserConfirmChangePassword } from "../../Redux/Features/Api/UserApi";
//icone
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordResetConfirm = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { profileSettingData, loadingProfileSetting, errorProfileSetting } =
    useSelector((state) => state.profile);

  const userLoginCheck = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (userLoginCheck) {
      localStorage.removeItem("user");
    }
  }, []);

  const [checkToken, setCheckToken] = useState(false);
  const [checkChange, setCheckChange] = useState(false);
  const [messageForm, setMessageForm] = useState("");
  const [dataForm, setDataForm] = useState({
    nuovaPassword: "",
    confermaNuovaPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handlerSubMitForm = (e) => {
    e.preventDefault();
    if (dataForm.nuovaPassword !== dataForm.confermaNuovaPassword) {
      setMessageForm("Le password non coincidono");
    } else if (dataForm.nuovaPassword.length < 8) {
      setMessageForm("La password deve avere almeno 8 caratteri");
    } else {
      dispatch(
        fetchUserConfirmChangePassword(token, {
          password: dataForm.nuovaPassword,
        })
      );
    }
  };

  useEffect(() => {
    if (profileSettingData) {
      console.log("settingdata:", profileSettingData);
      setCheckChange(true);
    } else {
      setMessageForm(errorProfileSetting);
    }
  }, [profileSettingData, errorProfileSetting]);

   // Stato per tenere traccia della visibilità della password
   const [showPassword, setShowPassword] = useState(false);

   // Funzione per alternare la visibilità della password
   const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   };
useEffect(() => {
  console.log(userLoginCheck)
},userLoginCheck)

  return (
    <>
    {userLoginCheck? 
    <>
       <div className="h-screen pt-36">
        {checkChange ? (
          <>
            {" "}
            <h2 className="pl-3 text-white text-lg font-semibold font-sans">
              password cambiata con successo! Accedi nuovamente da{" "}
              <Link to="/login">qui</Link>.
            </h2>
          </>
        ) : (
          <>
            <h2 className="pl-3 text-white text-lg font-semibold font-sans">Inserisci nuova password</h2>
            <form
  className="flex flex-col p-5 space-y-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto"
  onSubmit={handlerSubMitForm}
>
  <label className="flex flex-col">
  <div className="flex justify-between items-center w-full bg-netflixLightGray rounded-md">
    <input
      required
      type={showPassword ? "text" : "password"}
      placeholder="nuova password"
      name="nuovaPassword"
      value={dataForm.nuovaPassword}
      onChange={handleInputChange}
      className="w-full p-3 bg-netflixLightGray border-none outline-none 
                 focus:outline-none active:outline-none hover:outline-none 
                 placeholder-gray-400 caret-white caret-w-2 text-sm font-light text-white rounded-md"
    />
       <span onClick={togglePasswordVisibility} className="pr-4">
        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}{" "}
      </span>
    </div>
  </label>
  <label className="flex flex-col">
  <div className="flex justify-between items-center w-full bg-netflixLightGray rounded-md">
    <input
      required
      type={showPassword ? "text" : "password"}
      placeholder="conferma nuova password"
      name="confermaNuovaPassword"
      value={dataForm.confermaNuovaPassword}
      onChange={handleInputChange}
      className="w-full p-3 bg-netflixLightGray border-none outline-none 
                 focus:outline-none active:outline-none hover:outline-none 
                 placeholder-gray-400 caret-white caret-w-2 text-sm font-light text-white rounded-md"
    />
     <span onClick={togglePasswordVisibility} className="pr-4">
        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}{" "}
      </span>
      </div>
  </label>
  <button
    type="submit"
    className="mt-6 py-2 px-4 bg-netflixRed text-white font-semibold rounded-md hover:bg-white hover:text-black
               hover:border-white transition w-full"
  >
    invia
  </button>
</form>

          </>
        )}
      </div>
    </>
    :
    <>
       <h2 className="pl-3 text-white text-lg font-semibold font-sans">Non hai accesso a questa pagina!</h2>
    </>
    }
    </>
  );
};

export default PasswordResetConfirm;
