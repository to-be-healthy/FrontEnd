import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;
  const provider = pathname.split('/')[1];
  return NextResponse.redirect(new URL(`/callback/${provider}${search}`, request.url));
};

export const config = {
  matcher: ['/:path/callback'],
};
