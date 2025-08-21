import { useState, useEffect } from 'react';

const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (item) => {
    // Check if item already exists
    if (!watchlist.some(watchItem => watchItem.id === item.id)) {
      setWatchlist(prev => [...prev, {
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        media_type: item.media_type || 'movie',
        added_at: new Date().toISOString()
      }]);
      return true;
    }
    return false;
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
  };

  const isInWatchlist = (id) => {
    return watchlist.some(item => item.id === id);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };
};

export default useWatchlist;
