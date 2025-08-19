🌱 Deforestation Awareness Bot

An interactive chatbot that educates users about deforestation, shares fun facts about forests, and encourages eco-friendly actions like tree planting.
Built with React (frontend) and Express + OpenRouter API (backend).

🚀 Features

💬 Conversational Chatbot — Ask questions about forests, climate change, or reforestation.

🌿 Fun Forest Facts — Bot automatically shares quick facts every few minutes.

✨ Beautiful UI — Animated leaves background, gradient header, and smooth message bubbles.

🔄 Conversation Reset — Start fresh anytime with one click.

🔌 OpenRouter Integration — Powered by LLMs through the OpenRouter API
.

🔐 Configurable Environment Variables for API keys and frontend origin.

🏗️ Tech Stack
Frontend (React)

⚛️ React + Vite

🎨 TailwindCSS + Framer Motion for animations

🌱 Lucide Icons

Backend (Node.js + Express)

⚡ Express.js

🔒 dotenv (for env variables)

🔄 CORS enabled

🤖 Connects to OpenRouter Chat API

📂 Project Structure
deforestation-awareness-bot/
 ├── backend/                 # Express.js backend server
 │   ├── server.js
 │   ├── package.json
 │   └── .env (ignored)
 │
 └── frontend/def-bot/        # React frontend
     ├── src/
     │   ├── App.jsx
     │   ├── components/
     │   │   ├── Message.jsx
     │   │   └── ChatWindow.jsx
     │   └── styles.css
     ├── package.json
     └── vite.config.js

⚙️ Setup Instructions
1. Clone the repo
git clone https://github.com/adityasharma183/deforestation-awareness-bot.git
cd deforestation-awareness-bot

2. Backend Setup
cd backend
npm install

Create a .env file in backend/ with:

OPENROUTER_API_KEY=your_openrouter_api_key
FRONTEND_ORIGIN=http://localhost:5173
SYSTEM_PROMPT=You are DeforestBot: a friendly, factual chatbot...


Start backend server:

npm start

3. Frontend Setup
cd ../frontend/def-bot
npm install
npm run dev


Frontend runs on: http://localhost:5173

🌐 API Endpoint
POST /api/chat

Request:

{
  "messages": [
    { "role": "user", "content": "Why is deforestation harmful?" }
  ],
  "model": "deepseek/deepseek-r1"
}


Response (sample):

{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Deforestation reduces biodiversity, accelerates climate change, and disrupts rainfall. 🌱 How you can help: support reforestation projects."
      }
    }
  ]
}


🔮 Future Improvements

📊 Add charts/visuals for deforestation statistics

📱 Make UI fully mobile-friendly

🌍 Multi-language support

📝 Persistent chat history

🤝 Contributing

Pull requests are welcome! Please open an issue first for discussion.

📜 License

MIT License © 2025 Aditya Sharma
