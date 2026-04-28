/**
 * Maps chat transport state to footer copy (shared across these UPLIZD playground UIs).
 */

const LABELS = {
  idle: "Ready",
  running: "Flow running on UPLIZD…",
  error: "Error — check console",
};

/**
 * @param {"idle" | "running" | "error"} status
 */
export function chatPanelStatusLabel(status) {
  return LABELS[status] ?? LABELS.idle;
}
