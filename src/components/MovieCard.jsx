import React, { useState } from "react";
import { Blurhash } from "react-blurhash";

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language, blur_hash },
  onClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      onClick={onClick}
      className="relative movie-card cursor-pointer movie-card group "
    >
      {!imageLoaded && blur_hash && (
        <Blurhash
          hash={blur_hash}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className="absolute inset-0"
        />
      )}
      <img
        loading="lazy"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        onLoad={handleImageLoad}
        className={`w-full h-full object-cover ${!imageLoaded && blur_hash ? "opacity-0" : "opacity-100"}`}
        style={{ transition: "opacity 0.3s ease-in-out" }}
      />

      <div className="absolute inset-0 bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center flex-col space-y-3">
        <div className="px-4 py-2 bg-[var(--movie-cardbtn-primary)] text-black rounded-md font-semibold cursor-pointer">
          Watch now
        </div>
        <div className="px-4 py-2 bg-[var(--movie-card-secondary)] text-white rounded-md cursor-pointer">
          Details
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
