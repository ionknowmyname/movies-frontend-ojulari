import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET() {
  const cookie = serialize('authToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    sameSite: 'strict',
    path: '/',
  });

  const res = NextResponse.json({ message: 'Logout successful' });
  res.headers.set('Set-Cookie', cookie);
  return res;
}
