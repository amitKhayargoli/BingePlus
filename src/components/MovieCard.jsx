import React from "react";

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="relative movie-card cursor-pointer movie-card group "
    >
      <img
        loading="lazy"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
      />

      <div class="absolute inset-0 bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center flex-col space-y-3">
        <div class="px-4 py-2 bg-[var(--movie-cardbtn-primary)] text-black rounded-md font-semibold cursor-pointer">
          Watch now
        </div>
        <div class="px-4 py-2 bg-[var(--movie-card-secondary)] text-white rounded-md cursor-pointer">
          Details
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
