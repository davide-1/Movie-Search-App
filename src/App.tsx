import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MovieSearch from "./components/MovieSearch";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails"; 
import { useSearchMovies } from "./hooks/useSearchMovies";
import FavoritesPage from './components/FavoritesPage'


function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: movies, isLoading, error, isFetched } = useSearchMovies(searchTerm);

  const handleSearch = (query: string) => setSearchTerm(query);
  const noResults = isFetched && movies?.length === 0;

  return (
    <>
      <MovieSearch onSearch={handleSearch} />
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center" }}>❌ Failed to fetch movies.</p>}
      {noResults && <p style={{ textAlign: "center" }}>No results found.</p>}
      {movies && movies.length > 0 && <MovieGrid movies={movies} isLoading={isLoading} />}
    </>
  );
}

function App() {
  return (
    <>
      <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#fff" }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

