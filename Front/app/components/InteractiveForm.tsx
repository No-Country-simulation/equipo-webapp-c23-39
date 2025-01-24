'use client';

import { useState, useEffect, useRef } from 'react';
import { BsArrowRightCircle } from "react-icons/bs";
import ReactMarkdown from 'react-markdown';
import { AiOutlineCopy } from "react-icons/ai";

export default function InteractiveForm() {
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

 
  const chatContentRef = useRef<HTMLDivElement>(null);

  // Función para desplazarse al final del chat
  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTo({
        top: chatContentRef.current.scrollHeight,
        behavior: "smooth", // Desplazamiento suave
      });
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.trim() && value.length >= 10) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = e.currentTarget.description.value;

    setMessages((prev) => [...prev, { sender: 'Tú', content: description }]);
    e.currentTarget.reset();
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
      scrollToBottom(); // Llama a scrollToBottom después de agregar el mensaje
    } else {
      console.error('Error:', result.error);
    }

    setIsValid(false);
  };

  // Ejecuta scrollToBottom cada vez que cambien los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      ref={chatContentRef} // Asigna el ref al contenedor
      id="chat-content"
      className="flex flex-col space-y-4 max-h-[500px] overflow-y-auto"
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex flex-col p-6 rounded-lg ${
            msg.sender === 'Bot' ? 'bg-gray-800 text-white self-start' : 'bg-violet-600 text-white self-end'
          } max-w-lg w-fit shadow-md relative`}
        >
          <p className="font-bold mb-2">{msg.sender}:</p>
          <ReactMarkdown className="prose prose-invert">{msg.content}</ReactMarkdown>

          {/* Mostrar botón de copia solo para mensajes del Bot */}
          {msg.sender === 'Bot' && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(msg.content);
                alert('Mensaje copiado al portapapeles!');
              }}
              className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm"
              title="Copiar"
            >
              <AiOutlineCopy className="w-3 h-3" />
             
            </button>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mt-4 relative">
        <div className="relative">
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Escribe tu consulta aquí..."
            className="block w-full px-4 py-3 bg-[#1a1a2e] text-lg text-center border border-gray-#1a1a2e text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-#1a1a2e focus:border-transparent resize-none"
            onChange={handleTextareaChange}
            disabled={loading}
          />
          <button
            type="submit"
            className="absolute bottom-2 right-2 p-2 rounded-full text-white bg-transparent hover:bg-[#272745] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isValid || loading}
          >
            <BsArrowRightCircle size={30} />
          </button>

          {/* Barra de carga */}
          {loading && (
            <div className="absolute bottom-[-10px] left-0 w-full h-1 bg-gray-700">
              <div
                className="h-full bg-blue-900 animate-loading-bar"
                style={{ width: "100%" }}
              ></div>
            </div>
          )}
        </div>
      </form>

      {/* Botón para bajar al final, visible solo cuando hay mensajes del Bot */}
      {messages.some((msg) => msg.sender === 'Bot') && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-full shadow-lg focus:outline-none animate-bounce"
        >
          ↓
        </button>
      )}
    </div>
  );
}
