import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CarouselSkeleton from "./skeleton/CarouselSkeleton";

const Carousel = ({ typeMedia, genre, favoriteMedia, listMedia }) => {
  
  //chiamo lo stato dei post salvati e controllo se l'user è connesso
  const { postBasicList, listLoading, listError } = useSelector((state) => state.listProducts);
  const { accountConnect } = useSelector((state) => state.listFavoriteUser);


  //funzione per setacciare i media selezionati nei props
  const [filteredItems, setFilteredItems] = useState([]);

  const filterItems = () => {
    let filteredList = [...postBasicList];

    if (typeMedia) {
      filteredList = filteredList.filter((element) => element.mediatype === typeMedia);
    }
    if (genre) {
      filteredList = filteredList.filter((element) => element.genere === genre);
    }
    if (favoriteMedia && accountConnect) {
      filteredList = filteredList.filter((element) => accountConnect.mediaIds.includes(element._id));
    } 
    if(listMedia){
        filteredList = listMedia;
    }
    setFilteredItems(filteredList);
  };

  //chiamo la funzione di setaggio se i dati sono presenti
  useEffect(() => {
    if (postBasicList) {
      filterItems();
    }
  }, [postBasicList, typeMedia, genre, favoriteMedia, accountConnect]);

//gestisco la quantità di slide nei diversi responsive
const [slidesPerView, setSlidesPerView] = useState(4);
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 640) {
      setSlidesPerView(4);
    } else if (window.innerWidth < 768) {
      setSlidesPerView(4);
    } else if (window.innerWidth < 1024) {
      setSlidesPerView(5);
    } else {
      setSlidesPerView(8);
    }
  };

  handleResize(); // Chiamata iniziale
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  return (
    <>
      {listLoading && <div className="flex justify-center items-center">
        <CarouselSkeleton></CarouselSkeleton>
        </div>}
      {listError && <p>Error: {listError}</p>}
      {filteredItems.length > 0 ? (
        <Swiper
          spaceBetween={7}
          slidesPerView={slidesPerView}
          pagination={{ clickable: true }}
          autoplay={filteredItems.length > 4 ? { delay: 2000 } : false}
         className="z-0 flex justify-start"
        >
          {filteredItems.map((element) => (
            <SwiperSlide key={element._id}>
              <Link to={`/categories/${element.genere}/${element.titolo}`} className="block">
                <img src={`/${element.locandina}`} alt={`${element.titolo}`} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        !listLoading &&  <CarouselSkeleton></CarouselSkeleton>
      )}
    </>
  );
};

export default Carousel;
