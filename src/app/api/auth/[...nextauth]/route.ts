import { AUTH_SECRET } from "@/lib/utils/apiRoutes";
import NextAuth, { SessionStrategy, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Laravel Login",
      credentials: {
        id: { label: "Id", type: "text" },
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        access_token: { label: "Access Token", type: "text" },
      },
      async authorize(credentials) {
        return {
          id: credentials?.id,
          name: credentials?.name,
          email: credentials?.email,
          access_token: credentials?.access_token,
        } as User;
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
    strategy: "jwt" as SessionStrategy,
    maxAge: 60 * 60 * 24,
  },
  secret: AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
