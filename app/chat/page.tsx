"use client";

import { useEffect, useRef, useState } from "react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type SavedChat = {
  id: string;
  title: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const { user, isLoaded } = useUser();
  const router = useRouter();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isLoaded && user) {
      loadSavedChats();
    }
  }, [isLoaded, user]);

  const userTier = "basic";
  const showSidebar = userTier === "basic" || userTier === "pro";

  const loadSavedChats = async () => {
    try {
      const res = await fetch("/api/saved-chats");
      const data = await res.json();
      if (!res.ok) return;
      setSavedChats(data.chats || []);
    } catch (error) {
      console.error("Failed to load saved chats:", error);
    }
  };

  const handleSend = async () => {
    if (!isLoaded) return;
    if (!input.trim() || isLoading) return;

    if (!user) {
      router.push("/signup");
      return;
    }

    const userMessage = input.trim();

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMessage,
          conversation_id: currentChatId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.message || data.error || "Something went wrong.",
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Unable to connect to S8NT right now." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChat = async () => {
    if (messages.length === 0) {
      setSaveMessage("No chat to save yet.");
      return;
    }

    setSaveMessage("Saving...");

    try {
      const res = await fetch("/api/saved-chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentChatId,
          ...(currentChatId
            ? {}
            : { title: messages[0]?.content?.slice(0, 50) || "New Chat" }),
          messages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSaveMessage(data.error || "Could not save chat.");
        return;
      }

      setCurrentChatId(data.chat.id);
      setSaveMessage("Chat saved.");
      loadSavedChats();
    } catch {
      setSaveMessage("Unable to save chat right now.");
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setSaveMessage("");
    setCurrentChatId(null);
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

          <div className="p-4 flex-1 overflow-y-auto">
            {savedChats.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-sm text-white/50">No saved chats yet.</p>
                <p className="text-xs text-white/30 mt-2">
                  Your recent conversations will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {savedChats.map((chat) => (
                  <div key={chat.id} className="group relative">
                    <button
                      onClick={() => {
                        setMessages(chat.messages);
                        setCurrentChatId(chat.id);
                        setSaveMessage("");
                      }}
                      className="w-full rounded-xl bg-[#161616] px-4 py-3 pr-16 text-left text-sm text-white/80 hover:bg-[#1f1f1f] transition"
                    >
                      {chat.title}
                    </button>

                    <button
                      onClick={async () => {
                        const newTitle = prompt("Rename chat:", chat.title);
                        if (!newTitle) return;

                        await fetch("/api/saved-chats", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            id: chat.id,
                            title: newTitle,
                            messages: chat.messages,
                          }),
                        });

                        loadSavedChats();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/40 opacity-0 group-hover:opacity-100 transition"
                    >
                      ✎
                    </button>

                    <button
                      onClick={async () => {
                        const confirmDelete = confirm("Delete this saved chat?");
                        if (!confirmDelete) return;

                        await fetch("/api/saved-chats", {
                          method: "DELETE",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            id: chat.id,
                          }),
                        });

                        if (currentChatId === chat.id) {
                          setMessages([]);
                          setCurrentChatId(null);
                          setSaveMessage("");
                        }

                        loadSavedChats();
                      }}
                      className="absolute right-9 top-1/2 -translate-y-1/2 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition"
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            )}
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

            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveChat}
                className="rounded-xl bg-[#E8973A] px-4 py-2 text-sm font-semibold text-black hover:brightness-105 transition"
              >
                Save Chat
              </button>

              {isLoaded && user ? (
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-12 w-12",
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="Manage subscription"
                      href="/account"
                      labelIcon={<span>💳</span>}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              ) : (
                <SignInButton mode="modal">
                  <button className="rounded-xl border border-white/10 bg-[#161616] px-4 py-2 text-sm text-white hover:bg-[#1d1d1d] transition">
                    Sign in
                  </button>
                </SignInButton>
              )}
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
                      {message.role === "assistant" &&
                      message.content?.includes("Upgrade") ? (
                        <div className="flex flex-col gap-3">
                          <span>
                            {message.content.replace(/https?:\/\/[^\s]+/, "")}
                          </span>

                          <a
                            href="https://s8nt.ai/pricing"
                            target="_blank"
                            className="inline-block rounded-xl bg-[#E8973A] px-4 py-3 text-center text-black font-semibold hover:brightness-105 transition"
                          >
                            Upgrade Now
                          </a>
                        </div>
                      ) : (
                        message.content || ""
                      )}
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

                <div ref={bottomRef} />
              </div>
            )}
          </div>

          <div className="p-5 border-t border-white/10">
            {saveMessage && (
              <p className="mb-2 text-sm text-white/50">{saveMessage}</p>
            )}

            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
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