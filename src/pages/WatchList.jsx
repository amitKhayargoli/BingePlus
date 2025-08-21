import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useWatchlist from '../hooks/useWatchlist';
import { Trash2 } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import ShowCard from '../components/ShowCard';

const WatchList = () => {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist } = useWatchlist();

  const handleNavigate = (item) => {
    if (item.media_type === 'movie') {
      navigate(`/movies/${item.id}`);
    } else {
      navigate(`/tv/${item.id}`);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-18 mt-20 md:mt-10">
        <h1 className="text-4xl font-bold text-white mb-4">My Watchlist</h1>
        
        {watchlist.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <h2 className="text-xl mb-4">Your watchlist is empty</h2>
            <p>Start adding movies and TV shows to keep track of what you want to watch!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watchlist.map((item) => (
              <div key={item.id} className="relative group">
                {item.media_type === 'movie' ? (
                  <MovieCard movie={item} onClick={() => handleNavigate(item)} />
                ) : (
                  <ShowCard show={item} onClick={() => handleNavigate(item)} />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWatchlist(item.id, item.media_type);
                  }}
                  className="absolute top-2 right-2 z-10 p-2 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
                <div className="p-2 mt-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">
                      {item.media_type.toUpperCase()}
                    </span>
                    <span className="text-gray-400">
                      Added {formatDate(item.added_at)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WatchList;