import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { z } from "zod";

/**
 * Tests for environment variable validation.
 *
 * Note: Because lib/env.ts validates at module load time, we need to test
 * the validation logic in isolation rather than importing the module directly.
 */

// Define schemas matching lib/env.ts for testing
const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const clientSchema = z.object({});

describe("Environment Validation", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Create a fresh copy of process.env for each test
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe("Server Environment", () => {
    it("should accept valid NODE_ENV values", () => {
      const validEnvs = ["development", "production", "test"] as const;

      validEnvs.forEach((env) => {
        const testEnv = { ...process.env, NODE_ENV: env };
        const result = serverSchema.safeParse(testEnv);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.NODE_ENV).toBe(env);
        }
      });
    });

    it("should use default value when NODE_ENV is missing", () => {
      const testEnv: Record<string, string | undefined> = { ...process.env };
      delete testEnv.NODE_ENV;
      const result = serverSchema.safeParse(testEnv);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.NODE_ENV).toBe("development");
      }
    });

    it("should reject invalid NODE_ENV values", () => {
      const testEnv = { ...process.env, NODE_ENV: "invalid" };
      const result = serverSchema.safeParse(testEnv);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(["NODE_ENV"]);
      }
    });

    it("should reject empty NODE_ENV", () => {
      const testEnv = { ...process.env, NODE_ENV: "" };
      const result = serverSchema.safeParse(testEnv);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["NODE_ENV"]);
      }
    });
  });

  describe("Client Environment", () => {
    it("should validate successfully with no required variables", () => {
      const result = clientSchema.safeParse(process.env);

      expect(result.success).toBe(true);
    });

    it("should not fail when extra NEXT_PUBLIC_ variables exist", () => {
      const testEnv = { ...process.env, NEXT_PUBLIC_FUTURE_VAR: "some-value" };
      const result = clientSchema.safeParse(testEnv);

      expect(result.success).toBe(true);
    });
  });

  describe("Combined Validation", () => {
    it("should validate both server and client schemas successfully", () => {
      const testEnv = { ...process.env, NODE_ENV: "production" as const };

      const serverResult = serverSchema.safeParse(testEnv);
      const clientResult = clientSchema.safeParse(testEnv);

      expect(serverResult.success).toBe(true);
      expect(clientResult.success).toBe(true);
    });
  });

  describe("Type Safety", () => {
    it("should infer correct types from server schema", () => {
      type ServerEnv = z.infer<typeof serverSchema>;

      // This is a compile-time check, but we can assert the runtime shape
      const env: ServerEnv = {
        NODE_ENV: "development",
      };

      expect(env.NODE_ENV).toBe("development");

      // TypeScript will error if we try to assign an invalid value:
      // env.NODE_ENV = "invalid"; // Type error
    });

    it("should infer correct types from client schema", () => {
      type ClientEnv = z.infer<typeof clientSchema>;

      const env: ClientEnv = {};

      expect(env).toEqual({});
    });
  });
});
