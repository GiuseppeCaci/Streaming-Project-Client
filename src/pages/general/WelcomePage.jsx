import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center text-white flex flex-col justify-evenly items-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url('assets/movies/bg-welcome.jpeg')`,
        }}
      >
        <div className="text-white flex flex-col justify-center items-center">
          {/* Logo o titolo */}
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-center">
            Benvenuto su <span className="text-red-500">Streamflix</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 text-center">
            Il tuo portale per i migliori film, serie TV e tanto altro. Accedi o
            registrati per iniziare!
          </p>

          {/* Pulsanti di azione */}
          <div className="flex gap-4 mb-10">
            <Link
              to="/Login"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Accedi
            </Link>
            <Link
              to="/Register"
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Registrati
            </Link>
          </div>

          {/* Link per visitare il sito */}
          <Link
            to="/"
            className="text-red-500 underline hover:text-red-400 transition-colors text-lg"
          >
            Visita il sito senza registrazione
          </Link>
        </div>
        <div>
          <p className="px-5 text-lg">
          Attenzione! Questo sito è un esempio dimostrativo che imita una piattaforma di streaming, ma non è una piattaforma reale!
          </p>
          <p className="px-5 mt-5">
          Tutti i titoli presenti nel catalogo e le immagini sono stati generati utilizzando intelligenza artificiale, rispettivamente da ChatGPT e Leonardo AI.
          </p>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
