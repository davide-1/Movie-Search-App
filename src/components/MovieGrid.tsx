import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MovieCard from './MovieCard';

type MovieGridProps = {
  movies: any[];
};

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} sx={{ width: '100%' }}>
        {movies.map((movie) => (
          <Grid
            key={movie.id}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }} 
          >
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
