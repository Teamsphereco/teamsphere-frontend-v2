"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { resetPassword } from '@/lib/auth-client'
import Link from 'next/link'
import { useRouter} from 'next/navigation'
import React, { useEffect, useState, use } from 'react';

interface PageProps {
  searchParams: Promise<{ token?: string }>
}
export default function ResetPasswordPage(props: PageProps) {
  const searchParams = use(props.searchParams);
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()
  const token = searchParams.token

  // Check if passwords match in real-time
  const passwordsMatch = password === confirmPassword && confirmPassword !== ""
  const passwordsDoNotMatch = confirmPassword !== "" && password !== confirmPassword

  // Redirect if no token is provided
  useEffect(() => {
    if (!token) {
      router.push('/auth/forgot-password')
    }
  }, [token, router])

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return "Password must be at least 8 characters long"
    }
    if (!/(?=.*[a-z])/.test(pwd)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/(?=.*[A-Z])/.test(pwd)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/(?=.*\d)/.test(pwd)) {
      return "Password must contain at least one number"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    // Validate password strength
    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      setLoading(false)
      return
    }

    try {
      // Replace with your actual reset password API call
    const result = await resetPassword({
      newPassword: password,
      token,
      }, {
        onError: (ctx) => {
          setLoading(false);
          switch (ctx.error.code) {
            case "INVALID_TOKEN":
            case "EXPIRED_TOKEN":
              setError("Reset link is invalid or has expired. Please request a new password reset");
              break;
            case "PASSWORD_TOO_WEAK":
              setError("Password does not meet security requirements");
              break;
            case "PASSWORD_REQUIRED":
              setError("Password is required");
              break;
            case "TOKEN_ALREADY_USED":
              setError("This reset link has already been used. Please request a new password reset");
              break;
            default:
              setError("Unable to reset password. Please try again or contact support");
          }
          console.log("Password reset error:", ctx.error);
        },
      });

      if (result?.data?.status) {
        setSuccess(true);
      }
    } catch {
      setError("Unable to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return null // Will redirect via useEffect
  }

  if (success) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">Password Reset Complete</CardTitle>
              <CardDescription className="text-zinc-400">
                Your password has been successfully updated
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-zinc-300 text-sm">
                You can now sign in with your new password.
              </p>
              <Button
                onClick={() => router.push("/auth/login")}
                className="w-full bg-white text-zinc-900 hover:bg-zinc-100 font-medium"
              >
                Sign In
              </Button>
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
            <CardTitle className="text-2xl font-bold text-white">Create New Password</CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-zinc-600 focus:ring-zinc-600 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-zinc-600 focus:ring-zinc-600 pr-10 ${
                      passwordsMatch ? 'border-green-500 focus:border-green-500 focus:ring-green-500' : 
                      passwordsDoNotMatch ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Real-time password match indicator */}
                {confirmPassword !== "" && (
                  <div className={`flex items-center gap-2 text-xs ${
                    passwordsMatch ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <div className={`w-1 h-1 rounded-full ${
                      passwordsMatch ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </div>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-zinc-800/50 rounded-lg p-3">
                <p className="text-zinc-400 text-xs font-medium mb-2">Password must contain:</p>
                <div className="space-y-1 text-xs">
                  <div className={`flex items-center gap-2 ${password.length >= 8 ? 'text-green-400' : 'text-zinc-500'}`}>
                    <div className={`w-1 h-1 rounded-full ${password.length >= 8 ? 'bg-green-400' : 'bg-zinc-500'}`}></div>
                    At least 8 characters
                  </div>
                  <div className={`flex items-center gap-2 ${/(?=.*[a-z])/.test(password) ? 'text-green-400' : 'text-zinc-500'}`}>
                    <div className={`w-1 h-1 rounded-full ${/(?=.*[a-z])/.test(password) ? 'bg-green-400' : 'bg-zinc-500'}`}></div>
                    One lowercase letter
                  </div>
                  <div className={`flex items-center gap-2 ${/(?=.*[A-Z])/.test(password) ? 'text-green-400' : 'text-zinc-500'}`}>
                    <div className={`w-1 h-1 rounded-full ${/(?=.*[A-Z])/.test(password) ? 'bg-green-400' : 'bg-zinc-500'}`}></div>
                    One uppercase letter
                  </div>
                  <div className={`flex items-center gap-2 ${/(?=.*\d)/.test(password) ? 'text-green-400' : 'text-zinc-500'}`}>
                    <div className={`w-1 h-1 rounded-full ${/(?=.*\d)/.test(password) ? 'bg-green-400' : 'bg-zinc-500'}`}></div>
                    One number
                  </div>
                  {/* Add password match requirement */}
                  <div className={`flex items-center gap-2 ${passwordsMatch ? 'text-green-400' : 'text-zinc-500'}`}>
                    <div className={`w-1 h-1 rounded-full ${passwordsMatch ? 'bg-green-400' : 'bg-zinc-500'}`}></div>
                    Passwords must match
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}
              <Button
                type="submit"
                disabled={loading || !passwordsMatch || validatePassword(password) !== null}
                className="w-full bg-white text-zinc-900 hover:bg-zinc-100 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating Password..." : "Update Password"}
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
  );
}