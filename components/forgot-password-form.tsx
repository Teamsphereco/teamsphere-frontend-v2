"use client"
import authClient, { forgetPassword } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { SetStateAction, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await forgetPassword({
        email,
        redirectTo: "/auth/reset-password",
      }, {
        onError: (ctx) => {
          setLoading(false);
          switch (ctx.error.code) {
            case "INVALID_EMAIL":
              setError("Please enter a valid email address");
              break;
            case "EMAIL_REQUIRED":
              setError("Email address is required");
              break;
            case "USER_NOT_FOUND":
              // For security, don't reveal if user exists
              setSuccess(true);
              break;
            case "RATE_LIMIT_EXCEEDED":
              setError("Too many reset attempts. Please try again later");
              break;
            default:
              setError("Unable to send reset email. Please try again or contact support");
          }
          console.log("Password reset error:", ctx.error);
        },
      });

      if (result.data?.status) {
        setSuccess(true);
      }
    } catch {
      setError("Unable to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">Check Your Email</CardTitle>
              <CardDescription className="text-zinc-400">
                We've sent password reset instructions to your email address
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-zinc-300 text-sm">
                If an account with that email exists, you'll receive reset instructions shortly.
                Check your spam folder if you don't see it.
              </p>
              <div className="space-y-3 pt-4">
                <Button
                  onClick={() => router.push("/auth/login")}
                  className="w-full bg-white text-zinc-900 hover:bg-zinc-100 font-medium"
                >
                  Back to Sign In
                </Button>
                <Button
                  onClick={() => {
                    setSuccess(false);
                    setEmail("");
                  }}
                  variant="ghost"
                  className="w-full text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  Send Another Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Reset Your Password</CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your email address and we'll send you instructions to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setEmail(e.target.value)}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-zinc-600 focus:ring-zinc-600"
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-zinc-900 hover:bg-zinc-100 font-medium"
              >
                {loading ? "Sending..." : "Send Reset Instructions"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-zinc-400 text-sm">
                Remember your password?{" "}
                <Link href="/auth/login" className="text-white hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}