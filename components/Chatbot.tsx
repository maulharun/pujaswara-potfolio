'use client';

import { useState } from 'react';

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Gagal mendapatkan balasan.' }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error dalam mengirim pesan.' }]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 flex flex-col">
        <h2 className="text-center text-2xl font-bold mb-4">Chatbot Pintar</h2>

        <div className="flex-1 overflow-y-auto mb-4 space-y-2 max-h-80">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
              <span className="inline-block bg-gray-200 rounded-lg px-3 py-2 text-sm">{msg.content}</span>
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-2 flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pesanmu..."
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg px-4 py-2"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
