/**
 * Sidebar copy + integrations list (matches the SEO Keyword Researcher flow on UPLIZD).
 */

export const BRAND = Object.freeze({
  logoLetters: "SK",
  title: "SEO Keyword Researcher Agent",
  poweredBy: "Powered by UPLIZD",
});

/** @type {{ label: string, color: string }[]} */
export const SIDEBAR_TOOLS = Object.freeze([
  { label: "Google Search Console (Composio)", color: "#458CF5" },
  { label: "Google Sheets (Composio)", color: "#0F9D58" },
  { label: "Tavily Search", color: "#6366F1" },
  { label: "Ahrefs", color: "#FF5900" },
]);

/** @type {readonly string[]} */
export const QUICK_PROMPTS = Object.freeze([
  "Map bottom-funnel keywords for /pricing vs /demo using GSC queries + Ahrefs difficulty — output a cluster table in Sheets-friendly rows",
  "Pull last 28 days GSC impressions/clicks for our blog prefix; Tavily-scan competitor headlines for gap topics",
  "Ahrefs: export overlapping keywords with domain X; rank by intent and suggest 5 new supporting articles",
  "Sync this week’s keyword backlog to Sheets: columns for keyword, volume, intent, page target, GSC position",
]);

export const SIDEBAR_SECTION_TOOLS = "Flow tools";
export const SIDEBAR_SECTION_PROMPTS = "Quick prompts";
