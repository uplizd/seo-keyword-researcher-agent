import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import ChatPanel from "./components/ChatPanel.jsx";
import { useChat } from "./hooks/useChat.js";

export default function App() {
  const { messages, status, send, reset } = useChat();

  return (
    <div className="app-shell">
      <Sidebar onQuickPrompt={send} onReset={reset} />
      <ChatPanel messages={messages} status={status} onSend={send} />
    </div>
  );
}
