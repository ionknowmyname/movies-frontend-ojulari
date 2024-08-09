import axios from 'axios';
import { Movie } from '@/types/movie';
import { BaseResponse } from '@/types/base';
import { Auth } from '@/types/auth';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 5000,
});

export async function getMovies(
  page: string,
  limit: string,
  token: string
): Promise<BaseResponse<Movie[]>> {
  try {
    const response = await axiosInstance.get<BaseResponse<Movie[]>>(
      `/movie?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.statusText ?? 'An error occurred',
        statusCode: error.response?.status ?? 500,
      } as BaseResponse<Movie[]>;
    }
    throw new Error('An unexpected error occurred');
  }
}

export async function addMovie(formData: FormData, token: string): Promise<BaseResponse<Movie>> {
  try {
    const response = await axiosInstance.post('/movie', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.statusText ?? 'An error occurred',
        statusCode: error.response?.status ?? 500,
      } as BaseResponse<Movie>;
    }
    throw new Error('An unexpected error occurred');
  }
}

export async function editMovie(formData: FormData, token: string): Promise<BaseResponse<Movie>> {
  try {
    const response = await axiosInstance.put('/movie', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.statusText ?? 'An error occurred',
        statusCode: error.response?.status ?? 500,
      } as BaseResponse<Movie>;
    }
    throw new Error('An unexpected error occurred');
  }
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
