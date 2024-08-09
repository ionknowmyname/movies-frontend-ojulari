import { Movie } from '@/types/movie';
import { MoviesState } from './movieContext';

interface AddMovieAction {
  type: 'ADD_MOVIE';
  payload: Movie;
}

interface UpdateMovieAction {
  type: 'UPDATE_MOVIE';
  payload: Movie;
}

interface RemoveMovieAction {
  type: 'REMOVE_MOVIE';
  payload: Movie;
}

interface LoginAction {
  type: 'LOGIN';
  payload: string;
}

interface LogoutAction {
  type: 'LOGOUT';
}

interface SetMoviesAction {
  type: 'SET_MOVIES';
  payload: Movie[];
}

export type Action =
  | AddMovieAction
  | UpdateMovieAction
  | RemoveMovieAction
  | LoginAction
  | LogoutAction
  | SetMoviesAction;

export default function reducer(state: MoviesState, action: Action): MoviesState {
  switch (action.type) {
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.title !== action.payload.title),
      };
    case 'LOGIN':
      return {
        ...state,
        token: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
      };
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    default:
      throw new Error('Unknown action type');
  }
}
