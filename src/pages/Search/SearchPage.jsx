import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { OperationSearchResult } from "../../Redux/Features/Products/OperationSlice";
import UseFetchAllPost from "../../UseHooks/UseFetchAllPost";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchMediaRaccomanded from "../../Components/SearchComponents/SearchMediaRaccomanded";
import SearchResultMoreOne from "../../Components/SearchComponents/SearchResultMoreOne";
import SearchResultOneFound from "../../Components/SearchComponents/SearchResultOneFound";
import SearchResultNoMediaFound from "../../Components/SearchComponents/SearchResultNoMediaFound";

const SearchPage = () => {
  const dispatch = useDispatch();
  const { postList, listLoading, listError } = UseFetchAllPost();
  const [nameSearch, setNameSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const { actionSearchResult } = useSelector((state) => state.listOperation);
  const navigate = useNavigate();

  // Funzione per gestire il cambio nel campo di ricerca
  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setNameSearch(searchQuery);

    // Se la query di ricerca è vuota, non fare niente
    if (searchQuery === "") {
      setFilteredResults([]);
      return;
    }

    // Funzione per verificare se un campo contiene la stringa di ricerca
    const matchesSearchQuery = (fieldValue) => {
      if (Array.isArray(fieldValue)) {
        return fieldValue.some((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (typeof fieldValue === "string") {
        return fieldValue.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    };

    // Esegui la ricerca sui vari campi
    const results = postList.filter(
      (element) =>
        matchesSearchQuery(element.titolo) ||
        matchesSearchQuery(element.annouscita) ||
        matchesSearchQuery(element.attori) ||
        matchesSearchQuery(element.background) ||
        matchesSearchQuery(element.descrizione) ||
        matchesSearchQuery(element.formatodistribuzione) ||
        matchesSearchQuery(element.genere) ||
        matchesSearchQuery(element.lingua) ||
        matchesSearchQuery(element.mediatype) ||
        matchesSearchQuery(element.paese) ||
        matchesSearchQuery(element.premi) ||
        matchesSearchQuery(element.regista)
    );

    setFilteredResults(results);
    dispatch(OperationSearchResult(filteredResults));
  };

  return (
    <>
      <div>
        <div className="flex justify-start items-center fixed top-0 left-0 w-full py-5 bg-black bg-opacity-90 backdrop-blur-lg z-50">
          <Link to="/">
            <ArrowBackIosNewIcon
              fontSize="large"
              className="mx-1 text-white"
            ></ArrowBackIosNewIcon>
          </Link>
          <div className=" flex justify-between items-center bg-netflixLightGray w-10/12 p-1 rounded-md ">
            <SearchIcon className=" text-white pl-2" fontSize="large" />
            <input
              type="text"
              value={nameSearch}
              onChange={handleSearchChange}
              placeholder="film, serie Tv, documentari.."
              className="w-3/4 bg-netflixLightGray border-none outline-none 
                 focus:outline-none active:outline-none hover:outline-none 
                 placeholder-gray-400 caret-white caret-w-2 text-sm font-light text-white"
            />
          </div>
        </div>

        {!nameSearch && (
          <div className="mt-24 mx-5">
            <h2 className="text-left mb-1 pl-1 text-white text-lg font-semibold font-sans">
              Film e Serie Tv Raccomadati
            </h2>
            <SearchMediaRaccomanded></SearchMediaRaccomanded>
          </div>
        )}

        {/* Mostra i risultati della ricerca in tempo reale */}
        { nameSearch && (
  <>
    {filteredResults.length > 1 ? (
      <div className="mt-24">
        <h2 className="text-left pl-6 text-white text-lg font-semibold font-sans">Film & TV</h2>
        <SearchResultMoreOne searchResultMedia={filteredResults} />
      </div>
    ) : filteredResults.length === 1 ? (
      <div className="mt-24">
        <SearchResultOneFound searchResultMedia={filteredResults} />
      </div>
    ) : (
      <div className="mt-24 text-center text-gray-500">
        <SearchResultNoMediaFound/>
      </div>
    )}
  </>
)}

        {/* Visualizzazione dello stato di caricamento e errori */}
        <div className="mt-10">
          {listLoading && <p>Loading...</p>}
          {listError && <p>Error: {listError}</p>}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
