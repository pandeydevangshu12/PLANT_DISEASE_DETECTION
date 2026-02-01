import express from 'express';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static('public'));
app.use(express.json());

// Initialize the New SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/analyze', upload.single('plantMedia'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        console.log(`Processing ${req.file.mimetype}...`);
        const base64Data = req.file.buffer.toString('base64');

        // You are using the cutting-edge model
        const MODEL_NAME = "gemini-3-flash-preview";
        // Note: If 'gemini-3-flash-preview' fails, switch back to 'gemini-2.0-flash-exp'

        const response = await ai.models.generateContent({
            model: MODEL_NAME, 
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: "You are a botanist. Identify this plant, find diseases, and suggest a cure." },
                        { inlineData: { mimeType: req.file.mimetype, data: base64Data } }
                    ]
                }
            ]
        });

        // --- FIX IS HERE: Use .text (property), not .text() (function) ---
        const text = response.text || "No analysis could be generated."; 
        
        console.log("✅ Analysis Success!");
        res.json({ analysis: text });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: error.message || "Failed to analyze plant." });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});