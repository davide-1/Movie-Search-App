
import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MovieCard from './MovieCard'

type MovieGridProps = {
  movies: any[]
  isLoading: boolean
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} justifyContent="center" sx={{ width: '100%' }}>
        {movies.map((movie) => (
          <Grid
            key={movie.id}
            component="div"
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <MovieCard movie={movie}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

