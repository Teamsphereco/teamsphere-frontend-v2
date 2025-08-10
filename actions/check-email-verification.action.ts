"use server";

import { db } from "@/db";
import { user } from "@/db/auth-schema";
import { validateEmailWithMessage } from "@/lib/utils";
import { eq } from "drizzle-orm";

export async function checkEmailVerification(email: string) {
  try {
    // Server-side email validation
    const validation = validateEmailWithMessage(email);
    if (!validation.isValid) {
      return { isVerified: false, exists: false, error: validation.message };
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Query the database to check if user exists and is verified
    const existingUser = await db
      .select({
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
      })
      .from(user)
      .where(eq(user.email, trimmedEmail))
      .limit(1);

    if (existingUser.length === 0) {
      // User doesn't exist, so they can send verification email
      return { isVerified: false, exists: false };
    }

    const userData = existingUser[0];
    return { 
      isVerified: userData.emailVerified, 
      exists: true 
    };

  } catch (error) {
    console.error("Error checking email verification:", error);
    return { isVerified: false, exists: false, error: "Internal server error" };
  }
}