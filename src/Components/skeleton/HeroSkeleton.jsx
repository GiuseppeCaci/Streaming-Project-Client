import React from "react";

const HeroSkeleton = () => {
  return (
    <>
      <div
        className="w-80 h-106 border-solid border-half border-netflixSkeleton
        flex justify-end items-center flex-col bg-netflixSkeleton rounded-l animate-pulse rounded-md"
      >
        <div className="h-3 bg-netflixSkeleton2 rounded-full dark:bg-gray-700 w-11/12 mb-4"></div>
        <div className="flex">
          <div className="bg-netflixSkeleton2 rounded-lg dark:bg-gray-700 w-36 h-10 mb-4 m-1"></div>
          <div className="bg-netflixSkeleton2 rounded-lg dark:bg-gray-700 w-36 h-10 mb-4 m-1"></div>
        </div>
      </div>
    </>
  );
};

export default HeroSkeleton;
