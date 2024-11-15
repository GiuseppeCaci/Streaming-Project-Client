import React, { useEffect, useState } from "react";
import UseFetchAllPost from "../UseHooks/UseFetchAllPost";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Carousel from "./Carousel";

const SearchResultNoMediaFound = () => {
  const { postBasicList, listLoading, listError } = useSelector((state) => state.listProducts);
  const { accountConnect } = useSelector((state) => state.listFavoriteUser);


  return (
    <>
      {listLoading && <p>Loading...</p>}
      {listError && <p>Error: {listError}</p>}
      {postBasicList.length > 0 ? (
           <div className="mt-3">
           <h2 className="text-left pl-3 text-white text-lg font-semibold font-sans">Top Risultati</h2>
          <div className="p-2">
             <Carousel typeMedia={null} genre={null} favoriteMedia={null} listMedia={null}></Carousel>
           </div>
           </div>
      ) : (
     <p>Loading..</p>
      )}
      {postBasicList.length > 0 ? (
            <div className="mt-3">
            <h2 className="text-left pl-3 text-white text-lg font-semibold font-sans">Film d'azione</h2>
           <div className="p-2">
              <Carousel typeMedia={null} genre={"azione"} favoriteMedia={null} listMedia={null}></Carousel>
            </div>
            </div>
        
      ) : (
     <p>Loading..</p>
      )}
         {postBasicList.length > 0 ? (
          <div className="mt-3">
          <h2 className="text-left pl-3 text-white text-lg font-semibold font-sans">Serie Tv divertenti</h2>
         <div className="p-2">
            <Carousel typeMedia={"serieTV"} genre={"commedia"} favoriteMedia={null} listMedia={null}></Carousel>
          </div>
          </div>
      ) : (
     <p>Loading..</p>
      )}
       {postBasicList.length > 0 ? (
        <div className="mt-3">
        <h2 className="text-left pl-3 text-white text-lg font-semibold font-sans">Film Horror</h2>
       <div className="p-2">
          <Carousel typeMedia={"film"} genre={"horror"} favoriteMedia={null} listMedia={null}></Carousel>
        </div>
        </div>
      ) : (
     <p>Loading..</p>
      )}
        {postBasicList.length > 0 ? (
        <div className="mt-3">
        <h2 className="text-left pl-3 text-white text-lg font-semibold font-sans">Documentari premiati</h2>
       <div className="p-2">
          <Carousel typeMedia={null} genre={"documentario"} favoriteMedia={null} listMedia={null}></Carousel>
        </div>
        </div>
      ) : (
     <p>Loading..</p>
      )}
    </>
  );
};

export default SearchResultNoMediaFound;
