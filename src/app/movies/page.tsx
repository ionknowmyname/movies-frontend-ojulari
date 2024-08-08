'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Typography, Button } from '@mui/material';
import { MoviesContext } from '../state/movieContext';
import Wrapper from './wrapper';
import MovieCard from '@/components/movieCard';

export default function MoviesPage() {
  const { state } = useContext(MoviesContext);
  const router = useRouter();

  const handleAddMovie = () => {
    router.push('/movies/add');
  };

  if (state.movies.length === 0) {
    return (
      <Wrapper title='My Movies'>
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
          <Typography variant='h3'>Your movies list is empty.</Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={handleAddMovie}
            style={{ marginTop: '50' }}
            size='large'
            sx={{
              mt: 3,
              mb: 2,
              color: '#ffffff',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px',
            }}
          >
            Add a new movie
          </Button>
        </div>
      </Wrapper>
    );
  }

  return (
    <Grid container spacing={2} style={{ padding: '20px' }}>
      {state.movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} key={movie.id}>
          <MovieCard title={movie.title} imageUrl={movie.url} year={movie.year} />
        </Grid>
      ))}
    </Grid>
  );
}
