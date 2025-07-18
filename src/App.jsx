import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import Home from './pages/Home';
import WatchMovie from './pages/WatchMovie';
import SearchAll from './components/SearchAll';
import TVShows from './pages/TVShows';
import TVDetails from './pages/TVDetails';
import WatchTV from './pages/WatchTV';

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/search" element={<SearchAll />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/watch/:id" element={<WatchMovie />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/tv/:id" element={<TVDetails />} />
        <Route path="/watchshow/:id" element={<WatchTV />} />
      </Routes>
    </Router>
  );
};

export default App;
