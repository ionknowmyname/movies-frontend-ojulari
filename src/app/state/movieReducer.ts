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

interface SetMoviesAction {
  type: 'SET_MOVIES';
  payload: {
    data: Movie[];
    total: number;
  };
}

export type Action = AddMovieAction | UpdateMovieAction | RemoveMovieAction | SetMoviesAction;

export default function reducer(state: MoviesState, action: Action): MoviesState {
  switch (action.type) {
    case 'ADD_MOVIE':
      return {
        ...state,
        total: state.movies.length + 1,
        movies: [...state.movies, action.payload],
      };
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.title !== action.payload.title),
      };
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload.data,
        total: action.payload.total,
      };
    default:
      throw new Error('Unknown action type');
  }
}
