import OpenAI from "openai";

import type { AIProvider } from "./ai-provider.js";

export class NvidiaProvider implements AIProvider {
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY,
      baseURL: "https://integrate.api.nvidia.com/v1",
    });
  }

  async chat(message: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    return response.choices[0]?.message?.content ?? "";
  }
}