import React from "react";
import BlurImage from "./BlurImage";

const ShowCard = ({ show: { poster_path, name }, onClick }) => {
  const imageSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : "/no-movie.png";

  return (
    <div
      onClick={onClick}
      className="relative movie-card cursor-pointer movie-card group"
    >
      <div className="w-full aspect-[2/3]">
        <BlurImage src={imageSrc} alt={name} />
      </div>

      <div class="absolute inset-0 bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center flex-col space-y-3">
        <div class="px-4 py-2 bg-white text-black rounded-md font-semibold cursor-pointer">
          Watch now
        </div>
        <div class="px-4 py-2 bg-[#292929b9] text-white rounded-md cursor-pointer">
          Details
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
