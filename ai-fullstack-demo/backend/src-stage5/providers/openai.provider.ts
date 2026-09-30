import OpenAI from "openai";

import type { AIProvider } from "./ai-provider.js";

export class OpenAIProvider implements AIProvider {
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chat(message: string): Promise<string> {
    const response = await this.client.responses.create({
      model: "gpt-5.6-luna",
      input: message,
    });

    return response.output_text;
  }
}