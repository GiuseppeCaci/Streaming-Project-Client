import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UseFetchAllPost from "../UseHooks/UseFetchAllPost";
import { useDispatch, useSelector } from "react-redux";
import { selectTypeMedia } from "../Redux/Features/Products/ListSlice";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import UseResetVisibility from "../UseHooks/UseResetVisibility";
import UseFetchBasicAllPost from "../UseHooks/UseFetchBasicAllPost";

const Navbar = () => {
  const { postBasicList, listLoading, listError } = useSelector((state) => state.listProducts);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const typeMedia = useSelector((state) => state.listProducts.typeMedia);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dalla navbar",postBasicList)
  },[postBasicList])

  UseResetVisibility();


  useEffect(() => {
    const filteredPostList =
      Array.isArray(postBasicList) && typeMedia && typeMedia !== "general"
        ? postBasicList.filter((item) => item.mediatype === typeMedia)
        : postBasicList;

    const uniqueCategory = Array.from(
      new Set(filteredPostList.map((item) => item.genere))
    );
    setUniqueCategories(uniqueCategory);
  }, [postBasicList, typeMedia]);

  const userLoginCheck = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.auth);

  const selectTypeCategory = (selectMedia) => {
    dispatch(selectTypeMedia(selectMedia));

  };

  const [categoriesMenu, setCategoriesMenu] = useState(false);


  const openCategories = () => {
    setCategoriesMenu((state) => !state);
  };

  useEffect(() => {
    if (categoriesMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup dell'effetto
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [categoriesMenu]);

  //controllo il secondo menu
  const location = useLocation();
  const [isHome, setIsHome] = useState(false);
  const [pageOfMenu, setPageOfMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true); // Menu visibile all'inizio
  const [lastScrollPos, setLastScrollPos] = useState(0);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHome(true);

      // Aggiungi l'evento di scroll solo nella Home
      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        if (currentScrollPos < lastScrollPos || currentScrollPos === 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
        setLastScrollPos(currentScrollPos);
      };

      window.addEventListener("scroll", handleScroll);

      // Pulisci l'evento scroll quando esci dalla Home
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsHome(false);
    }
  }, [location.pathname, lastScrollPos]);


  useEffect(() => {
    if (location.pathname === "/") {
      setPageOfMenu(false);
    } else if (/^\/categories\/[^/]+\/[^/]+$/.test(location.pathname)) {
      setPageOfMenu(true);
    } else if (location.pathname === "/SearchPage") {
      setPageOfMenu(true);
    }
  }, [location.pathname]);



  return (
    <>
      {pageOfMenu ? (
        <></>
      ) : (
        <>
          <div
            className={`${
              lastScrollPos === 0 ? "bg-opacity-0 backdrop-blur-0" : ""
            } fixed top-0 left-0 w-full mb-5 bg-netflixLightGray bg-opacity-60 backdrop-blur-lg py-3 z-50`}
          >
            <div className="container mx-auto flex items-center justify-between px-4">
              {userLoginCheck ? (
                <h2 className="text-lg text-netflixWhite">
                  For {userLoginCheck.username}
                </h2>
              ) : (
                <h2 className="text-lg text-white"> visitatore</h2>
              )}
              <div></div>
              <div className="flex space-x-6">
                <Link to="/SearchPage" className="text-netflixWhite text-xs">
                  <SearchIcon fontSize="large"></SearchIcon>
                </Link>
              </div>
            </div>

            {/* seconda barra */}
            {isHome ? (
              <>
                <div
                  className={`transition-all duration-300 ease-in-out container mx-auto mt-2 flex items-center justify-between px-4 ${
                    isScrolled ? "block " : "hidden"
                  }`}
                >
                  <div className="text-white font-bold text-sm">
                    {typeMedia != "general" ? (
                      <>
                        <button
                          onClick={() => selectTypeCategory("general")}
                          className="bg-transparent
                hover:bg-zinc-500 hover:border-none text-white text-xs px-3 mx-1 rounded-full border-1 border-white"
                        >
                          X
                        </button>
                      </>
                    ) : null}
                    <button
                      className={`${
                        typeMedia === "film" ? "bg-zinc-500" : "bg-transparent"
                      } hover:bg-zinc-500 hover:border-white focus:border-white active:border-white 
  focus:outline-none active:outline-none text-white text-xs px-3 py-2 mx-1 rounded-full border-1 border-white`}
                      onClick={() =>
                        typeMedia === "film"
                          ? selectTypeCategory("general")
                          : selectTypeCategory("film")
                      }
                    >
                      Film
                    </button>
                    <button
                      className={`${
                        typeMedia === "serieTV"
                          ? "bg-zinc-500"
                          : "bg-transparent"
                      } hover:bg-zinc-500 hover:border-white focus:border-white active:border-white 
  focus:outline-none active:outline-none text-white text-xs px-3 py-2 mx-1 rounded-full border-1 border-white`}
                      onClick={() =>
                        typeMedia === "serieTV"
                          ? selectTypeCategory("general")
                          : selectTypeCategory("serieTV")
                      }
                    >
                      Serie Tv
                    </button>
                    <button
                      className={`${
                        categoriesMenu ? "bg-zinc-400" : "bg-transparent"
                      } hover:bg-zinc-500 hover:border-white text-xs px-3 py-1 text-white mx-1 rounded-full border-1 border-white`}
                      onClick={() => openCategories()}
                    >
                      categorie
                      <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    </button>

                    <div
                      className={`${
                        categoriesMenu ? "" : "menuCategoriesClose"
                      }  text-white absolute top-0 left-0 z-50 w-full h-screen flex flex-col justify-around items-center
                      bg-netflixLightGray bg-opacity-90 backdrop-blur-xl`}
                    >
                      {listLoading && <p>Loading...</p>}
                      {listError && <p>Error: {listError}</p>}
                      {uniqueCategories && uniqueCategories.length > 0 ? (
                        <ul className="flex flex-col justify-center items-center">
                          {uniqueCategories.map((element) => (
                            <ul key={element} className="p-3">
                              <li>
                                <Link
                                  to={`/categories/${element}`}
                                  className="text-white text-lg font-semibold font-sans"
                                >
                                  {element}
                                </Link>
                              </li>
                            </ul>
                          ))}
                        </ul>
                      ) : (
                        !listLoading && <p>Errore nel caricamento</p>
                      )}
                      <button
                        onClick={openCategories}
                        className="w-10 h-10 mb-10 rounded-full bg-white flex items-center justify-center hover:bg-opacity-75"
                      >
                        <CloseIcon className="text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
