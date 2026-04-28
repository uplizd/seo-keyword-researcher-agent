const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

const {
  UPLIZD_API_KEY,
  UPLIZD_FLOW_ID,
  UPLIZD_BASE_URL = "https://studio.uplizd.ai",
  FLOW_INPUT_TYPE = "chat",
  FLOW_OUTPUT_TYPE = "chat",
  PORT = 3001,
} = process.env;

if (!UPLIZD_API_KEY) {
  console.error("❌  UPLIZD_API_KEY is not set. Copy .env.example → .env");
  process.exit(1);
}

// ─── Health check ────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ ok: true, flowId: UPLIZD_FLOW_ID });
});

// ─── Run flow ────────────────────────────────────────────────────
app.post("/api/run", async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message is required" });
  }

  const flowUrl = `${UPLIZD_BASE_URL}/api/v1/run/${UPLIZD_FLOW_ID}`;
  const payload = {
    input_value: message.trim(),
    input_type: FLOW_INPUT_TYPE,
    output_type: FLOW_OUTPUT_TYPE,
    session_id: sessionId || uuidv4(),
  };

  try {
    const upstream = await fetch(flowUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": UPLIZD_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const raw = await upstream.text();

    if (!upstream.ok) {
      console.error(`UPLIZD error ${upstream.status}:`, raw.slice(0, 300));
      return res.status(upstream.status).json({
        error: `Upstream error ${upstream.status}`,
        detail: raw.slice(0, 300),
      });
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return res.status(502).json({ error: "Invalid JSON from upstream", raw: raw.slice(0, 500) });
    }

    // Extract text from Langflow response structure
    const text = extractText(data);
    return res.json({ text, raw: data });
  } catch (err) {
    console.error("Proxy fetch error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

// ─── Helpers ─────────────────────────────────────────────────────
function extractText(data) {
  try {
    for (const out of data?.outputs ?? []) {
      for (const o of out?.outputs ?? []) {
        const t =
          o?.results?.message?.text ||
          o?.results?.message?.data?.text ||
          o?.artifacts?.message;
        if (t) return t;
      }
    }
  } catch { /* fall through */ }
  return null;
}

app.listen(PORT, () => {
  console.log(`✅  Proxy server running on http://localhost:${PORT}`);
  console.log(`   Flow: ${UPLIZD_BASE_URL}/api/v1/run/${UPLIZD_FLOW_ID}`);
});
