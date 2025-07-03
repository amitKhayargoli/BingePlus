import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async () => {
    const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
    const data = await response.json();
    setMovie(data);
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details p-10 text-white">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p>{movie.overview}</p>

{/* <iframe
  src={`https://vidsrc.cc/v2/embed/movie/${movie.id}`}
  frameborder="0"
  allowfullscreen
  allow="fullscreen" 
></iframe> */}

<iframe src={`https://vidlink.pro/movie/${movie.id}`} frameborder="0" allowfullscreen allow='fullscreen'></iframe>

    </div>
  );
};

export default MovieDetails;
