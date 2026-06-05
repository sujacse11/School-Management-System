import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your EduSmart AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const prompts = [
    "Check students with low attendance",
    "Generate trigonometry test questions",
    "Draft sports day notification",
    "Compare 10-A and 10-B math scores",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setIsTyping(true);

    // Mock AI reply
    setTimeout(() => {
      let replyText =
        "I've analyzed that request. Let me know if you need anything else!";
      const query = text.toLowerCase();
      if (query.includes("attendance") || query.includes("low")) {
        replyText =
          "In Class 10-A, Aarohi Patel has 72% attendance (below the 75% threshold). In Class 10-B, Emma Watson has 74%. Would you like me to draft an email alert to their guardians?";
      } else if (
        query.includes("test") ||
        query.includes("trigonometry") ||
        query.includes("quiz")
      ) {
        replyText =
          "Here are 3 trigonometry questions for your quiz:\n\n1. If sin(θ) = 3/5, find cos(θ) and tan(θ).\n2. Prove that sin²(θ) + cos²(θ) = 1.\n3. Solve for x: 2cos(x) - 1 = 0 for 0° ≤ x ≤ 90°.\n\nWould you like to assign this to Class 10-A?";
      } else if (
        query.includes("sports") ||
        query.includes("announcement") ||
        query.includes("draft")
      ) {
        replyText =
          "Here is a draft announcement:\n\n*Subject: Annual Sports Day Registration Open*\n*Dear Parents and Students, our Annual Sports Day is scheduled for April 25th. Practice starts next Monday. Registration forms must be returned by next Friday.*";
      } else if (
        query.includes("compare") ||
        query.includes("scores") ||
        query.includes("math")
      ) {
        replyText =
          "Comparison:\n- *Class 10-A*: Avg score is 81.5% with Aarohi Patel leading (92%).\n- *Class 10-B*: Avg score is 78.2% with Lucas Garcia leading (88%).\n10-A is performing slightly higher in algebraic units.";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: replyText }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <button
        className="ai-assistant-toggle-btn"
        onClick={() => setIsOpen(true)}
      >
        <Bot size={18} />
        <span>AI Assistant</span>
      </button>

      <div className={`ai-panel ${isOpen ? "open" : ""}`}>
        <div className="ai-panel-header">
          <div className="ai-panel-title">
            <Sparkles size={18} />
            <span>EduSmart AI helper</span>
          </div>
          <button
            className="icon-button"
            onClick={() => setIsOpen(false)}
            style={{ color: "var(--primary)" }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="ai-messages" ref={scrollRef}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`ai-bubble ${m.sender === "ai" ? "incoming" : "outgoing"}`}
              style={{ whiteSpace: "pre-line" }}
            >
              {m.text}
            </div>
          ))}
          {isTyping && (
            <div
              className="ai-bubble incoming"
              style={{
                color: "var(--text-secondary)",
                display: "flex",
                gap: "4px",
              }}
            >
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          )}
        </div>

        <div className="ai-suggested-prompts">
          <span
            style={{
              fontSize: "10px",
              fontWeight: "700",
              color: "var(--text-light)",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Suggested Actions
          </span>
          {prompts.map((p, idx) => (
            <button
              key={idx}
              className="ai-prompt-btn"
              onClick={() => handleSend(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="ai-input-area">
          <input
            type="text"
            className="ai-input"
            placeholder="Ask AI anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          />

          <button className="ai-send-btn" onClick={() => handleSend(input)}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
};
