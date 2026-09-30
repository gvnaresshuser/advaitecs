import { Router } from "express";
import { generateNvidiaResponse } from "../services/nvidia.service.js";

const router = Router();

console.log("ROUTER NVIDIA - services/nvidia.service.js");

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const response = await generateNvidiaResponse(prompt);

    return res.json({
      response,
    });
  } catch (error) {
    console.error("NVIDIA API error:", error);

    return res.status(500).json({
      message: "Failed to generate AI response",
    });
  }
});

export default router;