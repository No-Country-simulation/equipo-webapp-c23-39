'use client';

import { useState, useEffect } from 'react';
import { BsArrowRightCircle } from "react-icons/bs";

export default function InteractiveForm() {
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false); // NOTA: Aqui el Estado para controlar la validez del texto

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

    setMessages((prev) => [...prev, `Tú: ${description}`]);
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
      setMessages((prev) => [...prev, `Bot: ${result.message}`]);
      scrollToBottom();
    } else {
      console.error('Error:', result.error);
    }

    setIsValid(false); // NOTA : Desactiva el botón después de enviar
  };

  const handleCopy = () => {
    const botMessages = messages.filter((msg) => msg.startsWith('Bot:'));
    const lastBotMessage = botMessages[botMessages.length - 1]; // NOTA: Último mensaje del bot

    if (lastBotMessage) {
      const messageToCopy = lastBotMessage.replace('Bot: ', '');
      navigator.clipboard.writeText(messageToCopy);
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
    <div className="w-full">
      <div id="chat-content" className="flex flex-col space-y-4">
        {messages.map((msg, index) => (
          <p key={index} className="text-white">
            {msg}
          </p>
        ))}
      </div>
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
            disabled={!isValid || loading} // NOTA: Botón desactivado si no es válido o está cargando
          >
            <BsArrowRightCircle size={30} />
          </button>
        </div>
      </form>

      {/* NOTA : Botón para copiar el último mensaje del bot */}
      {messages.some((msg) => msg.startsWith('Bot:')) && (
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
