import React, { useState } from 'react';
import Message from './Message';

export default function ChatWindow({ messages, setMessages }) {
  const [input, setInput] = useState('');
  const sendingRef = React.useRef(false);

  const sendMessage = async () => {
    if (!input.trim() || sendingRef.current) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    sendingRef.current = true;

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await resp.json();
      // OpenRouter returns choices -> message
      const botText = data?.choices?.[0]?.message?.content || data?.output || 'Sorry — no response.';
      setMessages(m => [...m, { role: 'assistant', content: botText }]);
    } catch (err) {
      setMessages(m => [...m, { role: 'assistant', content: 'Error contacting server. Try again.' }]);
      console.error(err);
    } finally {
      sendingRef.current = false;
    }
  };

  return (
    <div className="flex flex-col h-[70vh]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">DeforestBot 🌳</h2>
        <p className="text-sm text-gray-600">Learn, ask questions, and get encouraged to plant trees.</p>
      </div>

      <div className="flex-1 p-4 overflow-auto space-y-3">
        {messages.map((m, i) => <Message key={i} role={m.role} content={m.content} />)}
      </div>

      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=> e.key === 'Enter' && sendMessage()}
          placeholder="Ask about deforestation, e.g. 'Why is mangrove protection important?'"
          className="flex-1 rounded-full border px-4 py-2 focus:outline-none"
        />
        <button onClick={sendMessage} className="bg-green-600 text-white px-4 py-2 rounded-full">Send</button>
      </div>
    </div>
  );
}
