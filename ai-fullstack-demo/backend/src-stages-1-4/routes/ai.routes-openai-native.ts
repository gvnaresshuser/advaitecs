import { Router } from "express";
import { generateOpenAIResponse } from "../services/openai-native.service.js";

const router = Router();

console.log("ROUTER OPENAI - services/openai-native.service.js");

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const response = await generateOpenAIResponse(prompt);

    return res.json({
      response,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);

    return res.status(500).json({
      message: "Failed to generate AI response",
    });
  }
});

export default router;