import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const state = formData.get('state') as string | null;
    const code = formData.get('code') as string | null;
    const id_token = formData.get('id_token') as string | null;
    const user = formData.get('user') as string | null;

    const redirectUrl = new URL('/apple/callback', req.nextUrl.origin);

    if (state) redirectUrl.searchParams.set('state', state);
    if (code) redirectUrl.searchParams.set('code', code);
    if (id_token) redirectUrl.searchParams.set('id_token', id_token);
    if (user) redirectUrl.searchParams.set('user', user);

    return NextResponse.redirect(redirectUrl, 302);
  } catch {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin), 302);
  }
}
