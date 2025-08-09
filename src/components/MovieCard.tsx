import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Rating,
} from '@mui/material';
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
    : '/placeholder.jpg'; // Fallback image if poster is missing

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

    // Prevent default click navigation if heart icon is clicked
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(movie);
  };

  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          position: 'relative',
          width: { xs: 160, sm: 200, md: 240 },
          aspectRatio: '16 / 9',
          borderRadius: 2,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <img
          src={imageUrl}
          alt={movie.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
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
            backgroundColor: 'rgba(0,0,0,0.4)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        {/* Hover Overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            color: 'white',
            p: 1,
            opacity: 0,
            transition: 'opacity 0.3s',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {movie.title}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="caption">{releaseYear}</Typography>
            <Rating
              value={movie.vote_average / 2}
              precision={0.5}
              readOnly
              size="small"
            />
          </Box>
        </Box>
      </Box>
    </Link>
  );
}


