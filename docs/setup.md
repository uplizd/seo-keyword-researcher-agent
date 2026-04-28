# Setup guide

## Step 1 — Install the flow

1. **[SEO Keyword Researcher Agent on Marketplace](https://uplizd.ai/marketplace/seo-keyword-researcher-agent)**
2. **Install** → open in workspace.
3. Copy **Flow ID** from URL.
4. **Settings → API Keys** — UPLIZD key.
5. Align nodes with template:
   - **Read File** (local storage) + **Text Input** (rules) → **Prompt Template** (`agent` / `rules`)
   - **Chat Input** → Agent
   - **OpenAI**: gpt-4o-mini, temperature 0.50
   - **Google Search Console** & **Google Sheets** (Composio, OAuth2)
   - **Tavily** (API key)
   - **Ahrefs** (API key / auth per node)
6. **Chat Output** ← Agent response

## Step 2 — `.env`

```bash
cp .env.example .env
```

```bash
UPLIZD_API_KEY=your_actual_api_key
UPLIZD_FLOW_ID=your_actual_flow_id
```

## Step 3 — Run

```bash
npm run install:all
npm run dev
```

## Step 4 — Health

```bash
curl http://localhost:3001/health
```

## Step 5 — App

**http://localhost:5173**

---

Production: `cd web && npm run build` → deploy `web/dist/`; deploy `server/` with env vars. Never expose `UPLIZD_API_KEY` in static frontends.
