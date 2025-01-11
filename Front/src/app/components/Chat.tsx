'use client';
import { useChat } from 'ai/react';
import Markdown from "react-markdown";

export const Chat = () => {
  const {messages, input, handleInputChange, handleSubmit} = useChat();
  console.log(messages);
    return (
    <>
        {/* <p>{JSON.stringify(messages)}</p> */}
        {messages?.map((message) =>(
            <div key={message.id}>
                {message.role === 'user' ? "Usuario: ":"AI: "}
              <Markdown>{message.content}</Markdown>
            </div>
        ))}      
        <main className='relative flex flex-col justify-center items-center min-h-screen bg-[#1a1a1a] w-full'> 
        <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="prompt" 
        value={input} 
        onChange={handleInputChange} 
        />
        <button type="submit">Submit</button>
        </form>
        </main> 
    </>
  )
}


