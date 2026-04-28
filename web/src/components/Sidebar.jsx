import React from "react";
import {
  BRAND,
  QUICK_PROMPTS,
  SIDEBAR_SECTION_PROMPTS,
  SIDEBAR_SECTION_TOOLS,
  SIDEBAR_TOOLS,
} from "../config/uiConfig.js";
import SeoKeywordResearcherFlowHint from "./SeoKeywordResearcherFlowHint.jsx";

export default function Sidebar({ onQuickPrompt, onReset }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo" aria-hidden>
          {BRAND.logoLetters}
        </div>
        <h1 className="sidebar-title">{BRAND.title}</h1>
        <p className="sidebar-sub">{BRAND.poweredBy}</p>
      </div>

      <section className="sidebar-section">
        <div className="sidebar-section-label">{SIDEBAR_SECTION_TOOLS}</div>
        <SeoKeywordResearcherFlowHint />
        <div className="sidebar-tools">
          {SIDEBAR_TOOLS.map((t) => (
            <div key={t.label} className="sidebar-tool">
              <span
                className="sidebar-tool-dot"
                style={{ background: t.color }}
                aria-hidden
              />
              {t.label}
            </div>
          ))}
        </div>
      </section>

      <section className="sidebar-section">
        <div className="sidebar-section-label">{SIDEBAR_SECTION_PROMPTS}</div>
        <div className="sidebar-chips">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              className="sidebar-chip"
              onClick={() => onQuickPrompt(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      <div className="sidebar-spacer" />

      <button type="button" className="sidebar-reset" onClick={onReset}>
        New session
      </button>
    </aside>
  );
}
