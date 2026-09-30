import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

function App() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const typeAssistantResponse = async (
    messageId: number,
    fullResponse: string,
  ) => {
    setTyping(true);

    let currentText = "";

    for (const character of fullResponse) {
      currentText += character;

      setMessages((previousMessages) =>
        previousMessages.map((message) =>
          message.id === messageId
            ? {
                ...message,
                content: currentText,
              }
            : message,
        ),
      );

      await new Promise((resolve) => setTimeout(resolve, 15));
    }

    setTyping(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || loading || typing) {
      return;
    }

    const currentPrompt = prompt.trim();

    setError("");
    setPrompt("");

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: currentPrompt,
    };

    setMessages((previousMessages) => [...previousMessages, userMessage]);

    setLoading(true);

    try {
      const result = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: currentPrompt,
        }),
      });

      if (!result.ok) {
        throw new Error("Failed to generate AI response");
      }

      const data = await result.json();

      const assistantMessageId = Date.now() + 1;

      const assistantMessage: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);

      setLoading(false);

      await typeAssistantResponse(assistantMessageId, data.response);
    } catch (error) {
      console.error(error);

      setLoading(false);
      setTyping(false);

      setError("Sorry, something went wrong. Please try again.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleGenerate();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl shadow-lg">
              ✦
            </div>

            <div>
              <h1 className="text-lg font-semibold">AI Study Assistant</h1>

              <p className="text-xs text-slate-400">Powered by Gemini</p>
            </div>
          </div>

          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:bg-slate-800 hover:text-white"
            >
              Clear chat
            </button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-5xl flex-col px-4">
        {/* Empty state */}
        {messages.length === 0 && !loading && (
          <div className="flex flex-1 flex-col items-center justify-center py-16">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-4xl shadow-inner">
              ✨
            </div>

            <h2 className="text-center text-3xl font-bold tracking-tight">
              How can I help you today?
            </h2>

            <p className="mt-3 max-w-lg text-center text-slate-400">
              Ask me anything about React, TypeScript, JavaScript, Node.js, or
              any other topic.
            </p>

            <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
              {[
                "Explain React Query in simple terms",
                "What is TypeScript and why use it?",
                "Explain async and await in JavaScript",
                "How does REST API work?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setPrompt(suggestion)}
                  className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-left text-sm text-slate-300 transition hover:border-blue-500/50 hover:bg-slate-800 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat messages */}
        {messages.length > 0 && (
          <div className="flex-1 space-y-6 overflow-y-auto py-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* AI avatar */}
                {message.role === "assistant" && (
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-sm shadow-lg">
                    ✦
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm ${
                    message.role === "user"
                      ? "rounded-br-md bg-blue-600 text-white"
                      : "rounded-bl-md border border-slate-800 bg-slate-900 text-slate-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>

                  {/* Typing cursor */}
                  {message.role === "assistant" &&
                    typing &&
                    message.content && (
                      <span className="ml-1 inline-block h-4 w-1 animate-pulse rounded bg-blue-400" />
                    )}
                </div>

                {/* User avatar */}
                {message.role === "user" && (
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-sm">
                    You
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                  ✦
                </div>

                <div className="rounded-2xl rounded-bl-md border border-slate-800 bg-slate-900 px-5 py-4">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />

                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: "150ms" }}
                    />

                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-3 rounded-xl border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Input area */}
        <div className="sticky bottom-0 pb-5 pt-3">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-2xl shadow-black/20">
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message your AI assistant..."
              rows={3}
              disabled={loading || typing}
              className="w-full resize-none bg-transparent px-2 py-1 text-sm text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed"
            />

            <div className="mt-2 flex items-center justify-between border-t border-slate-800 pt-2">
              <span className="px-2 text-xs text-slate-500">
                Press Enter to send · Shift + Enter for new line
              </span>

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || loading || typing}
                className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Thinking..." : typing ? "Writing..." : "Send"}
              </button>
            </div>
          </div>

          <p className="mt-2 text-center text-xs text-slate-600">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
