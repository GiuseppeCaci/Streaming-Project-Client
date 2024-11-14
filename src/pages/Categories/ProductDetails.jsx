import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseFetchAllPost from "../../UseHooks/UseFetchAllPost";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addMediaInFavoriteList,
  removeMediaInFavoriteList,
} from "../../Redux/Features/Api/ListFavoriteUserApi";
import { connectListFavorite } from "../../Redux/Features/FavoritesMedia/FavoriteSlice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import MoreLikeThis from "../../Components/MoreLikeThis";
import LockIcon from '@mui/icons-material/Lock';
import UseResetVisibility from "../../UseHooks/UseResetVisibility";
import { fetchSinglePost } from "../../Redux/Features/Api/ProductApi";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { title } = useParams();

  // Recupero il catalogo base e il singolo post dal Redux store
  const { postBasicList, singlePost, listLoading, listError } = useSelector((state) => state.listProducts);

  const userLoginCheck = JSON.parse(localStorage.getItem("user"));
  const userListFavorites = JSON.parse(localStorage.getItem("favoritesList"));
  const [isAnimating, setIsAnimating] = useState(false);

  // Effettua la chiamata per recuperare i dati completi del singolo prodotto se trovato
  useEffect(() => {
    if(postBasicList && title){
      const postBasic = postBasicList.find((element) => element.titolo === title);
      if(postBasic) {
        dispatch(fetchSinglePost(postBasic._id));
      }
    }
  }, [postBasicList, title, dispatch]);

  // Gestione della lista dei preferiti
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (userListFavorites && singlePost) {
      const foundFavorite = userListFavorites.mediaIds.includes(singlePost._id);
      setIsFavorite(foundFavorite);
    }
  }, [userListFavorites, singlePost]);

  const handleAddRemoveFavorite = () => {
    if (userLoginCheck && singlePost) {
      const userID = userLoginCheck.id;
      const mediaID = singlePost._id;
      if (!isFavorite) {
        dispatch(addMediaInFavoriteList(userID, mediaID))
          .then((response) => {
            const updatedFavorites = response.data.data;
            setIsAnimating(true);
            localStorage.setItem("favoritesList", JSON.stringify(updatedFavorites));
            dispatch(connectListFavorite(updatedFavorites));
            setTimeout(() => {
              setIsAnimating(false);
              setIsFavorite(true);
            }, 400);
          })
          .catch((error) => console.error("Errore nell'aggiungere il media ai preferiti", error));
      } else {
        dispatch(removeMediaInFavoriteList(userID, mediaID))
          .then((response) => {
            const updatedFavorites = response.data.data;
            setIsAnimating(true);
            localStorage.setItem("favoritesList", JSON.stringify(updatedFavorites));
            dispatch(connectListFavorite(updatedFavorites));
            setTimeout(() => {
              setIsAnimating(false);
              setIsFavorite(false);
            }, 400);
          })
          .catch((error) => console.error("Errore nel rimuovere il media ai preferiti", error));
      }
    }
  };

  // Azzera l'asse Y dello schermo quando ricarichi la pagina
  UseResetVisibility();

  return (
    <>
      <div>
        {listLoading && <p>Loading...</p>}
        {listError && <p>Error: {listError}</p>}
        {singlePost ? (
          <>
            <div key={singlePost._id}>
              <button className="absolute top-0 right-0 m-5 w-10 h-10 rounded-full bg-gray-600 bg-opacity-50 flex items-center justify-center hover:bg-opacity-75">
                <Link to="/">
                  <CloseIcon className="text-white" />
                </Link>
              </button>
              {listLoading ? 
  <div className="w-full h-56 sm:h-60 md:h-80 lg:h-96 bg-netflixSkeleton animate-pulse"></div>
  :
  <img
    src={`/${singlePost.background}`}
    className="w-full h-56 sm:h-60 md:h-80 lg:h-96 object-cover object-center"
    alt={`${singlePost.titolo} background`} loading="lazy"
  />
}

              <div className="flex flex-col text-left p-2 mt-1">
                <h2 className="text-lg pl-3">{singlePost.titolo}</h2>
                <div className="flex pl-3">
                  <p className="pr-2">{singlePost.annouscita}</p>
                  <p className="px-2">{singlePost.etaminima}</p>
                  <p className="px-2">{singlePost.durata}</p>
                  <p className="px-2">{singlePost.formatodistribuzione}</p>
                </div>
                <div className="flex flex-col p-2">
                  <button className="my-2 bg-white text-black rounded-md hover:border-none focus:outline-none active:outline-none active:border-none border-none">
                    <PlayArrowIcon />Play
                  </button>
                  <button className="bg-netflixGrayBorder text-white rounded-md border-none hover:border-none focus:outline-none active:outline-none active:border-none">
                    <DownloadIcon />Scarica
                  </button>
                </div>
                <div className="text-sm pl-3">
                  <p>{singlePost.descrizione}</p>
                  <p className="pt-3">Cast: {singlePost.attori}</p>
                </div>
                <div className="flex mt-7">
                  {userLoginCheck ? (
                    <button
                      className={`flex flex-col justify-center items-center bg-black ${isAnimating ? "rotate-center" : ""}`}
                      onClick={handleAddRemoveFavorite}
                    >
                      {isFavorite ? (
                        <>
                          <CheckIcon className="text-green-500" />La mia lista
                        </>
                      ) : (
                        <>
                          <AddIcon />La mia lista
                        </>
                      )}
                    </button>
                  ) : (
                    <button className="flex flex-col justify-center items-center bg-black">
                      <LockIcon />La mia lista
                    </button>
                  )}
                  <button className="flex flex-col justify-center items-center bg-black">
                    <ThumbUpIcon />Valuta
                  </button>
                  <button className="flex flex-col justify-center items-center bg-black">
                    <SendIcon />Consiglia
                  </button>
                </div>
                <span className="h-1 w-2/4 bg-netflixRed ml-3"></span>
              </div>
            </div>
          </>
        ) : (
          !listLoading && <p>No posts available.</p>
        )}
      </div>
      <div className="text-left mt-7">
        <h2 className="pl-5 mb-2">Altri contenuti simili</h2>
        <MoreLikeThis typeMedia={null} genre={null} favoriteMedia={null} />
      </div>
    </>
  );
};

export default ProductDetails;
