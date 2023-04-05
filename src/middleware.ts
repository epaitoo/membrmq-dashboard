import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
import { ACCESS_TOKEN, REFRESH_TOKEN, isTokenExpired } from './utils/tokenHelpers';
import { API_BASEURL } from './utils/api';

export async function middleware(request: NextRequest) {

  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value; 
  const unauthenticated: boolean = !request.cookies.has(ACCESS_TOKEN) && 
                                      !request.cookies.has(REFRESH_TOKEN)

  // if (request.url.includes('_next')) return;

  if (unauthenticated && !request.url.includes('/auth/signin')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  if (request.cookies.has(ACCESS_TOKEN) && request.url.includes('/auth/signin')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!request.cookies.has(ACCESS_TOKEN) && request.cookies.has(REFRESH_TOKEN)) {
    if (!isTokenExpired(refreshToken)) {
      try {
        const response = await fetch(`${API_BASEURL}/auth/refresh`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
          method: 'POST',
        });

        if (response.ok) {
          const data = await response.json();
          const nextRes = NextResponse.next();

          nextRes.cookies.set(ACCESS_TOKEN, data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 900, // 15 minutes in seconds
            path: '/',
          });

          nextRes.cookies.set(REFRESH_TOKEN, data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
          });

          return nextRes;
        }
        
      } catch (error) {
        console.log('error with token refresh:', error);
      }
    }
} 

  return NextResponse.next();

}

export const config = { 
  matcher: ['/', '/members'],
}

