import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MoreLikeThis = ({ typeMedia, genre, favoriteMedia }) => {
  // Estraggo i dati dallo stato globale tramite Redux
  const { postBasicList, listLoading, listError } = useSelector((state) => state.listProducts);
  const { accountConnect } = useSelector((state) => state.listFavoriteUser);
  
  // Stato per tenere traccia degli elementi filtrati che verranno visualizzati
  const [filteredItems, setFilteredItems] = useState([]);

  // Funzione che applica i filtri sulla lista dei media
  const filterItems = () => {
    let filteredList = [...postBasicList];

    // Filtra per tipo di media (film, serie, ecc.)
    if (typeMedia) {
      filteredList = filteredList.filter((element) => element.mediatype === typeMedia);
    }
    // Filtra per genere, ad esempio azione, drammatico, ecc.
    if (genre) {
      filteredList = filteredList.filter((element) => element.genere === genre);
    }
    // Se ci sono media preferiti e l'utente è connesso, filtra i media che sono nei preferiti dell'utente
    if (favoriteMedia && accountConnect) {
      filteredList = filteredList.filter((element) => accountConnect.mediaIds.includes(element._id));
    }
    // Aggiorna lo stato con i media filtrati
    setFilteredItems(filteredList);
  };

  // Effettua il filtraggio ogni volta che cambiano i dati rilevanti (lista dei media, tipo, genere, preferiti, ecc.)
  useEffect(() => {
    if (postBasicList) {
      filterItems();
    }
  }, [postBasicList, typeMedia, genre, favoriteMedia, accountConnect]);

  return (
    <>
      {/* Mostra il messaggio di caricamento se i dati sono in fase di caricamento */}
      {listLoading && <p>Loading...</p>}
      {/* Mostra l'errore nel caso ci sia un problema nel recupero dei dati */}
      {listError && <p>Error: {listError}</p>}
      
      {/* Mostra i media filtrati, se presenti */}
      {filteredItems.length > 0 ? (
        <div className="flex flex-wrap justify-start items-start">
          {filteredItems.map((element) => (
         <div key={element._id} className="basis-1/3 md:basis-1/5 lg:basis-1/6 xl:basis-1/6 flex flex-wrap justify-center items-center p-1">
  <Link to={`/categories/${element.genere}/${element.titolo}`} className="block">
    {/* Mostra l'immagine del media con un link che porta alla pagina dedicata */}
    <img src={`/${element.locandina}`} alt={`${element.titolo}`} className="w-32" />
  </Link>
</div>

          ))}
        </div>
      ) : (
        // Se non ci sono media disponibili, mostra un messaggio
        !listLoading && <p>No posts available.</p>
      )}
    </>
  );
};

export default MoreLikeThis;
