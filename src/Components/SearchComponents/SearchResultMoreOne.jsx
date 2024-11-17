import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchResultMoreOne = ({ searchResultMedia }) => {
  const { postBasicList, listLoading, listError } = useSelector((state) => state.listProducts);
  const [remainingResults, setCombinedResults] = useState([]);


  useEffect(() => {
    if (postBasicList && searchResultMedia) {
      const primaryResults = postBasicList.filter((element) =>
        searchResultMedia.includes(element.titolo.toLowerCase())
      );

      const remainingResults = postBasicList.filter(
        (element) => !primaryResults.includes(element)
      );

      setCombinedResults([...primaryResults, ...remainingResults]);
    }
  }, [postBasicList, searchResultMedia]);

  return (
    <>
      {listLoading && <p>Loading...</p>}
      {listError && <p>Error: {listError}</p>}
      {remainingResults.length > 0 ? (
       <div className="flex flex-wrap p-2 justify-start items-center">
          {remainingResults.map((element) => (
         <Link key={element._id} to={`/categories/${element.genere}/${element.titolo}`} className="
         basis-1/3 lg:basis-1/6 md:basis-1/4 outline-none focus:outline-none 
         active:outline-none hover:text-white flex justify-center flex-col items-center">
          <img src={`${element.locandina}`} alt={`${element.titolo}`} className="rounded-lg p-1" loading="lazy"/>
        </Link>
          ))}
        </div>
      ) : (
     <p>Loading..</p>
      )}
    </>
  );
};

export default SearchResultMoreOne;
