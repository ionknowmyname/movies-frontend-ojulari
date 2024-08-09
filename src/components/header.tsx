'use client';

import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: Readonly<HeaderProps>) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'GET',
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  };

  return (
    <AppBar position='static' sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Typography
            variant='h5'
            component='h5'
            sx={{ color: 'white', flexGrow: 1, fontWeight: 'bold' }}
          >
            {title}
          </Typography>
          <Button
            onClick={handleLogout}
            sx={{ color: 'white', textTransform: 'none' }}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
