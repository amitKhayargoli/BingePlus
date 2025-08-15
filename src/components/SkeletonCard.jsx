import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse">
      <div className="relative w-full h-[300px] bg-violet-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-700 to-transparent skeleton-shine"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
