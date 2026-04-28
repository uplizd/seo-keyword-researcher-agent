import React from "react";

export default function Message({ msg }) {
  const isUser = msg.role === "user";
  const isError = msg.role === "error";

  const rowClass = ["msg-row", isUser && "msg-row--user"].filter(Boolean).join(" ");

  let avatarClass = "msg-avatar msg-avatar--agent";
  if (isUser) avatarClass = "msg-avatar msg-avatar--user";
  if (isError) avatarClass = "msg-avatar msg-avatar--error";

  const bubbleClass = ["msg-bubble", isError && "msg-bubble--error"]
    .filter(Boolean)
    .join(" ");

  const avatarText = isUser ? "You" : isError ? "!" : "SK";
  const label = isUser ? "You" : isError ? "Error" : "Agent";

  return (
    <div className={rowClass}>
      <div className={avatarClass} aria-hidden>
        {avatarText}
      </div>
      <div className="msg-inner">
        <span className="msg-label">{label}</span>
        <div className={bubbleClass}>{msg.text}</div>
      </div>
    </div>
  );
}
