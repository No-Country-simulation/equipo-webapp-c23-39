'use client';

import { useState } from 'react';
import { BsArrowRightCircle } from "react-icons/bs";

export default function InteractiveForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const description = e.target.description.value;
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
      setMessage(result.message);
    } else {
      console.error('Error:', result.error);
    }
  };

  const handleCopy = () => {
    if (message) {
      navigator.clipboard.writeText(message);
      alert('message copied to clipboard!');
    }
  };

  const handleRegenerate = async () => {
    if (message) {
      setLoading(true);
      const description = message;
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const result = await response.json();
      setLoading(false);

      if (result.message) {
        setMessage(result.message);
      }
    }
  };

  return (
    <div className="w-full relative">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <textarea
            id="description"
            name="description"
            rows={10}
            placeholder="Escribe tu Consulta aqui..."
            className="
              block 
              w-full
              px-4 
              py-3 
              mt-4
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
            "
            disabled={loading}
          >
            <BsArrowRightCircle size={30} />
          </button>
        </div>
      </form>

      {message && (
        <div className="mt-6 text-white">
          <p className="text-lg">{message}</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-violet-500 rounded-full text-white hover:bg-violet-400"
            >
              Copy
            </button>
            <button
              onClick={handleRegenerate}
              className="px-4 py-2 bg-orange-500 rounded-full text-white hover:bg-orange-400"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50">
          <span className="text-white">Generating...</span>
        </div>
      )}
    </div>
  );
}
