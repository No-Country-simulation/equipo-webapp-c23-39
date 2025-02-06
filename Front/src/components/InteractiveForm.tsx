'use client';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { BsArrowRightCircle } from "react-icons/bs";
import ReactMarkdown from 'react-markdown';
import { AiOutlineCopy } from "react-icons/ai";
import { Loader2, Send, Copy, RefreshCw } from "lucide-react";

export default function InteractiveForm() {
  
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([
    {
      sender: "Bot",
      content: "¡Hola! Soy Migo Trip 😁, en que puedo ayudarte, sobre tu proximos planes de viaje?"
    }
  ]);


  
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const {data: session} = useSession();
  const userId = session?.user?.id
 
  const chatContentRef = useRef<HTMLDivElement>(null);

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

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const description = formData.get('description') as string;
  //   const userId = "tu-user-id"; // Reemplazar con lógica de autenticación
  
  //   setMessages(prev => [...prev, { sender: 'Tú', content: description }]);
  //   e.currentTarget.reset();
  //   setLoading(true);
  
  //   try {
  //     // const response = await fetch('http://localhost:3001/api/chat', {
  //       const response = await fetch('http://localhost:3001/chatBot/chat', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ 
  //         userId,
  //         message: description 
  //       }),
  //     });
  
  //     if (!response.body) throw new Error('Error en la respuesta');
      
  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder();
  //     let botResponse = '';
  
  //     while (true) {
  //       const { done, value } = await reader.read();
  //       if (done) break;
        
  //       const chunk = decoder.decode(value);
  //       botResponse += chunk;
        
  //       setMessages(prev => {
  //         const lastMessage = prev[prev.length - 1];
  //         if (lastMessage.sender === 'Bot') {
  //           return [
  //             ...prev.slice(0, -1),
  //             { sender: 'Bot', content: botResponse }
  //           ];
  //         }
  //         return [...prev, { sender: 'Bot', content: botResponse }];
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setMessages(prev => [...prev, { 
  //       sender: 'Bot', 
  //       content: '⚠️ Error al obtener respuesta' 
  //     }]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = e.currentTarget.description.value;


    setMessages((prev) => [...prev, { sender: 'Tú', content: description }]);
    e.currentTarget.reset();
    setLoading(true);

    try{
    const response = await fetch('api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        description,
       }),
    });

    const result = await response.json();

    setLoading(false);

    if (result.message) {
      setMessages((prev) => [...prev, { sender: 'Bot', content: result.message }]);
      scrollToBottom();
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
    setIsValid(false);
    scrollToBottom();
  }
};

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      ref={chatContentRef} 
      id="chat-content"
      className="flex flex-col space-y-4 max-h-[500px] overflow-y-auto"
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex flex-col p-6 rounded-lg ${
            msg.sender === 'Bot' ? 'bg-[#0C3257] text-white self-start' : 'bg-[#2E679E] text-white self-end'
          } max-w-lg w-fit shadow-md relative`}
        >
          <p className="font-bold mb-2">{msg.sender}:</p>
          <ReactMarkdown className="prose prose-invert">{msg.content}</ReactMarkdown>


          {msg.sender === 'Bot' && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(msg.content);
                alert('Mensaje copiado al portapapeles!');
              }}
              className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm"
              title="Copiar"
            >
              <Copy className="w-3 h-3" />
             
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

          {loading && (
          <div className="absolute inset-0">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-white" /> 
              <span className="text-sm text-white">Espera un momento....</span> 
            </div>
          </div>
          )}
        
        </div>
      </form>

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
