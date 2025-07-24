
import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
} from '@mui/material'

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
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A'

  return (
    <Card
      sx={{
        backgroundColor: '#1c1c1c',
        color: 'white',
        maxWidth: 250,
        borderRadius: 2,
        cursor: 'pointer',
      }}
    >
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
  )
}
