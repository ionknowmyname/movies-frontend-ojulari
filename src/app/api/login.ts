import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { loginRequest } from '@/services/moviesApi';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body;

  try {
    const response = await loginRequest(email, password);

    if (response.statusCode !== 201)
      return res.status(response.statusCode).json({ message: response.message });

    const token = response.data?.accessToken;
    if (!token) return res.status(response.statusCode).json({ message: 'Login failed' });

    res.setHeader(
      'Set-Cookie',
      serialize('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        path: '/',
      })
    );

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
}
