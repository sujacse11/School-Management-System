import React, { useState, useRef, useEffect } from "react";
import { Search, Send, Paperclip, Phone, Video, Info } from "lucide-react";

export const Messages = ({ chatThreads, setChatThreads }) => {
  const [activeThreadId, setActiveThreadId] = useState(
    chatThreads[0]?.id || "",
  );
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const messageEndRef = useRef(null);

  const activeThread = chatThreads.find((t) => t.id === activeThreadId);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeThread?.messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: `MSG-${Date.now()}`,
      senderId: "teacher",
      senderName: "Sarah Johnson",
      senderRole: "Math Teacher",
      content: inputText,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSelf: true,
    };

    setChatThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === activeThreadId) {
          return {
            ...thread,
            lastMessage: inputText,
            lastMessageTime: newMessage.timestamp,
            messages: [...thread.messages, newMessage],
          };
        }
        return thread;
      }),
    );

    setInputText("");

    // Trigger mock parent response
    setTimeout(() => {
      const parentReplies = [
        "Thank you for the update, Ms. Johnson! I will talk to Alice tonight.",
        "Understood. We will make sure he reviews the mathematics practice sheet.",
        "Thanks. Is there any tutoring sessions available this Friday?",
        "Okay, I will verify the report card signature and submit the document.",
        "Excellent. Appreciate your effort, Sarah!",
      ];
      const randomReply =
        parentReplies[Math.floor(Math.random() * parentReplies.length)];

      const incomingMsg = {
        id: `MSG-${Date.now() + 1}`,
        senderId: activeThreadId,
        senderName: activeThread?.name || "Parent",
        senderRole: activeThread?.role || "Parent",
        content: randomReply,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSelf: false,
      };

      setChatThreads((prev) =>
        prev.map((thread) => {
          if (thread.id === activeThreadId) {
            return {
              ...thread,
              lastMessage: randomReply,
              lastMessageTime: incomingMsg.timestamp,
              messages: [...thread.messages, incomingMsg],
            };
          }
          return thread;
        }),
      );
    }, 1500);
  };

  const [activeTab, setActiveTab] = useState("all");

  const handleThreadSelect = (id) => {
    setActiveThreadId(id);
    // Mark as read
    setChatThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unreadCount: 0 } : t)),
    );
  };

  const filteredThreads = chatThreads.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.role.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "students" && t.role.toLowerCase().includes("student")) ||
      (activeTab === "parents" && t.role.toLowerCase().includes("parent"));
    return matchesSearch && matchesTab;
  });

  return (
    <div className="messages-view">
      <div className="page-header" style={{ marginBottom: "16px" }}>
        <div className="page-title-group">
          <h1 className="page-title">Messages</h1>
          <span className="page-subtitle">
            Announcements, chat, notifications and broadcasts
          </span>
        </div>
      </div>

      <div className="chat-container">
        {/* Chat Sidebar */}
        <div className="chat-sidebar">
          <div className="chat-sidebar-search">
            <div className="filter-input-wrapper" style={{ minWidth: "100%" }}>
              <Search size={16} color="var(--text-light)" />
              <input
                type="text"
                className="filter-input"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Sub-tabs for filtering students/parents */}
          <div
            className="messages-subtabs"
            style={{
              display: "flex",
              gap: "12px",
              padding: "8px 16px",
              borderBottom: "1px solid var(--border-color)",
              marginBottom: "8px",
              backgroundColor: "#fff",
            }}
          >
            <button
              className={`messages-subtab-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
              style={{
                background: "none",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
                fontWeight: activeTab === "all" ? 700 : 500,
                color:
                  activeTab === "all"
                    ? "var(--primary)"
                    : "var(--text-secondary)",
                borderBottom:
                  activeTab === "all" ? "2px solid var(--primary)" : "none",
                fontSize: "13px",
              }}
            >
              All
            </button>
            <button
              className={`messages-subtab-btn ${activeTab === "students" ? "active" : ""}`}
              onClick={() => setActiveTab("students")}
              style={{
                background: "none",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
                fontWeight: activeTab === "students" ? 700 : 500,
                color:
                  activeTab === "students"
                    ? "var(--primary)"
                    : "var(--text-secondary)",
                borderBottom:
                  activeTab === "students"
                    ? "2px solid var(--primary)"
                    : "none",
                fontSize: "13px",
              }}
            >
              Students
            </button>
            <button
              className={`messages-subtab-btn ${activeTab === "parents" ? "active" : ""}`}
              onClick={() => setActiveTab("parents")}
              style={{
                background: "none",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
                fontWeight: activeTab === "parents" ? 700 : 500,
                color:
                  activeTab === "parents"
                    ? "var(--primary)"
                    : "var(--text-secondary)",
                borderBottom:
                  activeTab === "parents" ? "2px solid var(--primary)" : "none",
                fontSize: "13px",
              }}
            >
              Parents
            </button>
          </div>

          <div className="chat-thread-list">
            {filteredThreads.map((thread) => (
              <div
                key={thread.id}
                className={`chat-thread-item ${thread.id === activeThreadId ? "active" : ""}`}
                onClick={() => handleThreadSelect(thread.id)}
              >
                <div className="chat-thread-avatar-wrapper">
                  <img
                    src={thread.avatar}
                    alt={thread.name}
                    className="chat-thread-avatar"
                  />
                  {thread.unreadCount > 0 && (
                    <span className="chat-thread-unread-badge">
                      {thread.unreadCount}
                    </span>
                  )}
                </div>

                <div className="chat-thread-info">
                  <div className="chat-thread-header">
                    <span className="chat-thread-name">{thread.name}</span>
                    <span className="chat-thread-time">
                      {thread.lastMessageTime}
                    </span>
                  </div>
                  <span className="chat-thread-preview">
                    {thread.lastMessage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="chat-pane">
          {activeThread ? (
            <>
              <div className="chat-pane-header">
                <div className="chat-active-user">
                  <img
                    src={activeThread.avatar}
                    alt={activeThread.name}
                    className="chat-active-avatar"
                  />
                  <div>
                    <span className="chat-active-name">
                      {activeThread.name}
                    </span>
                    <span className="chat-active-role">
                      {activeThread.role}
                    </span>
                  </div>
                </div>

                <div className="chat-header-actions">
                  <button
                    className="icon-button"
                    onClick={() => alert("Mock call initiated...")}
                  >
                    <Phone size={18} />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => alert("Mock video call initiated...")}
                  >
                    <Video size={18} />
                  </button>
                  <button className="icon-button">
                    <Info size={18} />
                  </button>
                </div>
              </div>

              <div className="chat-messages-area">
                <div className="chat-date-divider">Today, 08:30 AM</div>
                {activeThread.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chat-message-bubble ${msg.isSelf ? "outgoing" : "incoming"}`}
                  >
                    <div className="chat-message-text">{msg.content}</div>
                    <span className="chat-message-time">{msg.timestamp}</span>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>

              <div className="chat-input-area">
                <button className="icon-button" style={{ flexShrink: 0 }}>
                  <Paperclip size={18} />
                </button>
                <div className="chat-input-wrapper">
                  <input
                    type="text"
                    className="chat-text-input"
                    placeholder="Type your message here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                </div>
                <button className="chat-send-btn" onClick={handleSendMessage}>
                  <Send size={16} />
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "var(--text-light)",
              }}
            >
              <p>Select a thread to begin chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
