import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import icon from "/icon.png";
import youtube from "/Youtube.png";
import MovieCard from '../components/MovieCard';
import LazyLoad from 'react-lazyload';

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
  const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [backdropUrl, setbackdropUrl] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [error, setError] = useState(null);
  const[alternativeMovies,setAlternativeMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMovie = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
      const data = await response.json();

      const response2 = await fetch(`${API_BASE_URL}/movie/${id}/recommendations`, API_OPTIONS);
      const data2 = await response2.json();



      if (data2.Response === 'False') {
        setErrorMessage(data.Error);
        setAlternativeMovies([]);
        return;
      }
      setAlternativeMovies(data2.results || []);
    console.log(data2);
      setMovie(data);

    } catch (err) {
      console.error('Error fetching movie:', err);
      setError(err);
    }
    finally{
      setIsLoading(false);
    }
  };

  const getMovieLogoPath = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/${id}/images?api_key=${API_KEY}`,API_OPTIONS
      );
      const data = await response.json();
      console.log(data);
      const logo = data.logos.find(logo => logo.iso_639_1 === 'en') || data.logos[0];
      const url = data.backdrops[2].file_path;
      setbackdropUrl(`https://image.tmdb.org/t/p/w1920${url}`);

      console.log(url);
      if (logo) {
        return `https://image.tmdb.org/t/p/original${logo.file_path}`;
      }
      return null;
    } catch (err) {
      console.error('Error fetching logo:', err);
      return null;
    }
  };

  useEffect(() => {
      setMovie(null);
      setbackdropUrl(null);
      setLogoUrl(null);
      setAlternativeMovies([]);
     setIsBackdropLoaded(false); 

    fetchMovie();
    getMovieLogoPath()
      .then((url) => {
        setLogoUrl(url);
      })  
      .catch(() => {});
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const releasedYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  const formatRuntime = (min) => {
    if (!min) return 'N/A';
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}m`;
  };

  return (
    <>
      <Navbar />
      <div className="relative movie-details text-white">
        <img src={backdropUrl} alt={movie.title}  onLoad={() => setIsBackdropLoaded(true)} className="md:aspect-auto aspect-[9/16] w-full h-auto object-cover" />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

        {/* inside image div */}
        <div className="text-center absolute inset-0 flex flex-col items-center md:mt-20 gap-5 px-4 z-10 top-1/4 md:top-0">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${movie.title}`}
              className="mx-auto max-w-xs object-contain"
            />
          ) : (
            <h1 className="text-4xl font-bold">{movie.title}</h1>
          )}

          <h1 className="text-[#616161] font-semibold">
            {releasedYear} • {formatRuntime(movie.runtime)}
          </h1>

          <div className="flex gap-4">
            <div onClick={()=>navigate(`/watch/${id}`)} className="cursor-pointer flex p-3 bg-white text-black font-semibold rounded-lg items-center">
              <img className="w-3 mr-2" src={icon} alt="Watch Icon" />
              <h1 className="text-sm">Watch Now</h1>
            </div>
            <div className="cursor-pointer flex p-3 bg-black text-white font-semibold rounded-lg items-center">
              <img className="w-5 mr-2" src={youtube} alt="YouTube Icon" />
              <h1 className="text-sm">Watch Trailer</h1>
            </div>
          </div>

          <div>
            <h1 className="text-[#ffffff]">
              {Number(movie.vote_average.toFixed(1))} IMDB Rating
            </h1>

            <h1 className="italic text-[#737373]">"{movie.tagline}"</h1>
          </div>

          <div className="md:w-160 max-w-3xl">
            <h1 className="font-semibold">Synopsis</h1>
            <p className="text-[#8E8E8E]">{movie.overview}</p>
          </div>
        </div>
      </div>

{/* Alternative */}


  {/* <LazyLoad  offset={20} once>
      <div className='all-movies text-white text-xl font-bold px-12'>
          <h1>Recommended For You</h1>
          
            <ul>
              {alternativeMovies.slice(0,5).map((movie) => (
                // <MovieCard
                // key={movie.id}
                // movie={movie}
                // onClick={() => navigate(`/movies/${movie.id}`)}
                // />

                <img loading='lazy'  className='rounded-lg' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}></img>
              ))}
            </ul>

      </div>
</LazyLoad> */}

{isBackdropLoaded && (
  <div className="all-movies text-white text-xl font-bold px-12">
    <h1>Recommended For You</h1>
    <ul className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
      {alternativeMovies.slice(0, 5).map((movie) => (
        <img 
          key={movie.id}
          loading="lazy"
          className="rounded-lg cursor-pointer"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          onClick={() => navigate(`/movies/${movie.id}`)}
        />
      ))}
    </ul>
  </div>
)}
    </>
  );
};

export default MovieDetails;
