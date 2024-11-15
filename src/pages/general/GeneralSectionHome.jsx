import React from "react";
import Carousel from "../../Components/Carousel";
import HeroMediaRandom from "../../Components/HeroMediaRandom";


const GeneralSectionHome = () => {

    return (
        <>
  <div className="mb-28">
    <div className="pt-28 bg-gradient-to-t from-black to-netflixLightGray">
    <HeroMediaRandom typeMedia={null}></HeroMediaRandom>
    </div>
    <div>
            <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Titoli presenti nel catalogo</h2>
            <Carousel typeMedia={null} genre={null} favoriteMedia={null}></Carousel>
        </div>
        <div>
            <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">La tua lista</h2>
            <Carousel typeMedia={null} genre={null} favoriteMedia={"yes"}></Carousel>
        </div>
        <div>
        <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Film premiati</h2>
            <Carousel typeMedia={"film"} genre={null} favoriteMedia={null}></Carousel>
        </div>
        <div>
        <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Serie Tv</h2>
            <Carousel typeMedia={"serieTV"} genre={null} favoriteMedia={null}></Carousel>
        </div>
        <div>
        <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Storie di fantascienza</h2>
            <Carousel typeMedia={null} genre={"fantascienza"} favoriteMedia={null}></Carousel>
        </div>
        <div>
        <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Sit com</h2>
            <Carousel typeMedia={"serieTV"} genre={"commedia"} favoriteMedia={null}></Carousel>
        </div>

    </div>
    
        </>
      )
}

export default GeneralSectionHome