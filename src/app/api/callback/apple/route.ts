import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const state = formData.get('state') as string | null;
    const code = formData.get('code') as string | null;
    const id_token = formData.get('id_token') as string | null;
    const user = formData.get('user') as string | null;

    const baseUrl = new URL('https://www.to-be-healthy.site/');
    const redirectUrl = new URL('/apple/callback', baseUrl.origin);

    if (state) redirectUrl.searchParams.set('state', state);
    if (code) redirectUrl.searchParams.set('code', code);
    if (id_token) redirectUrl.searchParams.set('id_token', id_token);
    if (user) redirectUrl.searchParams.set('user', user);

    return NextResponse.redirect(redirectUrl, 302);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('문제가 발생했습니다. 다시 시도해주세요.', error);
    return NextResponse.redirect('/');
  }
}
