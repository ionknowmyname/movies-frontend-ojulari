'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Typography, Container, Box, Grid } from '@mui/material';
import { Accept, useDropzone } from 'react-dropzone';

import AlertMessage from '@/components/alertMessage';
import Image from 'next/image';
import { MoviesContext } from '@/app/state/movieContext';
import { addMovie } from '@/services/moviesApi';
import Input from '@/components/input';
import { Download } from '@mui/icons-material';
import Wrapper from '../wrapper';

export default function AddMoviePage() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const { dispatch } = useContext(MoviesContext);
  const router = useRouter();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' as unknown as Accept,
  });

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('year', year);
      if (image) formData.append('image', image);

      const movie = await addMovie(formData);
      dispatch({ type: 'ADD_MOVIE', payload: movie });
      setAlertMessage('Movie added successfully!');
      setAlertSeverity('success');
      setTimeout(() => {
        router.push('/movies');
      }, 2000);
    } catch (error) {
      setAlertMessage('Failed to add movie. Please try again.');
      setAlertSeverity('error');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Container
      maxWidth='md'
      sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography component='h4' variant='h4' sx={{ mb: 4, fontWeight: 'bold' }}>
          Create a new movie
        </Typography>
        <Grid mt={5} container alignItems='flex-start' spacing={10}>
          <Grid item xs={12} md={6}>
            <Box
              {...getRootProps()}
              sx={{
                borderRadius: '8px',
                border: '2px dashed #ccc',
                padding: '20px',
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: { xs: '300px', md: '400px' },
              }}
            >
              <input {...getInputProps()} />
              <Download sx={{ fontSize: 24, mb: 2 }} />
              <Typography>Drag an image here</Typography>
              {image && (
                <Box mt={2}>
                  <Image src={image} alt='Preview' width={200} height={200} />
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Input
              label='Title'
              name='title'
              type='text'
              error={false}
              value={title}
              fullWidth={true}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              label='Publishing year'
              name='year'
              type='text'
              error={false}
              value={year}
              fullWidth={false}
              onChange={(e) => setYear(e.target.value)}
            />
            <Box mt={8} sx={{ display: 'flex', justifyContent: 'space-between', gap: 5 }}>
              <Button
                size='large'
                variant='outlined'
                color='secondary'
                onClick={handleCancel}
                sx={{
                  flexGrow: 1,
                  fontWeight: 'bold',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textTransform: 'none',
                }}
              >
                Cancel
              </Button>
              <Button
                size='large'
                variant='contained'
                color='primary'
                onClick={handleSubmit}
                sx={{
                  flexGrow: 1,
                  fontWeight: 'bold',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textTransform: 'none',
                }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
