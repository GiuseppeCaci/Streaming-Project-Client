import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import UseFetchAllPost from "../../UseHooks/UseFetchAllPost";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CategorySectionHome from "../general/CategorySectionHome";


const MediaCategory = () => {
    const { postBasicList, listLoading, listError } = useSelector((state) => state.listProducts);
    const { genere } = useParams();
    const [thisGenere, setThisGenere] = useState([]);

    useEffect(() => {
        if (postBasicList.length > 0 && genere) {
            const filteredPosts = postBasicList.filter(
                (element) => element.genere === genere
            );
            setThisGenere(filteredPosts);
        }
    }, [postBasicList, genere]);

    useEffect(() => {
        console.log("postBasicList",postBasicList)
    },[postBasicList])
    
    useEffect(() => {
        console.log("thisGenere",thisGenere)
    },[thisGenere])

    return (
        <>
         <div>
         {listLoading && <p>Loading...</p>}
         {listError && <p>Error: {listError}</p>}
         {thisGenere.length > 0 ? (
            <div>
                 <h2 className="text-left pl-3 text-white text-lg font-semibold font-sans">{genere}</h2>
               <div className="flex flex-wrap p-2 justify-start items-center">
               {thisGenere.map((element) => (
              <Link key={element._id} to={`/categories/${element.genere}/${element.titolo}`} className="
              basis-1/3 outline-none focus:outline-none 
              active:outline-none hover:text-white flex justify-center flex-col items-center">
               <img src={`/${element.locandina}`} alt={`${element.titolo}`} className="h-36 w-28 rounded-lg m-1" loading="lazy" />
             </Link>
               ))}
             </div>
             </div>
            ) : (
                !listLoading && <p>No posts available.</p>
            )}
         </div>
        </>
      )
}

export default MediaCategory