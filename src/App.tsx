import React from "react";
import { Routes, Route, useNavigate  } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage"; 
import MovieDetails from "./components/MovieDetails";
import FavoritesPage from "./components/FavoritesPage";
import SearchPage from "./components/SearchPageProps";


function App() {
  const navigate = useNavigate();


  const handleSearch = (query: string) => {
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };


  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#fff", margin: 0, padding: 0, overflowX: "hidden", }}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage onSearch={handleSearch} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchPage onSearch={handleSearch} />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;


