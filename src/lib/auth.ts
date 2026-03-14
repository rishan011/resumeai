import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
// ... (rest of credentials code remains unchanged)
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "hello@example.com" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" } // 'login' or 'register'
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (credentials.action === "register") {
            if (user) {
              throw new Error("Email already registered. Please sign in.");
            }
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.email.split("@")[0],
                password: hashedPassword,
              }
            });
            return newUser;
          }

          if (!user || !user.password) {
            throw new Error("Invalid email or password. Are you sure you've registered?");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isCorrectPassword) {
            throw new Error("Invalid password. Please try again.");
          }

          return user;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Auth authorize error";
          console.error("❌ AUTH_AUTHORIZE_ERROR:", errorMessage);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  logger: {
    error(code, metadata) {
      console.error("❌ NEXTAUTH_ERROR:", code, metadata);
    },
    warn(code) {
      console.warn("⚠️ NEXTAUTH_WARN:", code);
    },
    debug(code, metadata) {
      console.log("ℹ️ NEXTAUTH_DEBUG:", code, metadata);
    },
  },
};
