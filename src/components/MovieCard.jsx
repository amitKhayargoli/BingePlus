import React from "react";
import BlurImage from "./BlurImage";

const MovieCard = ({
  movie: { title, vote_average, poster_path },
  onClick,
}) => {
  // Low-res image for placeholder
  const lowResSrc = poster_path
    ? `https://image.tmdb.org/t/p/w154/${poster_path}` // small version
    : "/no-movie.png";

  // High-res image
  const highResSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : "/no-movie.png";

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group overflow-hidden rounded-lg w-full"
    >
      {/* Fixed aspect ratio to reserve space */}
      <div className="w-full aspect-[2/3] overflow-hidden">
        <BlurImage src={highResSrc} lowSrc={lowResSrc} alt={title} />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center flex-col space-y-3">
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
