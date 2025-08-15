import React from "react";
import BlurImage from "./BlurImage";

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
  onClick,
}) => {
  const imageSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : "/no-movie.png";

  return (
    <div
      onClick={onClick}
      className="relative movie-card cursor-pointer movie-card group overflow-hidden rounded-lg"
    >
      <div className="w-full aspect-[2/3] overflow-hidden">
        <BlurImage src={imageSrc} alt={title} />
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-40 group-hover:opacity-100 transition duration-300 flex items-center justify-center flex-col space-y-3">
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
