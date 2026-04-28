import React, { useRef, useEffect, useState } from "react";
import Message from "./Message.jsx";
import ThinkingIndicator from "./ThinkingIndicator.jsx";
import {
  CHAT_HEADER_DESCRIPTION,
  CHAT_HEADER_TITLE,
  COMPOSER_PLACEHOLDER,
  EMPTY_STATE,
  RUN_BUTTON_BUSY,
  RUN_BUTTON_IDLE,
} from "../config/chatStrings.js";
import { chatPanelStatusLabel } from "../lib/statusLabels.js";

export default function ChatPanel({ messages, status, onSend }) {
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const handleSend = () => {
    if (!draft.trim() || status === "running") return;
    onSend(draft);
    setDraft("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setDraft(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="chat">
      <header className="chat-header">
        <div className="chat-header-title">{CHAT_HEADER_TITLE}</div>
        <p className="chat-header-desc">{CHAT_HEADER_DESCRIPTION}</p>
      </header>

      <div className="chat-messages">
        {isEmpty ? (
          <div className="chat-empty">
            <div className="chat-empty-icon" aria-hidden>
              {EMPTY_STATE.iconLetters}
            </div>
            <div className="chat-empty-title">{EMPTY_STATE.title}</div>
            <p className="chat-empty-text">{EMPTY_STATE.body}</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <Message key={msg.id} msg={msg} />
            ))}
            {status === "running" && <ThinkingIndicator />}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      <div className="chat-composer">
        <div className="chat-composer-inner">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            value={draft}
            onChange={handleInput}
            onKeyDown={handleKey}
            placeholder={COMPOSER_PLACEHOLDER}
            rows={1}
            disabled={status === "running"}
            aria-label="Message input"
          />
          <button
            type="button"
            className="chat-send"
            onClick={handleSend}
            disabled={!draft.trim() || status === "running"}
          >
            {status === "running" ? RUN_BUTTON_BUSY : RUN_BUTTON_IDLE}
          </button>
        </div>
      </div>

      <div className="chat-status" data-status={status}>
        <span className="chat-status-dot" aria-hidden />
        <span className="chat-status-text">{chatPanelStatusLabel(status)}</span>
      </div>
    </div>
  );
}
