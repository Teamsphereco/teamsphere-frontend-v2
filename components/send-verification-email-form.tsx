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
            // Don't redirect to /chat, just show success state
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
      <div className="max-w-sm w-full space-y-4 text-center">
        <div className="p-4 bg-green-950/50 border border-green-800 rounded-md">
          <p className="text-green-200 font-medium">Email sent successfully!</p>
          <p className="text-green-300 text-sm mt-2">
            Please check your email and click the verification link to complete your registration.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setEmailSent(false)}
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          Send Another Email
        </Button>
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
