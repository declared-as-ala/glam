import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: "admin" | "customer";
    };
  }

  interface User {
    role: "admin" | "customer";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "customer";
    id?: string;
  }
}
