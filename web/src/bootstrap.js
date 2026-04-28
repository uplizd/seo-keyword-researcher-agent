/**
 * Marks the document with the UI bundle id for debugging / future analytics hooks.
 */

const APP_SHELL_ID = "seo-keyword-researcher-agent";

export function getAppShellId() {
  return APP_SHELL_ID;
}

/** @returns {HTMLElement | null} */
export function getMountRoot() {
  return document.getElementById("root");
}

if (typeof document !== "undefined") {
  document.documentElement.dataset.uplizdUiShell = APP_SHELL_ID;
}
