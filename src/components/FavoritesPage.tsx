import React from 'react'
import { Typography, Box } from '@mui/material'
import { useFavorites } from '../context/FavoritesContext'
import MovieGrid from './MovieGrid' // Reuse existing grid layout for display

export default function FavoritesPage() {
  const { favorites } = useFavorites() // Get favorite movi

  // If no favorites, show an empty state message
  if (favorites.length === 0) {
    return (
      <Box mt={4} textAlign="center">
        <Typography variant="h6" sx={{ color: '#fff' }}>
          You haven't added any favorites yet.
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Typography variant="h4" align="center" mt={4} gutterBottom>
        Your Favorite Movies
      </Typography>
      <MovieGrid movies={favorites} isLoading={false} />
    </>
  )
}
