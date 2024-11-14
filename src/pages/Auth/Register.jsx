import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseFetchGetAllUser from "../../UseHooks/UseFetchGetAllUser";
import { fetchUserGetAll } from "../../Redux/Features/Api/UserApi";
import { fetchUserPost } from "../../Redux/Features/Api/UserApi";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const userLoginCheck = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (userLoginCheck) {
      navigate("/");
    }
  }, []);
  const dispatch = useDispatch();
  const myToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjlmZTQxZDNlODA2MTFjYzA3MmIwYSIsInVzZXJuYW1lIjoiYWRtaXIiLCJpYXQiOjE3MzA4MDU0Mjh9.0WXKmj7R5toOdNExEL8YscSsaLgmeHWjCZkYYdvb444";
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
      dispatch(fetchUserPost("http://localhost:3000/users/register", dataForm))
        .then(() => setCheckRegister(true))
        .catch((error) =>
          setMessageForm(error.message || "Errore durante la registrazione")
        );
    }
  };

  useEffect(() => {
    console.log(messageForm);
  }, [messageForm]);
  useEffect(() => {
    console.log(checkRegister);
  }, [checkRegister]);

  if (loading) return <Loading />;

  if (error) return <p>Errore durante il caricamento dei dati</p>;

  return (
    <>
      <div className="h-screen pt-36">
        {checkRegister ? (
          <>
                 <h2 className="pl-3 text-white text-lg font-semibold font-sans">
              Registazione avvenuta con successo! controlla la tua email per
              completare la registrazione
            </h2>
          </>
        ) : (
          <>
            <h2 className="pl-3 text-white text-lg font-semibold font-sans">
              REGISTRATI
            </h2>
            <form
              className="flex flex-col p-5 space-y-4"
              onSubmit={handleFormSubMit}
            >
              {messageForm ? <p>{messageForm}</p> : null}
              <label className="flex flex-col">
                <input
                  required
                  placeholder="username"
                  name="username"
                  type="text"
                  value={dataForm.username}
                  className="w-full p-3 bg-netflixLightGray border-none outline-none 
                  focus:outline-none active:outline-none hover:outline-none 
                  placeholder-gray-400 caret-white caret-w-2 text-sm font-light text-white rounded-md"
                  onChange={handleInputChange}
                />
              </label>
              <label className="flex flex-col">
                <input
                  required
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={dataForm.password}
                  className="w-full p-3 bg-netflixLightGray border-none outline-none 
                  focus:outline-none active:outline-none hover:outline-none 
                  placeholder-gray-400 caret-white caret-w-2 text-sm font-light text-white rounded-md"
                  onChange={handleInputChange}
                />
              </label>
              <label className="flex flex-col">
                <input
                  required
                  type="password"
                  placeholder="Conferma password"
                  className="w-full p-3 bg-netflixLightGray border-none outline-none 
                  focus:outline-none active:outline-none hover:outline-none 
                  placeholder-gray-400 caret-white caret-w-2 text-sm font-light text-white rounded-md"
                  value={confermaPassword}
                  onChange={(e) => setConfermaPassword(e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                <input
                  required
                  type="email"
                  placeholder="email"
                  name="email"
                  className="w-full p-3 bg-netflixLightGray border-none outline-none 
                  focus:outline-none active:outline-none hover:outline-none 
                  placeholder-gray-400 caret-white caret-w-2 text-sm font-light text-white rounded-md"
                  value={dataForm.email}
                  onChange={handleInputChange}
                />
              </label>
              <button
                type="submit"
                className="mt-6 py-2 px-4 bg-netflixRed text-white font-semibold rounded-md hover:bg-white hover:text-black
                hover:border-white transition"
              >
                Register
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
