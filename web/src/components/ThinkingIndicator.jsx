import React from "react";

export default function ThinkingIndicator() {
  return (
    <div className="think-row">
      <div className="think-avatar" aria-hidden>
        SK
      </div>
      <div className="think-bubble" aria-label="Agent is thinking">
        <span className="think-dot" />
        <span className="think-dot" />
        <span className="think-dot" />
      </div>
    </div>
  );
}
