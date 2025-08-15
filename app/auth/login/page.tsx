"use client"

import { useState } from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInOauthButton } from "@/components/sign-in-oauth-button"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  let shouldRedirectToVerify = false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onError: (ctx) => {
            setLoading(false);
            switch (ctx.error.code) {
              case "INVALID_EMAIL_OR_PASSWORD":
                setError(
                  "Incorrect email or password. Please check your credentials or reset your password if needed"
                );
                break;
              case "EMAIL_NOT_VERIFIED":
                shouldRedirectToVerify = true;
                break;
              case "ACCOUNT_LOCKED":
                setError(
                  "Account temporarily locked due to too many failed attempts. Please try again later"
                );
                break;
              case "INVALID_EMAIL":
                setError("Please enter a valid email address");
                break;
              case "PASSWORD_REQUIRED":
                setError("Password is required");
                break;
              case "EMAIL_REQUIRED":
                setError("Email address is required");
                break;
              default:
                setError(
                  "Unable to sign in. Please try again or contact support if the problem persists"
                );
            }
            console.log("Login error:", ctx.error);
          },
        }
      );

      /**
       * callback functions have their own scope,
       * and returning from them doesn't affect the calling function's execution flow.
       */
      if (shouldRedirectToVerify) {
        router.push("/auth/verify?error=email_not_verified");
        return;
      }

      if (result?.data?.token) {
        router.push("/chat");
      }
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-zinc-400">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-zinc-600 focus:ring-zinc-600"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-zinc-600 focus:ring-zinc-600"
                />
                <div className="flex justify-end">
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-sm text-zinc-400 hover:text-white hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-zinc-900 hover:bg-zinc-100 font-medium"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-zinc-900 px-2 text-zinc-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <SignInOauthButton 
                  provider="github" 
                  onError={setError}
                />
                <SignInOauthButton 
                  provider="google" 
                  onError={setError}
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-zinc-400 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-white hover:underline font-medium">
                  Create one
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
