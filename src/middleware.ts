import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@/auth';

export const middleware = async (request: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
};

export const config = {
  matcher: ['/'],
};
