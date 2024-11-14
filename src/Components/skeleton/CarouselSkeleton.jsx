import React from "react";

const CarouselSkeleton = () => {
  return (
    <>
      <div className="bg-black w-screen h-44 flex items-center justify-between animate-pulse">
     <div className="bg-netflixSkeleton w-24 h-32"></div>
     <div className="bg-netflixSkeleton w-24 h-32"></div>
     <div className="bg-netflixSkeleton w-24 h-32"></div>
     <div className="bg-netflixSkeleton w-24 h-32"></div>
      </div>
    </>
  );
};

export default CarouselSkeleton;
