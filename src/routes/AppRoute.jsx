import React from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

//pagine
const Home = lazy(() => import("../pages/general/Home"));
const MediaCategory = lazy(() => import("../pages/Categories/MediaCategory"));
const ProductDetails = lazy(() => import("../pages/Categories/ProductDetails"));
const SearchPage = lazy(() => import("../pages/Search/SearchPage"));
const AppSetting = lazy(() => import("../pages/Profile/AppSetting"));
const LegalInfo = lazy(() => import("../pages/Profile/LegalInfo"));
const MainProfile = lazy(() => import("../pages/Profile/MainProfile"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Logout = lazy(() => import("../pages/Auth/Logout"));
const PasswordReset = lazy(() => import("../pages/Auth/PasswordReset"));
const PasswordResetConfirm = lazy(() => import("../pages/Auth/PasswordResetConfirm"));
const Register = lazy(() => import("../pages/Auth/Register"));
const UserEmailNotConfirm = lazy(() => import("../pages/Auth/UserEmailNotConfirm"));
const DeleteProfile = lazy(() => import("../pages/Auth/DeleteProfile"));
const MyListMedia = lazy(() => import("../pages/Profile/MyListMedia"));
const WelcomePage = lazy(() => import("../pages/general/WelcomePage"));


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
            <Route path="/categories/:genere" element={<MediaCategory />} />
            <Route path="/categories/:genere/:title" element={<ProductDetails />} />
            <Route path="/search" element={<SearchPage/>} />
            <Route path="/setting-img-profile" element={<AppSetting />} />
            <Route path="/Legal" element={<LegalInfo />} />
            <Route path="/profile" element={<MainProfile/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/password-reset-confirm/:token" element={<PasswordResetConfirm />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/user-email-not-confirm" element={<UserEmailNotConfirm/>} />
            <Route path="/delete-profile" element={<DeleteProfile/>} />
            <Route path="/my-list-media" element={<MyListMedia/>} />
            <Route path="/welcome-page" element={<WelcomePage/>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
      </>
    )
  };
  
  export default AppRoute;