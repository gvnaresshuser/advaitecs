import type { AIProvider } from "../providers/ai-provider.js";

export class AIService {
  constructor(private readonly provider: AIProvider) {}

  async chat(message: string): Promise<string> {
    return this.provider.chat(message);
  }
}