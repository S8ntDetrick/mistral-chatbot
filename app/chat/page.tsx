"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Temporary until backend is connected
  const userTier = "basic";

  const showSidebar = userTier === "basic" || userTier === "pro";

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    // Temporary fake assistant response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "This is where S8NT's response will appear.",
        },
      ]);
      setIsLoading(false);
    }, 1200);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex">
      {showSidebar && sidebarOpen && (
        <aside className="hidden md:flex w-[300px] bg-[#0b0b0b] border-r border-white/10 flex-col">
          <div className="p-4 border-b border-white/10">
            <button
              onClick={handleNewChat}
              className="w-full rounded-xl bg-[#E8973A] px-4 py-3 text-base font-semibold text-black hover:brightness-105 transition"
            >
              + New Chat
            </button>
          </div>

          <div className="p-4 flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-white/50">No saved chats yet.</p>
            <p className="text-xs text-white/30 mt-2">
              Your recent conversations will appear here.
            </p>
          </div>
        </aside>
      )}

      <section className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl h-[85vh] bg-[#101010] rounded-3xl shadow-2xl border border-white/10 flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              {showSidebar && (
                <button
                  onClick={() => setSidebarOpen((prev) => !prev)}
                  className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#161616] text-white hover:bg-[#1d1d1d] transition"
                >
                  ☰
                </button>
              )}

              <img
                src="/logo.png"
                alt="S8NT Logo"
                className="h-10 w-10 object-contain"
              />
              <h1 className="text-2xl font-semibold">S8NT AI</h1>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {messages.length === 0 && !isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-white/40 text-xl">
                  Let&apos;s turn the world upside down...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div
                      className={
                        message.role === "user"
                          ? "max-w-[70%] rounded-2xl bg-[#E8973A] text-black px-5 py-3 text-lg font-medium"
                          : "max-w-[75%] rounded-2xl bg-[#1b1b1b] px-5 py-4 text-lg leading-8 text-white"
                      }
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[75%] rounded-2xl bg-[#1b1b1b] px-5 py-4 text-lg text-white/70">
                      S8NT is thinking...
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-5 border-t border-white/10">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Ask something..."
                className="w-full rounded-2xl bg-[#1a1a1a] border border-white/10 px-5 py-4 text-lg text-white placeholder:text-white/40 outline-none focus:border-[#E8973A]"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-full rounded-2xl bg-[#E8973A] py-4 text-xl font-semibold text-black hover:brightness-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Thinking..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}