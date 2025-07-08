import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

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
  const[backdropUrl,setbackdropUrl] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const fetchMovie = async () => {
    const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
    const data = await response.json();
    setMovie(data);
    setbackdropUrl(`https://image.tmdb.org/t/p/w1920${data.backdrop_path}`);
    console.log(data);
  };

  const getMovieLogoPath = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`,API_OPTIONS
      );
      const data = await response.json();

      
      console.log(data)
  
      return null;
    } catch (err) {
      console.error('Error fetching logo:', err);
      setError(err);
      return null;
    }
  };

  useEffect(() => {
    fetchMovie();

        getMovieLogoPath(id)
      .then((url) => {
        setLogoUrl(url);
            console.log(logoUrl);
      })
      .catch(() => {
      });
  }, [id]);
  
  if (!movie) return <p>Loading...</p>;

  return (

<>
<Navbar/>

{/* image div */}
    <div className="relative movie-details text-white">
      <img src={backdropUrl} alt="" />
      {/* <img className='object-cover' src={posterUrl} alt="" /> */}
 

       <div className="absolute inset-0 bg-gradient-to-t  to-black" />
       <div className="absolute inset-0 bg-gradient-to-b  to-black" />


{/* inside image div */}
       <div className="absolute top-20 left-100">
             <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p>{movie.overview}</p>

       </div>
      



{/* <iframe
  src={`https://vidsrc.cc/v2/embed/movie/${movie.id}`}
  frameborder="0"
  allowfullscreen
  allow="fullscreen" 
  ></iframe> */}

{/* <iframe src={`https://vidlink.pro/movie/${movie.id}`} frameborder="0" allowfullscreen allow='fullscreen'></iframe> */}

    </div>
  </>
  );
};

export default MovieDetails;
