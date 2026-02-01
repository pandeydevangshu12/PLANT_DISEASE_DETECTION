import express from "express";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());

// Gemini init
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/", upload.single("plantMedia"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const base64Data = req.file.buffer.toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            { text: "You are a botanist. Identify this plant, find diseases, and suggest a cure." },
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: base64Data,
              },
            },
          ],
        },
      ],
    });

    res.json({
      analysis: response.text || "No analysis generated",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini analysis failed" });
  }
});

// 👇 THIS is the key line for Vercel
export default app;
