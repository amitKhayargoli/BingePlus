import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import Home from './pages/Home';
import WatchMovie from './pages/WatchMovie';
import Search from './components/Search';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/watch/:id" element={<WatchMovie />} />
      </Routes>
    </Router>
  );
};

export default App;
