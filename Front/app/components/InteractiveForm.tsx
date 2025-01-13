'use client';

import { useState, useEffect } from 'react';
import { BsArrowRightCircle } from "react-icons/bs";
import ReactMarkdown from 'react-markdown'; 

export default function InteractiveForm() {
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.trim() && value.length >= 10) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const description = e.target.description.value;

    setMessages((prev) => [...prev, { sender: 'Tú', content: description }]);
    e.target.reset();
    setLoading(true);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });

    const result = await response.json();
    setLoading(false);

    if (result.message) {
      setMessages((prev) => [...prev, { sender: 'Bot', content: result.message }]);
      scrollToBottom();
    } else {
      console.error('Error:', result.error);
    }

    setIsValid(false);
  };

  const handleCopy = () => {
    const botMessages = messages.filter((msg) => msg.sender === 'Bot');
    const lastBotMessage = botMessages[botMessages.length - 1]?.content;

    if (lastBotMessage) {
      navigator.clipboard.writeText(lastBotMessage);
      alert('Mensaje copiado al portapapeles!');
    }
  };

  const scrollToBottom = () => {
    const chatContent = document.getElementById('chat-content');
    if (chatContent) {
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
      <div id="chat-content" className="flex flex-col space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`
              flex flex-col p-4 rounded-lg 
              ${msg.sender === 'Bot' ? 'bg-gray-800 text-white self-start' : 'bg-violet-600 text-white self-end'}
              max-w-lg w-fit shadow-md
            `}
          >
            <p className="font-bold mb-2">{msg.sender}:</p>
            <ReactMarkdown className="prose prose-invert">{msg.content}</ReactMarkdown>
          </div>
        ))}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative">
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Escribe tu consulta aquí..."
            className="
              block 
              w-full
              px-4 
              py-3 
              bg-[#1a1a1a]
              text-lg
              border 
              border-gray-300 
              text-white
              rounded-md 
              focus:outline-none 
              focus:ring-2 
              focus:ring-gray-300 
              focus:border-transparent
            "
            onChange={handleTextareaChange}
          />
          <button
            type="submit"
            className="
              absolute 
              bottom-2 
              right-2 
              p-2 
              rounded-full 
              text-white 
              bg-transparent 
              hover:bg-gray-700 
              disabled:opacity-50 
              disabled:cursor-not-allowed
            "
            disabled={!isValid || loading}
          >
            <BsArrowRightCircle size={30} />
          </button>
        </div>
      </form>

      {messages.some((msg) => msg.sender === 'Bot') && (
        <div className="mt-6 text-white">
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-violet-500 rounded-full text-white hover:bg-violet-400"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
