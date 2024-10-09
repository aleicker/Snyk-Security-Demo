import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value as string;

    if (!token) {
      throw new Error();
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const isValid = await jwtVerify(token, secret);

    if (!isValid) {
      throw new Error();
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: [
    '/account/dashboard/:path*',
    '/account/expense-group/:path*',
    '/account/dashboard/profile',
  ],
};
