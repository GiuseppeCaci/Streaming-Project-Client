import React from "react";
import Carousel from "../../Components/Carousel";
import HeroMediaRandom from "../../Components/HeroMediaRandom";
import UseResetVisibility from "../../UseHooks/UseResetVisibility";

const MovieSectionHome = () => {



return (
  <>
 <div className="mb-28">
    <div className="pt-36 bg-gradient-to-t from-black to-netflixLightGray">
    <HeroMediaRandom typeMedia={"film"}></HeroMediaRandom>
    </div>
<div>
<h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Film presenti nel catalogo</h2>
      <Carousel typeMedia={"film"} genre={null} favoriteMedia={null}></Carousel>
  </div>
  <div>
  <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">La tua lista preferiti</h2>
      <Carousel typeMedia={"film"} genre={null} favoriteMedia={"yes"}></Carousel>
  </div>
  <div>
  <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Film premiati</h2>
      <Carousel typeMedia={"film"} genre={null} favoriteMedia={null}></Carousel>
  </div>
  <div>
  <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">film d'azione</h2>
      <Carousel typeMedia={"film"} genre={"azione"} favoriteMedia={null}></Carousel>
  </div>
  <div>
  <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Film tratti da Libri</h2>
      <Carousel typeMedia={"film"} genre={null} favoriteMedia={null}></Carousel>
  </div>
  <div>
  <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Documentari</h2>
      <Carousel typeMedia={"film"} genre={"documentario"} favoriteMedia={null}></Carousel>
  </div>

</div>

  </>
)
}

export default MovieSectionHome