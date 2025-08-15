import { ReturnButton } from "@/components/return-button";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 border-zinc-800 shadow-2xl rounded-lg p-8 text-center space-y-6">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-white">Account Created Successfully!</h1>
            
            <p className="text-zinc-300 leading-relaxed">
              Welcome to TeamSphere! We've sent a verification email to your inbox.
            </p>
          </div>

          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 space-y-3">
            <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wide">
              Next Steps
            </h2>
            <div className="space-y-2 text-sm text-zinc-300 text-left">
              <p>1. Check your email inbox (and spam folder)</p>
              <p>2. Click the verification link in the email</p>
              <p>3. Sign in to start using TeamSphere</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-zinc-400">
              Didn't receive the email? Check your spam folder or{" "}
              <a href="/auth/verify?error=resend_verification" className="text-white hover:underline">
                request a new verification email
              </a>.
            </p>
            
            <div className="w-full">
              <ReturnButton 
                href="/auth/login" 
                label="Go to Sign In" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}