import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { connectListFavorite } from "../../Redux/Features/FavoritesMedia/FavoriteSlice";

const MyListMedia = () => {
    const dispatch = useDispatch();
  const { postBasicList, listLoading, listError } = useSelector((state) => state.listProducts);
  const { accountConnect } = useSelector((state) => state.listFavoriteUser);
  const userLoginCheck = JSON.parse(localStorage.getItem("user"));
  const userListFavorites = JSON.parse(localStorage.getItem("favoritesList"));

  useEffect(() => {
    if (userListFavorites) {
      dispatch(connectListFavorite(userListFavorites));
      console.log("Home,lista preferiti caricata:", userListFavorites);
    } else {
      console.log("home, listFavorties: nessun accesso eseguito");
    }
  }, []);
  
  const [filteredItems, setFilteredItems] = useState([]);

  // Funzione per filtrare gli elementi
  const filterItems = () => {
    let filteredList = [...postBasicList];

    // Verifica se userListFavorites e mediaIds sono validi
    if (userListFavorites && Array.isArray(userListFavorites.mediaIds)) {
      filteredList = filteredList.filter((element) =>
        userListFavorites.mediaIds.includes(element._id)
      );
    } else {
      // Se mediaIds non è un array valido, non filtrare
      filteredList = [];
    }

    // Aggiorna solo se la lista è diversa dalla precedente
    if (JSON.stringify(filteredList) !== JSON.stringify(filteredItems)) {
      setFilteredItems(filteredList);
    }
  };

  // Esegui il filtro quando postBasicList, userListFavorites o accountConnect cambiano
  useEffect(() => {
    if (postBasicList && accountConnect) {
      filterItems();
    }
  }, [postBasicList, accountConnect, userListFavorites]);
  

  return (
    <>
      {userLoginCheck ? (
        <>
          {listLoading && <p>Loading...</p>}
          {listError && <p>Error: {listError}</p>}
          {filteredItems.length > 0 ? (
            <div className="mt-20 h-screen">
                  <h2 className="text-left mb-1 pl-10 text-white text-lg font-semibold font-sans">La tua lista preferiti</h2>
                  <div className="flex flex-wrap p-2 justify-center items-center">
  {filteredItems.map((element) => (
    <Link
      key={element._id}
      to={`/categories/${element.genere}/${element.titolo}`}
      className="outline-none focus:outline-none active:outline-none hover:text-white 
                 flex justify-center flex-col items-center
                 basis-2/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
    >
      <img
        src={element.locandina}
        alt={element.titolo}
        className="h-36 w-28 sm:h-40 sm:w-32 md:h-44 md:w-36 lg:h-48 lg:w-40 rounded-lg m-1" loading="lazy"
      />
    </Link>
  ))}
</div>
            </div>
          ) : (
            <p>No favorite media found</p>
          )}
        </>
      ) : (
        <>
          <p>Non hai accesso a questa pagina, accedi.</p>
        </>
      )}
    </>
  );
};

export default MyListMedia;
