// utils/apiRoutes.ts or constants/routes.ts

export const API_BASE_URL = process.env.NEXT_PUBLIC_REST_API_BASE_URL as string;

export const LOGIN_ROUTE = `${API_BASE_URL}/login`;
export const SIGNUP_ROUTE = `${API_BASE_URL}/signup`;
export const LOGOUT_ROUTE = `${API_BASE_URL}/logout`;
export const FORGOT_PASSWORD_ROUTE = `${API_BASE_URL}/forgot-password`;
export const RESET_PASSWORD_ROUTE = `${API_BASE_URL}/reset-password`;


// New: Email verification route builder
export const getEmailVerificationRoute = (id: string, hash: string, expires: string, signature: string): string =>
  `${API_BASE_URL}/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`;


export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export const STRIPE_PUBLISHABLE_KEY=process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const AUTH_SECRET = process.env.AUTH_SECRET;














export const GET_PLANS_ROUTE = API_BASE_URL + "/plans";
export const GET_SERVER_ROUTE = API_BASE_URL + "/servers";