import bcrypt from "bcryptjs";
import NextAuth, { type Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString();

        if (!email || !password) return null;

        await connectToDatabase();
        const user = (await UserModel.findOne({ email }).lean()) as any;
        if (!user || user.isBlocked) return null;

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth: sessionAuth }) {
      const pathname = request.nextUrl.pathname;
      const isLoggedIn = Boolean(sessionAuth?.user);
      const role = sessionAuth?.user?.role;

      if (pathname.startsWith("/admin")) {
        return role === "admin";
      }

      if (pathname.startsWith("/account") || pathname.startsWith("/checkout")) {
        return isLoggedIn;
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? "");
        session.user.role = (token.role as "admin" | "customer" | undefined) ?? "customer";
      }
      return session;
    },
  },
});
