import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { jwt } from "better-auth/plugins";
import { sendEmailAction } from "@/actions/send-email.action";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { normalizeName } from "./utils";

export const auth = betterAuth({
  basePath: "/api/v1/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");
      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
          description:
            "Please verify your email address to complete the registration process.",
          link: String(link),
        },
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Reset your password",
        meta: {
          description: "Please click the link below to reset your password.",
          link: String(url),
        },
      });
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      const pathsRequiringNameNormalization = [
        "/sign-up/email",
        "/sign-in/magic-link",
        "/update-user",
      ];

      if (
        pathsRequiringNameNormalization.includes(ctx.path) &&
        ctx.body?.name
      ) {
        const name = normalizeName(ctx.body.name);
        return {
          context: { ...ctx, body: { ...ctx.body, name } },
        };
      }
    }),
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [jwt()],
});
