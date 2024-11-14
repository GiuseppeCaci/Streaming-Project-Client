import React from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

//pagine
const Home = lazy(() => import("../pages/general/Home"));
const NotFound = lazy(() => import("../pages/general/NotFound"));
const MediaCategory = lazy(() => import("../pages/Categories/MediaCategory"));
const ProductDetails = lazy(() => import("../pages/Categories/ProductDetails"));
const SearchPage = lazy(() => import("../pages/Search/SearchPage"));
const SearchResults = lazy(() => import("../pages/Search/SearchResults"));
const AccountSetting = lazy(() => import("../pages/Profile/AccountSetting"));
const AppSetting = lazy(() => import("../pages/Profile/AppSetting"));
const LegalInfo = lazy(() => import("../pages/Profile/LegalInfo"));
const MainProfile = lazy(() => import("../pages/Profile/MainProfile"));
const WatchList = lazy(() => import("../pages/Profile/WatchList"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Logout = lazy(() => import("../pages/Auth/Logout"));
const PasswordReset = lazy(() => import("../pages/Auth/PasswordReset"));
const PasswordResetConfirm = lazy(() => import("../pages/Auth/PasswordResetConfirm"));
const Register = lazy(() => import("../pages/Auth/Register"));
const RegisterConfirm = lazy(() => import("../pages/Auth/RegisterConfirm"));
const UserEmailNotConfirm = lazy(() => import("../pages/Auth/UserEmailNotConfirm"));
const DeleteProfile = lazy(() => import("../pages/Auth/DeleteProfile"));
const MyListMedia = lazy(() => import("../pages/Profile/MyListMedia"));


//Componenti
const Loading = lazy(() => import("../Components/Loading"));
const Layout = lazy(() => import("./Layout"));


const AppRoute = () => {

    return(
      <>
        <Router>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>} />
            <Route path="/NotFound" element={<NotFound />} />
            <Route path="/categories/:genere" element={<MediaCategory />} />
            <Route path="/categories/:genere/:title" element={<ProductDetails />} />
            <Route path="/SearchPage" element={<SearchPage/>} />
            <Route path="/SearchResults" element={<SearchResults/>} />
            <Route path="/AccountSetting" element={<AccountSetting/>} />
            <Route path="/AppSetting" element={<AppSetting />} />
            <Route path="/LegalInfo" element={<LegalInfo />} />
            <Route path="/MainProfile" element={<MainProfile/>} />
            <Route path="/WatchList" element={<WatchList/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
            <Route path="/PasswordResetConfirm/:token" element={<PasswordResetConfirm />} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/UserEmailNotConfirm" element={<UserEmailNotConfirm/>} />
            <Route path="/RegisterConfirm" element={<RegisterConfirm/>} />
            <Route path="/DeleteProfile" element={<DeleteProfile/>} />
            <Route path="/mylistmedia" element={<MyListMedia/>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
      </>
    )
  };
  
  export default AppRoute;