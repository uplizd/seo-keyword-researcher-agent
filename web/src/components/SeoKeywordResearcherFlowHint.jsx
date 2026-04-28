import React from "react";

/**
 * Mirrors the Langflow canvas: Read File + Text Input → Prompt Template `{agent}` / `{rules}`, OpenAI gpt-4o-mini (temp 0.5), plus Composio toolkits.
 */
export default function SeoKeywordResearcherFlowHint() {
  return (
    <p className="sidebar-hint">
      Model: <strong>gpt-4o-mini</strong> (temperature <strong>0.50</strong>).{" "}
      <strong>Read File</strong> (local storage) + <strong>Text Input</strong> (execution rules, e.g.
      bottom-funnel priority) feed the <strong>Prompt Template</strong> using <code>agent</code> +{" "}
      <code>rules</code>. Tools: <strong>GSC</strong> &amp; <strong>Sheets</strong> via Composio (OAuth2),{" "}
      <strong>Tavily</strong> (API key), <strong>Ahrefs</strong> (API key / configured auth). Set OpenAI,
      Composio, and Ahrefs keys in the flow.
    </p>
  );
}
