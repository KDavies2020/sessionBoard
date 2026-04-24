import { z } from "zod";

/**
 * Environment configuration with type-safe validation.
 *
 * This module:
 * - Validates all environment variables at application startup
 * - Separates server-only secrets from client-safe public variables
 * - Provides a single import point for accessing validated configuration
 * - Fails fast with clear error messages if required variables are missing or invalid
 *
 * Security:
 * - Server variables must NEVER be exposed to the client
 * - Only NEXT_PUBLIC_* variables are safe for client use
 * - Direct access to process.env should only happen in this file
 */

/**
 * Server-only environment variables.
 * These contain secrets and must NEVER be exposed to the client.
 */
const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  // Future server-only variables will be added here:
  // DATABASE_URL: z.string().url().min(1),
  // CLERK_SECRET_KEY: z.string().min(1),
});

/**
 * Client-safe environment variables.
 * These are prefixed with NEXT_PUBLIC_ and can be accessed in browser code.
 */
const clientSchema = z.object({
  // Future client-safe variables will be added here:
  // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
});

/**
 * Validates environment variables and returns typed configuration.
 * This runs at module load time to fail fast on invalid configuration.
 */
function validateEnv() {
  // Validate server environment
  const serverResult = serverSchema.safeParse(process.env);

  if (!serverResult.success) {
    console.error("❌ Invalid server environment variables:");
    console.error(JSON.stringify(serverResult.error.format(), null, 2));
    throw new Error("Invalid server environment variables");
  }

  // Validate client environment
  const clientResult = clientSchema.safeParse(process.env);

  if (!clientResult.success) {
    console.error("❌ Invalid client environment variables:");
    console.error(JSON.stringify(clientResult.error.format(), null, 2));
    throw new Error("Invalid client environment variables");
  }

  return {
    server: serverResult.data,
    client: clientResult.data,
  };
}

// Run validation at module load time
const env = validateEnv();

/**
 * Server-only environment configuration.
 *
 * SECURITY: Do NOT import this in client components or pages.
 * Only use in:
 * - Server Components
 * - API routes
 * - Server Actions
 * - Middleware
 */
export const serverEnv = env.server;

/**
 * Client-safe environment configuration.
 * Safe to use in browser code.
 */
export const clientEnv = env.client;

/**
 * Type definitions for environment variables.
 */
export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;
