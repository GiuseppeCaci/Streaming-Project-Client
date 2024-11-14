import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseFetchGetAllUser from "../../UseHooks/UseFetchGetAllUser";
import { fetchUserResendEmailPost } from "../../Redux/Features/Api/UserApi";
import { fetchUserGetAll } from "../../Redux/Features/Api/UserApi";
import { login } from "../../Redux/Features/Api/UserApi";
import { actionReset } from "../../Redux/Features/Users/AuthSlice";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { favoritesListByUserId } from "../../Redux/Features/Api/ListFavoriteUserApi";

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
  const myToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjlmZTQxZDNlODA2MTFjYzA3MmIwYSIsInVzZXJuYW1lIjoiYWRtaXIiLCJpYXQiOjE3MzA4MDU0Mjh9.0WXKmj7R5toOdNExEL8YscSsaLgmeHWjCZkYYdvb444";
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
      console.log(`dal login: accesso eseguito da ${user.username}`);
      dispatch(favoritesListByUserId(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (accountConnect) {
      localStorage.setItem("favoritesList", JSON.stringify(accountConnect));
      console.log("Lista dei preferiti caricata e salvata nel localStorage:", accountConnect);
      setTimeout(() => {
        console.log("Timeout di 5 secondi completato!");
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
      navigate("/UserEmailNotConfirm");
    } else {
      setMessageForm("errore di lettura dei dati")
    }
  }

  return (
    <>
      <div className="h-screen pt-36">
        {user ? (
          <h2 className="pl-3 text-white text-lg font-semibold font-sans">bentornato {user.username}</h2>
        ) : (
          <>
            <h2 className="pl-3 text-white text-lg font-semibold font-sans">
              Accedi 
            </h2>
            <form
              className="flex flex-col p-5 space-y-4"
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
                  placeholder-gray-400 caret-white caret-w-2 text-sm font-light text-white rounded-md"
                />
              </label>
              <label className="flex flex-col">
                <input
                  required
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-netflixLightGray border-none outline-none 
                  focus:outline-none active:outline-none hover:outline-none 
                  placeholder-gray-400 caret-white caret-w-2 text-sm font-light text-white rounded-md"
                />
              </label>
              <button
                type="submit"
                className="mt-6 py-2 px-4 bg-netflixRed text-white font-semibold rounded-md hover:bg-white hover:text-black
                hover:border-white transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              {notConfirmPassword ? (
                <p>
                  Clicca <button onClick={handlerEmailUser}> qui</button> per
                  rimandare l'email di conferma
                </p>
              ) : null}
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
