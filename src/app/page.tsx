'use client';
import { useState } from 'react';
import Input from '@/components/input';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import Container from '@mui/material/Container';
import AlertMessage from '@/components/alertMessage';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);

    if (!isEmailValid || !isPasswordValid) return;
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setErrorMessage(null);
        router.push('/movies');
      } else {
        const { message } = await res.json();
        setErrorMessage(message || 'Login failed');
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setErrorMessage(null);
  };

  return (
    <Container maxWidth='lg'>
      <Grid container justifyContent='center' alignItems='center' sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h2' sx={{ mb: 2, fontWeight: 'bold' }}>
              Sign in
            </Typography>
            <Box component='form' sx={{ mt: 1, width: '100%' }} onSubmit={handleLogin}>
              <Input
                error={emailError}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name='email'
                label='Email'
                type='text'
                fullWidth={true}
                helperText={
                  emailError ? 'Invalid email format. Please enter a valid email address.' : ''
                }
              />
              <Input
                error={passwordError}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name='password'
                label='Password'
                type='password'
                fullWidth={true}
                helperText={
                  passwordError
                    ? 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
                    : ''
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color='primary'
                  />
                }
                label='Remember me'
              />
              <Button
                size='large'
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, color: '#ffffff', fontWeight: 'bold', textTransform: 'none' }}
                disabled={loading}
                startIcon={loading ? <CircularProgress color='inherit' size={24} /> : null}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <AlertMessage message={errorMessage} severity='error' onClose={handleCloseAlert} />
    </Container>
  );
}
