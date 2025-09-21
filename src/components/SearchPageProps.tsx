import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Box, Typography, Button, Skeleton } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchMovies } from "../hooks/useSearchMovies";
import MovieSearch from "./MovieSearch";
import MovieGrid from "./MovieGrid";

type SearchPageProps = { onSearch: (q: string) => void };

export default function SearchPage({ onSearch }: SearchPageProps) {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const debounced = useDebounce(q, 300);

  const { data: movies, isLoading, error, isFetched, refetch } = useSearchMovies(debounced);
  const noResults = isFetched && (movies?.length ?? 0) === 0;

  const getErrorMessage = () => {
    const status = (error as any)?.response?.status;
    if (!status) return "Network error. Please check your connection.";
    switch (status) {
      case 401:
        return "Unauthorized. Please check your API key.";
      case 404:
        return "No movies found for your search.";
      case 500:
        return "Server error. Try again later.";
      default:
        return `Error: ${(error as any)?.message ?? "Unknown error"}`;
    }
  };

  return (
    <Container maxWidth={false} sx={{ maxWidth: { lg: 1280, xl: 1440 }, mx: "auto", px: 3 }}>
      {/* Keep the same search box here, prefilled from ?q= */}
      <Box sx={{ my: 2 }}>
        <MovieSearch onSearch={onSearch} defaultValue={q} />
      </Box>

      {isLoading && (
        <Box sx={{ mt: 4 }}>
          <Skeleton variant="text" width={240} />
          <Skeleton variant="rectangular" height={260} sx={{ borderRadius: 2, mt: 2 }} />
        </Box>
      )}

      {error && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography color="error" sx={{ mb: 1 }}>
            ❌ {getErrorMessage()}
          </Typography>
          <Button variant="contained" onClick={() => refetch()}>
            Retry
          </Button>
        </Box>
      )}

      {noResults && (
        <Typography sx={{ textAlign: "center", mt: 3 }}>
          No results found. Try another search.
        </Typography>
      )}

      {movies && movies.length > 0 && (
        <>
          <Typography sx={{ textAlign: "center", mt: 2, mb: 2 }}>
            Found {movies.length} {movies.length === 1 ? "movie" : "movies"}
          </Typography>
          <MovieGrid movies={movies} isLoading={isLoading} />
        </>
      )}
    </Container>
  );
}
