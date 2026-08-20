import { useState } from "react";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I’m Sphere AI. How can I support your mentoring journey today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("AI Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

       
          <div className="flex items-center justify-between bg-blue-900 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="text-xl">✨</span>

              <div>
                <h3 className="font-semibold">Sphere AI</h3>
                <p className="text-xs text-blue-100">
                  Your mentoring assistant
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-xl hover:bg-blue-800"
              aria-label="Close AI assistant"
            >
              ✕
            </button>
          </div>

    
          <div
            className="flex-1 space-y-4 overflow-y-auto p-4"
            style={{
              background:
                "linear-gradient(to bottom right, #fdf2f8, #eff6ff)",
            }}
          >
            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${
                    item.role === "user"
                      ? "rounded-br-md bg-blue-900 text-white"
                      : "rounded-bl-md border border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {item.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500">
                  Thinking...
                </div>
              </div>
            )}
          </div>

        
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 bg-white p-4"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Sphere AI..."
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                disabled={!message.trim() || loading}
                className="rounded-xl bg-blue-900 px-4 py-3 text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                ➤
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-900 text-xl text-white shadow-lg transition hover:bg-blue-800"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </>
  );
}