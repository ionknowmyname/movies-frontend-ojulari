import axios from 'axios';
import { Movie } from '@/types/movie';
import { BaseResponse } from '@/types/base';
import { Auth } from '@/types/auth';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 5000,
});

export async function getMovies(page: string): Promise<Movie[]> {
  try {
    const response = await axios.get(`/api/movies?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

export async function addMovie(formData: FormData): Promise<Movie> {
  const response = await fetch('/api/movies', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to add movie');
  return response.json();
}

export async function loginRequest(email: string, password: string): Promise<BaseResponse<Auth>> {
  try {
    const response = await axiosInstance.post<BaseResponse<Auth>>('/auth/login', {
      username: email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { message: 'Unauthorized', statusCode: 401 } as BaseResponse<Auth>;
      } else {
        return {
          message: 'An unexpected error occurred',
          statusCode: error.response?.status ?? 500,
        } as BaseResponse<Auth>;
      }
    }
    throw new Error('An unexpected error occurred');
  }
}
