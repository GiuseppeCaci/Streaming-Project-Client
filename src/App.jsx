import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoute from './routes/AppRoute'
import UseFetchBasicAllPost from "./UseHooks/UseFetchBasicAllPost";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { postBasicList, listLoading, listError } = UseFetchBasicAllPost();
  const storedBasic = localStorage.getItem("mediaListBasicStorage");


  return (
    <>
    <AppRoute></AppRoute>
    </>
  )
}

export default App
