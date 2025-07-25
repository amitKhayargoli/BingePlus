import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {Suspense, lazy } from "react";
import { Spinner } from "@material-tailwind/react";

const MovieList = lazy(() => import("./pages/MovieList"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Home = lazy(() => import("./pages/Home"));
const WatchMovie = lazy(() => import("./pages/WatchMovie"));
const SearchAll = lazy(() => import("./components/SearchAll"));
const TVShows = lazy(() => import("./pages/TVShows"));
const TVDetails = lazy(() => import("./pages/TVDetails"));
const WatchTV = lazy(() => import("./pages/WatchTV"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner/>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/search" element={<SearchAll />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/watch/:id" element={<WatchMovie />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/tv/:id" element={<TVDetails />} />
        <Route path="/watchshow/:id/:season/:ep" element={<WatchTV />} />
      </Routes>
    </Suspense>
    </Router>
  );
};

export default App;
