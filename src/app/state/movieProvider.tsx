'use client';

import { useReducer } from 'react';
import { MoviesContext, MoviesState } from './movieContext';

import reducer from './movieReducer';

const initialState: MoviesState = {
  movies: [],
  token: null,
};

interface MoviesProviderProps {
  children: React.ReactNode;
}

export default function MoviesProvider({ children }: Readonly<MoviesProviderProps>) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <MoviesContext.Provider value={{ state, dispatch }}>{children}</MoviesContext.Provider>;
}
