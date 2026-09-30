import { Router } from "express";
import {
  generateGeminiResponseUsingOpenAI,
} from "../services/openai.service.js";

const router = Router();

console.log("ROUTER OPENAI - openai.service");

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const response =
      await generateGeminiResponseUsingOpenAI(prompt);

    return res.json({
      response,
    });
  } catch (error) {
    console.error("Gemini OpenAI-compatible API error:", error);

    return res.status(500).json({
      message: "Failed to generate AI response",
    });
  }
});

export default router;