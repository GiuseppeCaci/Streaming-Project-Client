import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//redux
import {
  addMediaInFavoriteList,
  removeMediaInFavoriteList,
} from "../../Redux/Features/Api/ListFavoriteUserApi";
import { connectListFavorite } from "../../Redux/Features/FavoritesMedia/FavoriteSlice";
//icone
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from '@mui/icons-material/Lock';
import HeroSkeleton from "../skeleton/HeroSkeleton";

const HeroMediaRandom = ({ typeMedia }) => {
  const dispatch = useDispatch();
  const [mediaRandom, setMediaRandom] = useState();
  const userLoginCheck = JSON.parse(localStorage.getItem("user"));
  const userListFavorites = JSON.parse(localStorage.getItem("favoritesList"));
  const [isFavorite, setIsFavorite] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const { postBasicList, listLoading, listError } = useSelector((state) => state.listProducts);


  const filterItems = () => {
    let filteredList = [...postBasicList];

    if (typeMedia === "film") {
      filteredList = filteredList.filter(
        (element) => element.mediatype === "film"
      );
    }
    if (typeMedia === "serieTV") {
      filteredList = filteredList.filter(
        (element) => element.mediatype === "serieTV"
      );
    }
    setFilteredItems(filteredList);
  };

  useEffect(() => {
    if (postBasicList) {
      filterItems();
    }
  }, [postBasicList, typeMedia]);

  useEffect(() => {
    const savedMedia = localStorage.getItem(`media_${typeMedia}`);
    if (savedMedia) {
        setMediaRandom(JSON.parse(savedMedia));
    } else if (filteredItems && filteredItems.length > 0) {
        const randomNumber = Math.floor(Math.random() * filteredItems.length);
        const selectedMedia = filteredItems[randomNumber];
        setMediaRandom(selectedMedia);
        localStorage.setItem(`media_${typeMedia}`, JSON.stringify(selectedMedia));
    }
}, [filteredItems, typeMedia]);


  useEffect(() => {
    if (userListFavorites && mediaRandom) {
      const foundFavorite = userListFavorites.mediaIds.includes(
        mediaRandom._id
      );
      setIsFavorite(foundFavorite);
    }
  }, []);

  const handleAddRemoveFavorite = () => {
    if (userLoginCheck) {
      const userID = userLoginCheck.id;
      const mediaID = mediaRandom._id;
      if (!isFavorite) {
        dispatch(addMediaInFavoriteList(userID, mediaID))
          .then((response) => {
            const updatedFavorites = response.data.data;
            setIsAnimating(true);
            localStorage.setItem(
              "favoritesList",
              JSON.stringify(updatedFavorites)
            );
            dispatch(connectListFavorite(updatedFavorites));
            setTimeout(() => {
              setIsAnimating(false);
              setIsFavorite(true);
            }, 400);
          })
          .catch((error) => {
            console.error(
              "Errore nell'aggiungere il media ai preferiti",
              error
            );
          });
      } else {
        dispatch(removeMediaInFavoriteList(userID, mediaID))
          .then((response) => {
            const updatedFavorites = response.data.data;
            setIsAnimating(true);
            localStorage.setItem(
              "favoritesList",
              JSON.stringify(updatedFavorites)
            );
            dispatch(connectListFavorite(updatedFavorites));
            setTimeout(() => {
              setIsAnimating(false);
              setIsFavorite(false);
            }, 400);
          })
          .catch((error) => {
            console.error("Errore nel rimuovere il media ai preferiti", error);
          });
      }
    }
  };

  return (
    <>
      {listLoading && <div className="flex justify-center items-center">
          <p>prova</p>
        </div>}
      {listError && <p>Error: {listError}</p>}
      {mediaRandom ? (
        <div className="flex justify-center items-center flex-col relative">
          <Link to={`/categories/${mediaRandom.genere}/${mediaRandom.titolo}`}>
          <img
  className="max-w-80 h-auto border-solid border-half border-netflixGrayBorder rounded-lg" loading="lazy"
  style={{ boxShadow: "0 5px 10px rgba(68, 26, 26, 0.4)" }}
  src={`${mediaRandom.locandina}`}
/>
          </Link>
          <div className="absolute bottom-14 w-80 p-4 flex justify-between items-center text-white z-1 text-sm">
            <p className="px-1">{mediaRandom.genere}</p>
            <p className="px-1">•</p>
            <p className="px-1">{mediaRandom.paese}</p>
            <p className="px-1">•</p>
            <p className="px-1">{mediaRandom.mediatype}</p>
          </div>
          <div className="absolute bottom-0 w-80 p-4 flex justify-between items-center text-white">
          <button className="flex justify-center items-center rounded-md w-36 h-10 mr-1 border border-white bg-white outline-none focus:outline-none active:outline-none hover:outline-none">
  <Link
    to={`/categories/${mediaRandom.genere}/${mediaRandom.titolo}`}
    className="text-black flex items-center outline-none focus:outline-none active:outline-none hover:outline-none"
  >
    <PlayArrowIcon fontSize="large" className="pointer-events-none" />
    Play
  </Link>
</button>

            {userLoginCheck ? (
              <>
                <button
                  className={`bg-netflixLightGray flex justify-center items-center bg-opacity-90 rounded-md w-36 ml-1 h-10
    border-none outline-none focus:outline-none active:outline-none hover:outline-none`}
                  onClick={handleAddRemoveFavorite}
                >
                  {isFavorite ? (
                    <>
                      <CheckIcon
                        fontSize="large"
                        className={`${
                          isAnimating ? "rotate-center-left" : ""
                        } outline-none focus:outline-none active:outline-none hover:outline-none`}
                      />
                      My List
                    </>
                  ) : (
                    <>
                      <AddIcon
                        fontSize="large"
                        className={`${
                          isAnimating ? "rotate-center-right" : ""
                        } outline-none focus:outline-none active:outline-none hover:outline-none`}
                      />
                      My List
                    </>
                  )}
                </button>
              </>
            ) : (
              <button       className={`bg-netflixLightGray flex justify-center items-center bg-opacity-90 rounded-md w-36 ml-1 h-10
                border-none outline-none focus:outline-none active:outline-none hover:outline-none`}>
                 <LockIcon
                        fontSize="medium"
                        className={`${
                          isAnimating ? "rotate-center-right" : ""
                        } outline-none focus:outline-none active:outline-none hover:outline-none pr-1`}
                      />
              My List
              </button>
            )}
          </div>
        </div>
      ) : (
        !listLoading && <div className="flex justify-center items-center">
         <HeroSkeleton></HeroSkeleton></div>
      )}
    </>
  );
};

export default HeroMediaRandom;
