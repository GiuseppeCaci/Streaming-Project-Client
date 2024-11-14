import React, { useEffect, useState } from "react";
import UseFetchAllPost from "../UseHooks/UseFetchAllPost";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Carousel from "./Carousel";

const SearchResultOneFound = ({ searchResultMedia }) => {
  const { postBasicList, listLoading, listError } = useSelector((state) => state.listProducts);
  const { accountConnect } = useSelector((state) => state.listFavoriteUser);
  const [mediaAndSameGenre, setMediaAndSameGenre] = useState([]);
  const [sameActors, setSameActors] = useState([]);
  const [sameCountry, setSameCountry] = useState([]);
  const [sameDirector, setSameDirector] = useState([]);

//filtro contenuto e lo metto con lo stesso genere
useEffect(() => {
    if (postBasicList && searchResultMedia.length > 0) {
        const genreMedia = searchResultMedia[0].genere;
        const sameGenre = postBasicList.filter((element) =>
            element.genere === genreMedia &&
            !searchResultMedia.some((media) => media._id === element._id)
          );
        setMediaAndSameGenre([...searchResultMedia, ...sameGenre]);
    }
  }, [postBasicList, searchResultMedia]);

  //filtro contenuto e lo metto con lo stessi attori
useEffect(() => {
    if (postBasicList && searchResultMedia.length > 0) {
        const actorsMedia = searchResultMedia[0].attori;
        const sameActors = postBasicList.filter((element) =>
            element.attori === actorsMedia &&
            !searchResultMedia.some((media) => media._id === element._id)
          );
          setSameActors(sameActors);
    }
  }, [postBasicList, searchResultMedia]);

    //filtro contenuto e lo metto con lo stesso paese
useEffect(() => {
    if (postBasicList && searchResultMedia.length > 0) {
        const countryMedia = searchResultMedia[0].paese;
        const sameCountrys = postBasicList.filter((element) =>
            element.paese === countryMedia &&
            !searchResultMedia.some((media) => media._id === element._id)
          );
          setSameCountry(sameCountrys);
    }
  }, [postBasicList, searchResultMedia]);

      //filtro contenuto e lo metto con lo stesso regista
useEffect(() => {
    if (postBasicList && searchResultMedia.length > 0) {
        const directorMedia = searchResultMedia[0].regista;
        const sameDirector = postBasicList.filter((element) =>
            element.regista === directorMedia &&
            !searchResultMedia.some((media) => media._id === element._id)
          );
          setSameDirector(sameDirector);
    }
  }, [postBasicList, searchResultMedia]);




  return (
    <>
      {listLoading && <p>Loading...</p>}
      {listError && <p>Error: {listError}</p>}
      {mediaAndSameGenre.length > 0 ? (
           <div className="mt-3">
           <h2 className="text-left pl-3 text-white text-lg font-semibold font-sans">Top Risultati</h2>
          <div className="p-2">
             <Carousel typeMedia={null} genre={null} favoriteMedia={null} listMedia={mediaAndSameGenre}></Carousel>
           </div>
           </div>
      ) : (
     <p>Loading..</p>
      )}
      {sameActors.length > 0 ? (
            <div className="mt-3">
            <h2 className="text-left pl-3 text-white text-lg font-semibold font-sans">Cast Simili</h2>
           <div className="p-2">
              <Carousel typeMedia={null} genre={null} favoriteMedia={null} listMedia={sameActors}></Carousel>
            </div>
            </div>
        
      ) : (
     <p>Loading..</p>
      )}
         {sameCountry.length > 0 ? (
          <div className="mt-3">
          <h2 className="text-left pl-3 text-white text-lg font-semibold font-sans">Stesso Paese di produzione</h2>
         <div className="p-2">
            <Carousel typeMedia={null} genre={null} favoriteMedia={null} listMedia={sameCountry}></Carousel>
          </div>
          </div>
      ) : (
     <p>Loading..</p>
      )}
       {sameDirector.length > 0 ? (
        <div className="mt-3">
        <h2 className="text-left pl-3 text-white text-lg font-semibold font-sans">Altre opere dello stesso regista</h2>
       <div className="p-2">
          <Carousel typeMedia={null} genre={null} favoriteMedia={null} listMedia={sameDirector}></Carousel>
        </div>
        </div>
      ) : (
     <p>Loading..</p>
      )}
    </>
  );
};

export default SearchResultOneFound;
