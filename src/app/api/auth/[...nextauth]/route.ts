// app/api/auth/[...nextauth]/route.ts
import { LOGIN_ROUTE } from '@/lib/utils/apiRoutes';
import NextAuth, { SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { API_BASE_URL } from '@/lib/constrants';
// import { LOGIN_ROUTE } from '@/lib/constrants';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Laravel Login',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(LOGIN_ROUTE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.access_token) {
          throw new Error(data.message || 'Invalid credentials');
        }

        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          access_token: data.access_token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.access_token = user.access_token;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        access_token: token.access_token,
      };
      return session;
    },
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 60 * 60 * 24,
  },
  secret: "karimkhan", // You can generate one at https://generate-secret.vercel.app/32
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
