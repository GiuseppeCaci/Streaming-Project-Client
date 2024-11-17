import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseFetchGetAllUser from "../../UseHooks/UseFetchGetAllUser";
import { fetchUserResendEmailPost } from "../../Redux/Features/Api/UserApi";
import { fetchUserGetAll } from "../../Redux/Features/Api/UserApi";
import { login } from "../../Redux/Features/Api/UserApi";
import { actionReset } from "../../Redux/Features/Users/AuthSlice";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router-dom";
import { favoritesListByUserId } from "../../Redux/Features/Api/ListFavoriteUserApi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
  const userLoginCheck = JSON.parse(
    localStorage.getItem("user")
  );
useEffect(() => {
    if(userLoginCheck){
       navigate("/")
    }
},[])

  const dispatch = useDispatch();
  const myToken =`${import.meta.env.VITE_MY_TOKEN}`;
  const {
    users,
    loading: loadingGetAll,
    error: errorGetAll,
  } = UseFetchGetAllUser((state) => state.auth, fetchUserGetAll, myToken);
  const { user, loading, error } = useSelector((state) => state.auth);
  
  const {accountConnect} = useSelector((state) => state.listFavoriteUser);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [messageForm, setMessageForm] = useState("");
  const [notConfirmPassword, setNotConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessageForm("");
    dispatch(actionReset());
    if (!users) return;
    const userTryLogin = users.find(
      (element) => element.username === loginForm.username
    );
    if (!userTryLogin) {
      setMessageForm("user o password non trovati");
      return;
    }
    if (!userTryLogin.confirmed) {
      setMessageForm("Non hai ancora completato l'inscrizione!");
      localStorage.setItem("userUnconfirmed", JSON.stringify(userTryLogin));
      setNotConfirmPassword(true);
      return;
    }
    // Effettua la richiesta di login
    if (userTryLogin.confirmed) {
      const checkUserNotConfirmed = JSON.parse(
        localStorage.getItem("userUnconfirmed")
      );

      if (
        checkUserNotConfirmed &&
        checkUserNotConfirmed.username === userTryLogin.username
      ) {
        localStorage.removeItem("userUnconfirmed");
      }
      
      try {
        await dispatch(
          login({
            username: loginForm.username,
            password: loginForm.password,
          })
        );
        setMessageForm("");
      } catch (error) {
        if (error.response && error.response.data) {
          setMessageForm(error || "Errore durante il login");
        } else {
          setMessageForm("Errore sconosciuto, riprova più tardi");
        }
      }
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(favoritesListByUserId(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (accountConnect) {
      localStorage.setItem("favoritesList", JSON.stringify(accountConnect));
      setTimeout(() => {
       navigate("/")
      }, 3000);
    }
  }, [accountConnect, navigate]);


  const handlerEmailUser = () => {
    const foundUserEmail = JSON.parse(
      localStorage.getItem("userUnconfirmed")
    );
    if(foundUserEmail){
      dispatch(fetchUserResendEmailPost({email:foundUserEmail.email}))
      navigate("/user-email-not-confirm");
    } else {
      setMessageForm("errore di lettura dei dati")
    }
  }

   // Stato per tenere traccia della visibilità della password
   const [showPassword, setShowPassword] = useState(false);

   // Funzione per alternare la visibilità della password
   const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   };
 

  return (
    <>
      <div className="h-screen flex justify-center flex-col"   style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url('assets/movies/bg-welcome.jpeg')`,
        }}>
        {user ? (
          <>
          <div className="flex flex-col justify-center items-center">
          <img className="w-44 mb-3 rounded-xl" src={`${user.imgprofile}`}></img>
          <h2 className="pl-3 text-white text-2xl font-semibold font-sans">Bentornato {user.username}!</h2>
          </div>
          </>
        ) : (
          <>
            <h2 className="pl-3 text-white text-2xl font-semibold font-sans">
              ACCEDI
            </h2>
            <form
  className="flex flex-col p-5 space-y-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto"
  onSubmit={handleSubmit}
>
  {error && <p className="text-red-500">{error}</p>}
  {messageForm && <p className="text-red-500">{messageForm}</p>}
  <label className="flex flex-col">
    <input
      required
      placeholder="username"
      name="username"
      value={loginForm.username}
      onChange={handleInputChange}
      className="w-full p-3 bg-netflixLightGray border-none outline-none 
                 focus:outline-none active:outline-none hover:outline-none 
                 placeholder-gray-400 caret-white caret-w-2 text-base font-light text-white rounded-md"
    />
  </label>
  <label className="flex flex-col">
    <div className="flex justify-between items-center w-full bg-netflixLightGray rounded-md">
      <input
        required
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        name="password"
        value={loginForm.password}
        onChange={handleInputChange}
        className="w-full p-3 bg-netflixLightGray border-none outline-none 
                   focus:outline-none active:outline-none hover:outline-none 
                   placeholder-gray-400 caret-white caret-w-2 text-base font-light text-white rounded-md"
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
    {loading ? "Logging in..." : "Login"}
  </button>
  {notConfirmPassword && (
    <p>
      Clicca <button onClick={handlerEmailUser}> qui</button> per
      rimandare l'email di conferma
    </p>
  )}
</form>


          </>
        )}
      </div>
    </>
  );
};

export default Login;
