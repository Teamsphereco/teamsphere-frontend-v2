"use client"

import { useState } from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await authClient.signUp.email(
        {
          email,
          password,
          name,
        }, 
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            window.location.href = "/login"
          },
          onError: (ctx) => {
            switch (ctx.error.code) {
              case "PASSWORD_TOO_SHORT":
                setError("Password must be at least 8 characters long")
                break
              case "USER_ALREADY_EXISTS":
                setError("An account with this email already exists. Please sign in instead.")
                break
              case "INVALID_EMAIL":
                setError("Please enter a valid email address")
                break
              case "PASSWORD_TOO_WEAK":
                setError("Password is too weak. Please include uppercase, lowercase, numbers, and special characters")
                break
              case "NETWORK_ERROR":
                setError("Connection failed. Please check your internet and try again")
                break
              case "RATE_LIMITED":
                setError("Too many attempts. Please wait a moment before trying again")
                break
              default:
                setError("Unable to create account. Please try again or contact support if the problem persists")
            }
          }
        }
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-zinc-600 focus:ring-zinc-600"
                />
              </div>
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
              </div>
              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-zinc-900 hover:bg-zinc-100 font-medium"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-zinc-400 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-white hover:underline font-medium">
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
