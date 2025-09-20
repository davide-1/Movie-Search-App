import React from 'react';
import { Box, Typography, IconButton, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavorites } from '../context/FavoritesContext';

type MovieCardProps = {
  movie: {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    poster_path: string | null;
  };
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.jpg';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(movie);
  };

  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          position: 'relative',
          width: { xs: 140, sm: 180, md: 200 },
          aspectRatio: '2 / 3',            // ⬅️ poster ratio
          borderRadius: 2,
          overflow: 'hidden',
          cursor: 'pointer',
          transform: 'translateZ(0)',      // GPU hint for smoother hover
          transition: 'transform 0.25s ease',
          '&:hover': { transform: 'scale(1.04)' },
          // Make the overlay fade-in when the whole card is hovered
          '&:hover .overlay': { opacity: 1 },
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={movie.title}
          loading="lazy"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // will not crop awkwardly now that ratios match
            display: 'block',
          }}
        />

        {/* Favorite Heart */}
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: isFavorite ? 'error.main' : 'grey.300',
            bgcolor: 'rgba(0,0,0,0.4)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        {/* Hover Overlay */}
        <Box
          className="overlay"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
            color: 'white',
            p: 1,
            opacity: 0,                     // default hidden
            transition: 'opacity 0.25s ease',
          }}
        >
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.2,
            }}
          >
            {movie.title}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5}>
            <Typography variant="caption">{releaseYear}</Typography>
            <Rating value={movie.vote_average / 2} precision={0.5} readOnly size="small" />
          </Box>
        </Box>
      </Box>
    </Link>
  );
}



