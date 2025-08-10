import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import {
  inferAdditionalFields,
  adminClient,
  customSessionClient,
  magicLinkClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  basePath: "/api/v1/auth",
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [jwtClient()],
})

export default authClient

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  updateUser,
} = authClient;