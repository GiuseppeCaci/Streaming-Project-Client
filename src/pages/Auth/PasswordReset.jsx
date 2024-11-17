import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseFetchGetAllUser from "../../UseHooks/UseFetchGetAllUser";
import { fetchUserGetAll } from "../../Redux/Features/Api/UserApi";
import { fetchUserRequestChangePasswordEmail } from "../../Redux/Features/Api/UserApi";

const PasswordReset = () => {
  const [emailForReset, setEmailForReset] = useState({ email: "" });
  const [messageForm, setMessageForm] = useState("");
  const [checkReset, setCheckReset] = useState(false);

  const dispatch = useDispatch();
  const myToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjlmZTQxZDNlODA2MTFjYzA3MmIwYSIsInVzZXJuYW1lIjoiYWRtaXIiLCJpYXQiOjE3MzA4MDU0Mjh9.0WXKmj7R5toOdNExEL8YscSsaLgmeHWjCZkYYdvb444";
  const { users, loading, error } = UseFetchGetAllUser(
    (state) => state.auth,
    fetchUserGetAll,
    myToken
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessageForm("");

    if (!users) return;
    const foundUserEmail = users.find(
      (element) => element.email === emailForReset
    );
    if (!foundUserEmail) {
      console.log(foundUserEmail);
      setMessageForm("email non trovata");
      return;
    } else {
      setCheckReset(true);
      dispatch(fetchUserRequestChangePasswordEmail({ email: emailForReset }));
    }
  };

  return (
    <>
      <div className="min-h-screen pt-44">
        {checkReset ? (
          <>
            <h2 className="text-white text-lg font-semibold font-sans px-7">
              ti abbiamo mandato un email per reimpostare la password!</h2>
          </>
        ) : (
          <>
            <h2 className="pl-3 text-white text-lg font-semibold font-sans">
              Reimposta Password
            </h2>
            <form
              className="flex flex-col p-5 space-y-4"
              onSubmit={handleSubmit}
            >
              {messageForm && <p className="text-red-500">{messageForm}</p>}
              <label className="flex flex-col">
                <input
                  required
                  type="email"
                  placeholder="Inserisci l'Email"
                  name="email"
                  value={emailForReset.password}
                  onChange={(e) => setEmailForReset(e.target.value)}
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
                invia
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default PasswordReset;
