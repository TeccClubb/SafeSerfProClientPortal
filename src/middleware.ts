import { NextConfig } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_SECRET } from "./lib/utils/apiRoutes";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: AUTH_SECRET });

  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/signup" ||
    req.nextUrl.pathname === "/forgot-password" ||
    req.nextUrl.pathname === "/reset-password" ||
    req.nextUrl.pathname === "/email-verify"
  ) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config: NextConfig = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/email-verify",
    "/createTicket",
    "/devices",
    "/payment-processing",
    "/plans",
    "/product",
    "/productCheckOut",
    "/referFriend",
    "/subscription",
    "/support",
    "/ticketView",
    "/viewTicketList",
  ],
};
