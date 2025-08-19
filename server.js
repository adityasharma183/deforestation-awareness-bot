// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*' // tighten in production
}));
app.use(express.json());

// Optional system prompt to steer the model's persona
const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT || `You are DeforestBot: a friendly, factual chatbot that educates users about deforestation and encourages tree planting. Keep answers concise, cite sources when asked, and always include one short "how you can help" action.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages = [], model = 'deepseek/deepseek-r1' } = req.body;

    // Always add system prompt first so model is steered
    const payloadMessages = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];

    const resp = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model,
      messages: payloadMessages,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Forward OpenRouter response (trim as needed)
    res.json(resp.data);
  } catch (err) {
    console.error(err?.response?.data || err.message || err);
    res.status(500).json({ error: 'OpenRouter request failed', details: err?.response?.data || err.message });
  }
});
app.get('/', (req, res) => {
  res.send('Deforestation Chatbot Backend is running 🚀');
});


app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
