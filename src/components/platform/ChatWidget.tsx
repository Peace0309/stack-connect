import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Send,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Role = "user" | "assistant";

interface ChatEntry {
  role: Role;
  content: string;
}

interface ChatResponse {
  reply: string;
  source?: string;
}

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:8000/api";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatEntry[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the StatConnect assistant. Ask me about assessments, skill gaps, courses, learning paths, progress, or the MCQ generator.",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();

    if (!text || loading) {
      return;
    }

    const previousHistory = messages.slice(-10);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/chatbot/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            history: previousHistory,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          `Chatbot request failed: HTTP ${res.status}`
        );
      }

      const data: ChatResponse = await res.json();

      if (!data.reply) {
        throw new Error("Empty chatbot reply");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the chatbot server. Please check whether the backend is running on port 8000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="flex h-[28rem] w-80 flex-col overflow-hidden rounded-xl border bg-card shadow-xl">
          <div className="flex items-center justify-between border-b bg-primary px-4 py-3 text-primary-foreground">
            <p className="text-sm font-semibold">
              StatConnect Assistant
            </p>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-3 py-3"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "user"
                    ? "ml-auto max-w-[85%] rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                    : "mr-auto max-w-[85%] rounded-lg bg-muted px-3 py-2 text-sm text-foreground"
                }
              >
                {message.content}
              </div>
            ))}

            {loading ? (
              <div className="mr-auto text-xs text-muted-foreground">
                Typing…
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2 border-t p-2">
            <input
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask about assessments, courses…"
              disabled={loading}
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

            <Button
              size="icon"
              onClick={() => void sendMessage()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}