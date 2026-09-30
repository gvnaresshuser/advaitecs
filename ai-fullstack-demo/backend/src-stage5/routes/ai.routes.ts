import { Router, type Request, type Response } from "express";

import { createAIProvider } from "../providers/provider.factory.js";
import { AIService } from "../services/ai.service.js";

const router = Router();

const aiProvider = createAIProvider();
const aiService = new AIService(aiProvider);

router.post("/chat", async (req: Request, res: Response) => {
  try {
const { prompt } = req.body;

if (!prompt || typeof prompt !== "string") {
  return res.status(400).json({
    error: "Prompt is required",
  });
}

const response = await aiService.chat(prompt);

    return res.json({
      response,
    });
  } catch (error) {
    console.error("AI Chat Error:", error);

    return res.status(500).json({
      error: "Failed to get AI response",
    });
  }
});

export default router;