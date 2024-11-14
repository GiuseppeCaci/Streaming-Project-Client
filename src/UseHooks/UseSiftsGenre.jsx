import React from "react";
import { useSelector } from "react-redux";

const UseSiftsGenre = () => {
    const { postList, listLoading, listError } = useSelector((state) => state.listProducts);
    const typeMedia = useSelector((state) => state.listProducts.typeMedia);

    // Verifica che i dati siano caricati prima di eseguire il filtro
    if (listLoading) {
        return []; // Ritorna un array vuoto durante il caricamento
    }

    const filteredPostList = Array.isArray(postList)
        ? (typeMedia && typeMedia !== "general"
            ? postList.filter((item) => item.mediatype === typeMedia)
            : postList)
        : [];

    return filteredPostList;
};

export default UseSiftsGenre;
