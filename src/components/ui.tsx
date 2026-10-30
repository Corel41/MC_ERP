import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Page({
  kicker,
  title,
  lede,
  actions,
  children,
}: {
  kicker: string;
  title: string;
  lede?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-widest text-primary uppercase">{kicker}</p>
          <h1 className="font-display text-3xl leading-tight text-fg sm:text-4xl">{title}</h1>
          {lede ? <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{lede}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </header>
      {children}
    </div>
  );
}

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-line bg-surface p-4 shadow-sm day:shadow-none",
        interactive && "lift hover:border-primary/40 hover:shadow-md",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "good" | "bad" | "warn";
}) {
  return (
    <div className="lift rounded-2xl border border-line bg-surface px-4 py-3 hover:border-primary/30">
      <p className="text-xs text-muted">{label}</p>
      <p
        className={cn(
          "mt-1 font-mono text-lg tracking-tight sm:text-xl",
          tone === "good" && "text-good",
          tone === "bad" && "text-bad",
          tone === "warn" && "text-warn",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-faint">{hint}</p> : null}
    </div>
  );
}

export function Pill({
  tone = "neutral",
  children,
}: {
  tone?: "good" | "bad" | "warn" | "neutral" | "info";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        tone === "good" && "bg-good/15 text-good ring-good/25",
        tone === "bad" && "bg-bad/15 text-bad ring-bad/25",
        tone === "warn" && "bg-warn/15 text-warn ring-warn/25",
        tone === "info" && "bg-primary/15 text-primary ring-primary/25",
        tone === "neutral" && "bg-surface-2 text-muted ring-line",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          tone === "good" && "bg-good",
          tone === "bad" && "bg-bad",
          tone === "warn" && "bg-warn",
          tone === "info" && "bg-primary",
          tone === "neutral" && "bg-faint",
        )}
      />
      {children}
    </span>
  );
}

export function toneForStatus(status: string): "good" | "bad" | "warn" | "neutral" | "info" {
  const s = status.toLowerCase();
  if (["paid", "active", "occupied", "done", "certified", "won", "live", "in yard", "approved"].includes(s)) return "good";
  if (["unpaid", "urgent", "lost", "vacant"].includes(s)) return "bad";
  if (["partial", "open", "quoted", "draft", "pending", "viewing", "offer", "out", "inspected"].includes(s)) return "warn";
  if (["instructed", "new"].includes(s)) return "info";
  return "neutral";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md";
}) {
  return (
    <button
      {...props}
      className={cn(
        "press inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        size === "md" ? "h-11 px-4 text-sm" : "h-9 px-3 text-sm",
        variant === "primary" &&
          "bg-primary text-ink shadow-sm hover:brightness-110 active:brightness-95",
        variant === "ghost" && "border border-line bg-surface text-fg hover:bg-surface-2",
        variant === "danger" && "bg-bad/15 text-bad ring-1 ring-inset ring-bad/25 hover:bg-bad/25",
        className,
      )}
    />
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-sm text-muted">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div className="fade-slide rounded-2xl border border-dashed border-line bg-surface/40 px-4 py-10 text-center">
      <p className="font-display text-xl text-fg">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted">{body}</p>
    </div>
  );
}

export function Tabs({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (id: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
        <div className="flex gap-1 overflow-x-auto rounded-xl bg-surface-2 p-1" role="tablist">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              role="tab"
              aria-selected={value === o.id}
              onClick={() => onChange(o.id)}
              className={cn(
                "press shrink-0 rounded-lg px-3 py-2 text-sm transition-colors",
                value === o.id ? "bg-surface font-medium text-fg shadow-sm" : "text-muted hover:text-fg",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
  );
}

export function Drawer({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Move focus into the dialog for keyboard users.
    panelRef.current?.focus();
    // Lock background scroll while the drawer is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="overlay-in fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close panel" onClick={onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="drawer-in relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-line bg-raised p-4 shadow-2xl outline-none"
      >
        <div className="sticky top-0 -mx-4 mb-4 flex items-center justify-between gap-3 bg-raised px-4 pb-2 pt-1">
          <h2 className="font-display text-2xl text-fg">{title}</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Close panel"
            onClick={onClose}
            className="rounded-full px-2.5"
          >
            ✕
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-faint"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        className="field ps-9"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
      />
    </div>
  );
}

export function TextLink({
  to,
  search,
  children,
  className,
}: {
  to: string;
  search?: Record<string, string>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      search={search}
      className={cn(
        "press inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-ink shadow-sm transition-[filter] hover:brightness-110 active:brightness-95",
        className,
      )}
    >
      {children}
    </Link>
  );
}
