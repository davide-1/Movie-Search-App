import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useFavorites } from "../context/FavoritesContext";
import MovieAIChat from "./MovieAIChat";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, isLoading, error } = useMovieDetails(id!); // Fetch movie data with React Query
  const { favorites, toggleFavorite } = useFavorites(); // Access global favorites state
  const isFavorite = favorites.some((fav) => fav.id === movie?.id); // Check if this movie is in favorites

  if (isLoading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">❌ Failed to load movie details.</Typography>
      </Box>
    );
  }

  // Prepare props for MovieAIChat
  const genres = (movie.genres || []).map((g: any) => g.name);
  const topCast =
    (movie as any)?.credits?.cast?.slice(0, 5)?.map((c: any) => c.name) ?? [];

  return (
    <Box sx={{ backgroundColor: "#121212", color: "#fff", py: 4 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {movie.backdrop_path && (
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
            sx={{
              width: "100%",
              maxHeight: { xs: 200, sm: 350, md: 450 },
              objectFit: "cover",
              borderRadius: 1,
              mb: 3,
            }}
          />
        )}

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          ← Back
        </Button>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            {movie.title}
          </Typography>
          <IconButton
            onClick={() => toggleFavorite(movie)}
            color="error"
            aria-label="add to favorites"
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>

        <Typography variant="body1" paragraph>
          {movie.overview}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2">
          <strong>Runtime:</strong> {movie.runtime} minutes
        </Typography>

        <Typography variant="body2">
          <strong>Rating:</strong> {movie.vote_average}/10
        </Typography>

        <Box mt={2}>
          {movie.genres.map((genre: any) => (
            <Chip
              key={genre.id}
              label={genre.name}
              variant="outlined"
              sx={{
                mr: 1,
                mb: 1,
                borderColor: "rgba(255,255,255,0.4)",
                color: "white",
                fontWeight: 500,
                cursor: "default",
              }}
            />
          ))}
        </Box>

        <MovieAIChat
          title={movie.title}
          genres={genres}
          runtimeMins={movie.runtime}
          topCast={topCast}
          plot={movie.overview}
        />
      </Container>
    </Box>
  );
}

