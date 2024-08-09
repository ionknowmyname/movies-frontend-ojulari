import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value ?? '';
  const { pathname, origin } = req.nextUrl;

  const isTokenValid = decodeToken(token);

  if (!isTokenValid) {
    if (pathname !== '/') {
      const loginUrl = new NextURL('/', origin);
      return NextResponse.redirect(loginUrl);
    }
  } else if (pathname === '/') {
    const moviesUrl = new NextURL('/movies', origin);
    return NextResponse.redirect(moviesUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};

function decodeToken(token: string): boolean {
  try {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    if (!decodedToken?.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  } catch (err) {
    console.error('Token decoding error:', err);
    return false;
  }
}
