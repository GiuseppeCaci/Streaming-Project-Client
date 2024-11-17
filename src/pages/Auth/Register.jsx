import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UseFetchGetAllUser from "../../UseHooks/UseFetchGetAllUser";
import { fetchUserGetAll } from "../../Redux/Features/Api/UserApi";
import { fetchUserPost } from "../../Redux/Features/Api/UserApi";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const navigate = useNavigate();

  const userLoginCheck = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (userLoginCheck) {
      navigate("/");
    }
  }, []);
  const dispatch = useDispatch();
  const myToken = `${import.meta.env.VITE_MY_TOKEN}`;
  const { users, loading, error } = UseFetchGetAllUser(
    (state) => state.auth,
    fetchUserGetAll,
    myToken
  );

  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    email: "",
    imgprofile: "assets/users/user-default.jpg",
  });

  const [confermaPassword, setConfermaPassword] = useState("");
  const [messageForm, setMessageForm] = useState("");
  const [checkRegister, setCheckRegister] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const validateForm = () => {
    const findUserName = users.find(
      (element) => element.username === dataForm.username
    );
    const findEmail = users.find((element) => element.email === dataForm.email);

    if (findUserName) return "UserName già in uso";
    if (findEmail) return "Email già in uso";
    if (dataForm.password !== confermaPassword)
      return "Le password non coincidono";
    if (dataForm.password.length < 8)
      return "La password deve avere almeno 8 caratteri";
    return null;
  };

  const handleFormSubMit = (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setMessageForm(errorMessage);
    } else {
      setMessageForm("");
      dispatch(fetchUserPost(`${import.meta.env.VITE_REGISTER_URL}`, dataForm))
        .then(() => setCheckRegister(true))
        .catch((error) =>
          setMessageForm(error.message || "Errore durante la registrazione")
        );
    }
  };

  // Stato per tenere traccia della visibilità della password
  const [showPassword, setShowPassword] = useState(false);

  // Funzione per alternare la visibilità della password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) return <Loading />;

  if (error) return <p>Errore durante il caricamento dei dati</p>;

  return (
    <>
      <div
        className="h-screen flex justify-center flex-col"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url('assets/movies/bg-welcome.jpeg')`,
        }}
      >
        {checkRegister ? (
          <>
            <h2 className="px-5 text-white text-2xl font-semibold font-sans">
              Registazione avvenuta con successo! controlla la tua email per
              completare la registrazione
            </h2>
          </>
        ) : (
          <>
            <h2 className="pl-3 text-white text-2xl font-semibold font-sans">
              REGISTRATI
            </h2>
            <form
  className="flex flex-col p-5 space-y-4 items-center w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto"
  onSubmit={handleFormSubMit}
>
  {messageForm ? <p>{messageForm}</p> : null}
  <label className="flex flex-col justify-center items-center w-full">
    <input
      required
      placeholder="username"
      name="username"
      type="text"
      value={dataForm.username}
      className="w-full p-3 bg-netflixLightGray border-none outline-none 
                 focus:outline-none active:outline-none hover:outline-none 
                 placeholder-gray-400 caret-white caret-w-2 text-base font-light text-white 
                 rounded-md 
                 sm:w-3/4 md:w-1/2 lg:w-1/3"
      onChange={handleInputChange}
    />
  </label>
  <label className="flex flex-col justify-center items-center w-full">
    <div className="flex justify-between items-center w-full bg-netflixLightGray rounded-md sm:w-3/4 md:w-1/2 lg:w-1/3">
      <input
        required
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        name="password"
        value={dataForm.password}
        className="w-full p-3 bg-netflixLightGray border-none outline-none 
                   focus:outline-none active:outline-none hover:outline-none 
                   placeholder-gray-400 caret-white caret-w-2 text-base font-light text-white 
                   rounded-md"
        onChange={handleInputChange}
      />
      <span onClick={togglePasswordVisibility} className="pr-4">
        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </span>
    </div>
  </label>
  <label className="flex flex-col justify-center items-center w-full">
    <div className="flex justify-between items-center w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-netflixLightGray rounded-md">
      <input
        required
        type={showPassword ? "text" : "password"}
        placeholder="Conferma password"
        className="w-full p-3 bg-netflixLightGray border-none outline-none 
                   focus:outline-none active:outline-none hover:outline-none 
                   placeholder-gray-400 caret-white caret-w-2 text-base font-light text-white 
                   rounded-md"
        value={confermaPassword}
        onChange={(e) => setConfermaPassword(e.target.value)}
      />
      <span onClick={togglePasswordVisibility} className="pr-4">
        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </span>
    </div>
  </label>
  <label className="flex flex-col justify-center items-center w-full">
    <input
      required
      type="email"
      placeholder="email"
      name="email"
      className="w-full p-3 bg-netflixLightGray border-none outline-none 
                 focus:outline-none active:outline-none hover:outline-none 
                 placeholder-gray-400 caret-white caret-w-2 text-base font-light text-white 
                 rounded-md 
                 sm:w-3/4 md:w-1/2 lg:w-1/3"
      value={dataForm.email}
      onChange={handleInputChange}
    />
  </label>
  <button
    type="submit"
    className="mt-6 py-2 px-4 bg-netflixRed text-white font-semibold rounded-md hover:bg-white hover:text-black
               hover:border-white transition w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
  >
    Register
  </button>
</form>

            <div>
              <h2 className="px-3 text-white text-lg font-sans">
                Useremo l'email solo per identificarti in modo univico e per
                resettare la password in caso di necessità!
              </h2>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
