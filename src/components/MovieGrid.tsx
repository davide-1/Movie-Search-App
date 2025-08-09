import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import MovieCard from './MovieCard';

// Props: array of movie objects and loading state
type MovieGridProps = {
  movies: any[];
  isLoading: boolean;
};

export default function MovieGrid({ movies, isLoading }: MovieGridProps) {
  const skeletonCount = 6;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} justifyContent="center" sx={{ width: '100%' }}>
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <Grid
                key={index}
                component="div"
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: 'flex', justifyContent: 'center',  }}
              >
                <Skeleton
                  variant="rectangular"
                  width={240}
                  height={135}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
          : movies.map((movie) => (
              <Grid
                key={movie.id}
                component="div"
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <MovieCard movie={movie} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}


