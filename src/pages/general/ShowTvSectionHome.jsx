import React from "react";
import Carousel from "../../Components/Carousel";
import HeroMediaRandom from "../../Components/HeroMediaRandom";
import UseResetVisibility from "../../UseHooks/UseResetVisibility";

const ShowTvSectionHome = () => {

  //azzera l'asse Y dello schermo quando ricarichi la pagina
  UseResetVisibility();

return (
  <>
 <div className="mb-28">
    <div className="pt-36 bg-gradient-to-t from-black to-netflixLightGray">
    <HeroMediaRandom typeMedia={"serieTV"}></HeroMediaRandom>
    </div>
<div>
<h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Serie TV presenti nel catalogo</h2>
      <Carousel typeMedia={"serieTV"} genre={null} favoriteMedia={null}></Carousel>
  </div>
  <div>
  <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">La tua lista preferiti</h2>
      <Carousel typeMedia={"serieTV"} genre={null} favoriteMedia={"yes"}></Carousel>
  </div>
  <div>
  <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">SitCom divertenti</h2>
      <Carousel typeMedia={"serieTV"} genre={"commedia"} favoriteMedia={null}></Carousel>
  </div>
  <div>
  <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Premiate dalla critica</h2>
      <Carousel typeMedia={"serieTV"} genre={null} favoriteMedia={null}></Carousel>
  </div>
  <div>
  <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Di fantascienza</h2>
      <Carousel typeMedia={"serieTV"} genre={"fantascienza"} favoriteMedia={null}></Carousel>
  </div>
  <div>
  <h2 className="pb-2 text-left mt-8 mb-1 pl-3 text-white text-lg font-semibold font-sans">Uscite di recente</h2>
      <Carousel typeMedia={"serieTV"} genre={null} favoriteMedia={null}></Carousel>
  </div>

</div>

  </>
)
}

export default ShowTvSectionHome