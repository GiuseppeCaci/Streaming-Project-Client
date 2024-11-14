import React, { useEffect, useState } from "react";
import UseFetchAllPost from "../UseHooks/UseFetchAllPost";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const SearchMediaRaccomanded = () => {
  const { postBasicList, listLoading, listError } = useSelector((state) => state.listProducts);
  const { accountConnect } = useSelector((state) => state.listFavoriteUser);



  return (
    <>
      {listLoading && <p>Loading...</p>}
      {listError && <p>Error: {listError}</p>}
      {postBasicList.length > 0 ? (
    <div>
          {postBasicList.map((element) => (
              <Link key={element._id} to={`/categories/${element.genere}/${element.titolo}`} className="my-2
               flex flex-row justify-between items-center text-white outline-none focus:outline-none 
               active:outline-none hover:text-white">
                <img src={`${element.locandina}`} alt={`${element.titolo}`} className="h-32 w-24 rounded-lg" loading="lazy" />
                <p>{element.titolo}</p>
                <PlayCircleOutlineIcon fontSize="large"></PlayCircleOutlineIcon>
              </Link>
          ))}
          </div>
      ) : (
        !listLoading && <p>No posts available.</p>
      )}
    </>
  );
};

export default SearchMediaRaccomanded;
