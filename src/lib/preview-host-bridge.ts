/**
 * Post-message bridge between the app and an embedding preview host
 * (e.g. a sandboxed iframe viewer). In production this relays theme and
 * navigation hints to the parent window; standalone it is a no-op.
 */
export function installPreviewHostBridge(): () => void {
  if (typeof window === "undefined" || window.parent === window) return () => {};

  const onMessage = (event: MessageEvent) => {
    const data = event.data as { type?: string; theme?: string } | null;
    if (!data || typeof data !== "object") return;
    if (data.type === "mc-erp:set-theme" && (data.theme === "day" || data.theme === "night")) {
      document.documentElement.dataset.theme = data.theme === "day" ? "day" : "";
      if (data.theme !== "day") delete document.documentElement.dataset.theme;
    }
  };

  window.addEventListener("message", onMessage);
  try {
    window.parent.postMessage({ type: "mc-erp:ready" }, "*");
  } catch {
    /* sandboxed hosts may refuse; harmless */
  }
  return () => window.removeEventListener("message", onMessage);
}
