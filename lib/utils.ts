import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z\s'-]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Additional checks
  const trimmedEmail = email.trim();
  
  // Check basic format
  if (!emailRegex.test(trimmedEmail)) {
    return false;
  }

  // Check length constraints
  if (trimmedEmail.length > 254) { // RFC 5321 limit
    return false;
  }

  // Split and check local and domain parts
  const [localPart, domainPart] = trimmedEmail.split('@');
  
  // Check local part length (before @)
  if (localPart.length > 64) { // RFC 5321 limit
    return false;
  }

  // Check domain part length (after @)
  if (domainPart.length > 253) {
    return false;
  }

  // Check for consecutive dots
  if (trimmedEmail.includes('..')) {
    return false;
  }

  // Check that local part doesn't start or end with a dot
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return false;
  }

  return true;
}

export function validateEmailWithMessage(email: string): { isValid: boolean; message?: string } {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: "Email is required" };
  }

  const trimmedEmail = email.trim();
  
  if (!trimmedEmail) {
    return { isValid: false, message: "Email is required" };
  }

  if (!isValidEmail(trimmedEmail)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }

  return { isValid: true };
}
