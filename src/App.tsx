import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage"; 
import MovieDetails from "./components/MovieDetails";
import FavoritesPage from "./components/FavoritesPage";


function App() {
  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#fff", margin: 0, padding: 0, overflowX: "hidden", }}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;


