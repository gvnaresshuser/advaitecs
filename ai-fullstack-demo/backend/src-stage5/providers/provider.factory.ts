import type { AIProvider } from "./ai-provider.js";

import { GeminiProvider } from "./gemini.provider.js";
import { OpenAIProvider } from "./openai.provider.js";
import { NvidiaProvider } from "./nvidia.provider.js";

export function createAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER?.toLowerCase();

  switch (provider) {
    case "gemini":
      return new GeminiProvider();

    case "openai":
      return new OpenAIProvider();

    case "nvidia":
      return new NvidiaProvider();

    default:
      throw new Error(
        `Unsupported AI_PROVIDER: ${provider ?? "undefined"}`,
      );
  }
}