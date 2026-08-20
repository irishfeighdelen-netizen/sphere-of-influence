import express from "express";
import { askGemini } from "../services/geminiService.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Please include a message.",
      });
    }

    const reply = await askGemini(message);

    res.json({
      reply,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      error: "Gemini failed to respond.",
    });
  }
});

export default router;