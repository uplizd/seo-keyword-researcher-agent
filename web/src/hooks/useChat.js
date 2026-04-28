import { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { runFlow } from "../lib/uplizd";

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: `Hi! I'm your SEO Keyword Researcher Agent.\n\nUse me to surface high-intent keywords, cluster topics, pull GSC performance, enrich with Ahrefs, search with Tavily, and log plans to Google Sheets.\n\nThe flow uses gpt-4o-mini (temperature 0.50), a prompt built from file content + execution rules, and tools: Google Search Console, Google Sheets, Tavily, and Ahrefs. Configure OpenAI, Composio (GSC + Sheets + Tavily), and your Ahrefs API access in the UPLIZD editor.`,
      ts: Date.now(),
    },
  ]);
  const [status, setStatus] = useState("idle"); // idle | running | error
  const sessionId = useRef(uuidv4());

  const send = useCallback(async (text) => {
    if (!text.trim() || status === "running") return;

    const userMsg = { id: uuidv4(), role: "user", text: text.trim(), ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setStatus("running");

    try {
      const { text: reply } = await runFlow(text.trim(), sessionId.current);
      const assistantMsg = {
        id: uuidv4(),
        role: "assistant",
        text: reply || "Flow completed — no text output returned.",
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setStatus("idle");
    } catch (err) {
      const errMsg = {
        id: uuidv4(),
        role: "error",
        text: `Error: ${err.message}`,
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, errMsg]);
      setStatus("error");
    }
  }, [status]);

  const reset = useCallback(() => {
    sessionId.current = uuidv4();
    setMessages([]);
    setStatus("idle");
  }, []);

  return { messages, status, send, reset, sessionId: sessionId.current };
}
