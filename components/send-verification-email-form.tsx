"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendVerificationEmail } from "@/lib/auth-client";
import { checkEmailVerification } from "@/actions/check-email-verification.action";
import { validateEmailWithMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const SendVerificationEmailForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    
    if (email && emailError) {
      // Clear error if user starts typing and there was an error
      setEmailError("");
    }
  };

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email")).trim();

    // Client-side email validation
    const validation = validateEmailWithMessage(email);
    if (!validation.isValid) {
      setEmailError(validation.message || "Invalid email");
      return;
    }

    // Clear any existing error
    setEmailError("");
    setIsPending(true);

    try {
      // Check if the email is already verified in the database
      const verificationStatus = await checkEmailVerification(email);

      if (verificationStatus.error) {
        toast.error(verificationStatus.error);
        setIsPending(false);
        return;
      }

      if (verificationStatus.isVerified) {
        toast.error(
          "This email is already verified. You can sign in normally."
        );
        setIsPending(false);
        return;
      }

      await sendVerificationEmail({
        email,
        callbackURL: "/auth/verify",
        fetchOptions: {
          onRequest: () => {
            // Already set isPending above
          },
          onResponse: () => {
            setIsPending(false);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success("Verification email sent successfully. Please check your email.");
            setEmailSent(true);
          },
        },
      });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Failed to process request. Please try again.");
      setIsPending(false);
    }
  }

  if (emailSent) {
    return (
      <div className="max-w-md w-full space-y-6 text-center animate-in fade-in-0 zoom-in-95 duration-500">
        {/* Animated Success Icon */}
        <div className="relative mx-auto w-20 h-20 mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-lg shadow-emerald-500/25">
            <svg 
              className="w-10 h-10 text-white animate-in zoom-in-0 duration-700 delay-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Main Success Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl shadow-slate-900/20">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-4 right-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-20 h-20 bg-green-500/10 rounded-full blur-2xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
              Email Sent Successfully! 🎉
            </h2>
            
            <div className="space-y-3">
              <p className="text-slate-200 font-medium text-lg">
                Check your inbox for the verification link
              </p>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                We've sent a verification email to your address. Click the link in the email to complete your registration and get started.
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-2 pt-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="w-8 h-0.5 bg-emerald-500/30 rounded-full">
                  <div className="w-full h-full bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
              </div>
              <span className="text-xs text-slate-500 ml-2">Step 1 of 2</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setEmailSent(false)}
            className="flex-1 bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700/80 hover:border-slate-500 transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Another Email
          </Button>
          
          <Button
            type="button"
            variant="default"
            onClick={() => router.push('/auth/login')}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white border-0 shadow-lg shadow-emerald-500/20 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Back to Sign In
          </Button>
        </div>
        
        {/* Help text */}
        <div className="pt-4 border-t border-slate-700/30">
          <p className="text-xs text-slate-500">
            Didn't receive the email? Check your spam folder or 
            <button 
              onClick={() => setEmailSent(false)}
              className="text-emerald-400 hover:text-emerald-300 ml-1 underline underline-offset-2 transition-colors"
            >
              try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="max-w-sm w-full space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          type="email" 
          id="email" 
          name="email" 
          onChange={handleEmailChange}
          className={emailError ? "border-red-500 focus:ring-red-500" : ""}
          placeholder="Enter your email address"
        />
        {emailError && (
          <p className="text-red-400 text-sm">{emailError}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending || !!emailError}>
        {isPending ? "Sending..." : "Send Verification Email"}
      </Button>
    </form>
  );
};