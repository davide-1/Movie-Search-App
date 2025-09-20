import React, { useState } from "react";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";
import { useFavorites } from "../context/FavoritesContext";
import MovieSearch from "../components/MovieSearch";
import MovieGrid from "../components/MovieGrid";
import MovieRow from "../components/MovieRow";
import { useDebounce } from "../hooks/useDebounce";
import FeaturedHero from "./FeaturedHero";

export default function HomePage() {
  const [searchInput, setSearchInput] = useState(""); // Input from MovieSearch
  const debouncedSearch = useDebounce(searchInput, 300);// Add debounce for smooth UX

  const {
    data: movies,
    isLoading,
    error,
    isFetched,
    refetch,
  } = useSearchMovies(debouncedSearch);

  const noResults = isFetched && movies?.length === 0;

  // Map API errors to user-friendly messages
  const getErrorMessage = () => {
    if (!error?.response) return "Network error. Please check your connection.";
    switch (error.response.status) {
      case 401:
        return "Unauthorized. Please check your API key.";
      case 404:
        return "No movies found for your search.";
      case 500:
        return "Server error. Try again later.";
      default:
        return `Error: ${error.message}`;
    }
  };

  // Infinite queries for each movie category
  const {
    data: trendingData,
    fetchNextPage: fetchTrending,
    hasNextPage: hasMoreTrending,
  } = useInfiniteMovies("trending");

  const {
    data: popularData,
    fetchNextPage: fetchPopular,
    hasNextPage: hasMorePopular,
  } = useInfiniteMovies("popular");

  const {
    data: upcomingData,
    fetchNextPage: fetchUpcoming,
    hasNextPage: hasMoreUpcoming,
  } = useInfiniteMovies("upcoming");

  const trending = trendingData?.pages.flatMap((p) => p.results) ?? [];
  const popular = popularData?.pages.flatMap((p) => p.results) ?? [];
  const upcoming = upcomingData?.pages.flatMap((p) => p.results) ?? [];

  const { favorites } = useFavorites();

  return (
    <>
      <MovieSearch onSearch={setSearchInput} />
      <FeaturedHero />

      {debouncedSearch ? (
        <>
          {isLoading && (
            <p style={{ textAlign: "center", opacity: 0.8, transition: "opacity 0.3s" }}>
              🔍 Searching...
            </p>
          )}

          {error && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <p>❌ {getErrorMessage()}</p>
              <button
                onClick={() => refetch()}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Retry
              </button>
            </div>
          )}

          {noResults && (
            <p style={{ textAlign: "center" }}>No results found. Try another search.</p>
          )}

          {movies && movies.length > 0 && (
            <>
              <p style={{ textAlign: "center", marginBottom: "1rem" }}>
                Found {movies.length} {movies.length === 1 ? "movie" : "movies"}
              </p>
              <MovieGrid movies={movies} isLoading={isLoading} />
              {/* <MovieGrid movies={[]} isLoading={true} /> */}
            </>
          )}
        </>
      ) : (
        <>
          {favorites.length > 0 && (
            <MovieRow title="My List" movies={favorites} />
          )}

          <MovieRow
            title="Trending Now"
            movies={trending}
            onLoadMore={hasMoreTrending ? fetchTrending : undefined}
          />

          <MovieRow
            title="Popular"
            movies={popular}
            onLoadMore={hasMorePopular ? fetchPopular : undefined}
          />

          <MovieRow
            title="Upcoming"
            movies={upcoming}
            onLoadMore={hasMoreUpcoming ? fetchUpcoming : undefined}
          />
        </>
      )}
    </>
  );
}
