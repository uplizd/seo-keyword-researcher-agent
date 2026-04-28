/**
 * uplizd.js — thin client for the local proxy server.
 * The proxy at /api/run handles auth and forwards to UPLIZD.
 */

/**
 * @param {string} message
 * @param {string} sessionId
 * @returns {Promise<{ text: string|null, raw: object }>}
 */
export async function runFlow(message, sessionId) {
  const res = await fetch("/api/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json(); // { text, raw }
}
