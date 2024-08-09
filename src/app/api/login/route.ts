import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { loginRequest } from '@/services/moviesApi';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const response = await loginRequest(email, password);

    if (response.statusCode !== 201)
      return NextResponse.json({ message: response.message }, { status: response.statusCode });

    const token = response.data?.accessToken;
    if (!token)
      return NextResponse.json({ message: 'Login failed' }, { status: response.statusCode });

    const cookie = serialize('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 22,
      sameSite: 'strict',
      path: '/',
    });

    const res = NextResponse.json({ message: 'Login successful' });
    res.headers.set('Set-Cookie', cookie);
    return res;
  } catch (error) {
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
