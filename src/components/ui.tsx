import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
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

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("rounded-2xl border border-line bg-surface p-4", className)}>{children}</section>;
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
    <div className="rounded-2xl border border-line bg-surface px-4 py-3">
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
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        tone === "good" && "bg-good/15 text-good",
        tone === "bad" && "bg-bad/15 text-bad",
        tone === "warn" && "bg-warn/15 text-warn",
        tone === "info" && "bg-primary/15 text-primary",
        tone === "neutral" && "bg-surface-2 text-muted",
      )}
    >
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
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors disabled:opacity-50",
        variant === "primary" && "bg-primary text-ink hover:opacity-90",
        variant === "ghost" && "border border-line bg-surface text-fg hover:bg-surface-2",
        variant === "danger" && "bg-bad/15 text-bad hover:bg-bad/25",
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
    <div className="rounded-2xl border border-dashed border-line px-4 py-10 text-center">
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
    <div className="flex gap-1 overflow-x-auto rounded-xl bg-surface-2 p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={cn(
            "shrink-0 rounded-lg px-3 py-2 text-sm",
            value === o.id ? "bg-surface text-fg" : "text-muted",
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
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-fg/40">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close panel" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-line bg-raised p-4"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl text-fg">{title}</h2>
          <Button type="button" variant="ghost" onClick={onClose} className="px-3">
            Close
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
    <input
      className="field"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      aria-label={placeholder}
    />
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
        "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-ink",
        className,
      )}
    >
      {children}
    </Link>
  );
}
