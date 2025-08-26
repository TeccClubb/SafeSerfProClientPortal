import { NextConfig } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_SECRET } from "./lib/utils/apiRoutes";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: AUTH_SECRET });

  // Public routes (accessible without login)
  const publicRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/email-verify",
    "/plans",  
    "/knowledge-base"
  ];

  if (publicRoutes.includes(req.nextUrl.pathname)) {
    // If user is logged in, block auth-related pages
    if (
      token &&
      ["/login", "/signup", "/forgot-password", "/reset-password", "/email-verify"].includes(
        req.nextUrl.pathname
      )
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // All other routes require login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
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
    "/plans", // still matched but handled as public above
    "/product",
    "/productCheckOut",
    "/referFriend",
    "/subscription",
    "/support",
    "/ticketView",
    "/viewTicketList",
  ],
};
