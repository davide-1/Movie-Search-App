import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
  IconButton,
} from '@mui/material'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useFavorites } from '../context/FavoritesContext'

type MovieCardProps = {
  movie: {
    id: number
    title: string
    release_date: string
    vote_average: number
    poster_path: string | null
  }
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { favorites, toggleFavorite } = useFavorites()

  const isFavorite = favorites.some((fav) => fav.id === movie.id)

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A'

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault() // prevent navigation
    toggleFavorite(movie)
  }

  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          backgroundColor: '#1c1c1c',
          color: 'white',
          maxWidth: 250,
          borderRadius: 2,
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            color: isFavorite ? 'error.main' : 'grey.500',
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        <CardMedia
          component="img"
          height="375"
          image={imageUrl}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {movie.title}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">{releaseYear}</Typography>
            <Rating
              value={movie.vote_average / 2}
              precision={0.5}
              readOnly
              size="small"
            />
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
}

