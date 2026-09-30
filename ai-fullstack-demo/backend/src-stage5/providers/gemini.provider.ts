import { GoogleGenAI } from "@google/genai";

import type { AIProvider } from "./ai-provider.js";

export class GeminiProvider implements AIProvider {
  private readonly ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async chat(message: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
    });

    return response.text ?? "";
  }
}