'use client';
import { Montserrat } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const montserrat = Montserrat({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
    allVariants: {
      color: '#ffffff',
    },
  },
  palette: {
    error: {
      main: '#EB5757',
    },
    primary: {
      main: '#2BD17E',
    },
    background: {
      default: '#093545',
    },
    secondary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
});

export default theme;
