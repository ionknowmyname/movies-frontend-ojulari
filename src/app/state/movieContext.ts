import { Movie } from '@/types/movie';
import { createContext, Dispatch } from 'react';
import { Action } from './movieReducer';

interface MoviesContextProps {
  state: MoviesState;
  dispatch: Dispatch<Action>;
}

export interface MoviesState {
  movies: Movie[];
  total: number;
}

export const MoviesContext = createContext<MoviesContextProps>({} as MoviesContextProps);
