import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: "karimkhan" });

  console.log(token)
  if (!token) {
    console.log("//////////////////////////////")
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/overview', '/support', '/plans', '/settings', '/createTicket', '/ticketView/:path*'],
};
