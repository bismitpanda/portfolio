import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    GITHUB_CLIENT_ID: z.string().optional().default(""),
    GITHUB_CLIENT_SECRET: z.string().optional().default(""),
  },
  clientPrefix: "TANSTACK_PUBLIC_",
  client: {},
  runtimeEnv: process.env,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
