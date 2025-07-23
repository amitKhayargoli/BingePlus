import React from "react";

const ShowCard = ({ show: { poster_path }, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative movie-card cursor-pointer movie-card group "
    >
      <img
        loading="lazy"
        src={
          poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : ""
        }
      />

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
