"use client";

import { useState, useRef, useEffect, FC } from "react";
import { Sidebar } from "@/components/chat/sidebar/Sidebar";
import { TopNav } from "@/components/chat/top-nav/TopNav";
import { UserMessage } from "@/components/chat/messages/UserMessage";
import { AIMessage } from "@/components/chat/messages/AIMessage";
import { TypingIndicator } from "@/components/chat/messages/TypingIndicator";
import { InputArea } from "@/components/chat/input/InputArea";
import { INITIAL_MESSAGES } from "@/components/chat/constant";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time?: string;
}

const NexusAIChat: FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (text.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: text,
        time: `Sent ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
      },
    ]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/data', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      setIsTyping(false);

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");
      
      const decoder = new TextDecoder("utf-8");
      
      const aiMessageId = Date.now() + 1;
      let aiContent = "";

      setMessages((prev) => [
        ...prev,
        {
          id: aiMessageId,
          role: "assistant",
          content: "",
        },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        aiContent += chunk;

        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === aiMessageId ? { ...msg, content: aiContent } : msg
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
        },
      ]);
    }
  };

  return (
    <div className="dark bg-[#020617] text-slate-200 min-h-screen" style={{ fontFamily: "Manrope, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(185,199,224,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(185,199,224,0.4); }
      `}</style>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <TopNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="md:pl-64 pt-16 h-screen flex flex-col overflow-hidden transition-all duration-300">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 mt-[-10vh]">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white text-center">
              What can I help you with?
            </h1>
            <div className="w-full max-w-[800px]">
              <InputArea onSend={handleSend} isTyping={isTyping} />
            </div>
          </div>
        ) : (
          <>
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-6 md:px-12 py-12"
            >
              <div className="max-w-[800px] mx-auto space-y-12">
                {messages.map((msg) =>
                  msg.role === "user" ? (
                    <UserMessage key={msg.id} content={msg.content} time={msg.time} />
                  ) : (
                    <AIMessage key={msg.id} content={msg.content} />
                  )
                )}
                {isTyping && <TypingIndicator />}
              </div>
            </div>

            <InputArea onSend={handleSend} isTyping={isTyping} />
          </>
        )}
      </main>
    </div>
  );
}

export default NexusAIChat;
