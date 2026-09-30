import { Router } from "express";
import { generateGeminiResponse } from "../services/gemini.service.js";

const router = Router();

console.log("ROUTER GEMINI - services/gemini.service.js");

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const response = await generateGeminiResponse(prompt);

    return res.json({
      response,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    return res.status(500).json({
      message: "Failed to generate AI response",
    });
  }
});

export default router;