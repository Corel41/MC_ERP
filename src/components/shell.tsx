import { Link, useRouterState } from "@tanstack/react-router";
import {
  Banknote,
  Building2,
  CalendarClock,
  IdCard,
  Landmark,
  LayoutDashboard,
  Megaphone,
  Menu,
  Moon,
  PieChart,
  Scale,
  Search,
  Settings,
  Sun,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { Drawer } from "@/components/ui";
import { useErp } from "@/lib/store";
import { BRANCHES, cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Board", icon: LayoutDashboard, mobile: true },
  { to: "/desk", label: "Desk", icon: Wallet, mobile: true },
  { to: "/tenants", label: "Tenants", icon: Users, mobile: true },
  { to: "/landlords", label: "Landlords", icon: Landmark, mobile: true },
  { to: "/register", label: "Register", icon: Building2, mobile: false },
  { to: "/repairs", label: "Repairs", icon: Wrench, mobile: false },
  { to: "/agency", label: "Agency", icon: Megaphone, mobile: false },
  { to: "/valuation", label: "Valuation", icon: Scale, mobile: false },
  { to: "/people", label: "Administration", icon: IdCard, mobile: false },
  { to: "/payroll", label: "Payroll", icon: Banknote, mobile: false },
  { to: "/finance", label: "Finance", icon: PieChart, mobile: false },
  { to: "/ops", label: "Workplace", icon: CalendarClock, mobile: false },
  { to: "/settings", label: "Settings", icon: Settings, mobile: false },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const theme = useErp((s) => s.theme);
  const setTheme = useErp((s) => s.setTheme);
  const branch = useErp((s) => s.branch);
  const setBranch = useErp((s) => s.setBranch);
  const company = useErp((s) => s.company);
  const [more, setMore] = useState(false);
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    void Promise.resolve(useErp.persist.rehydrate());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme === "day" ? "day" : "night";
    // Keep the browser chrome (status bar / theme-color) in sync with the app theme.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "day" ? "#eef2f4" : "#0e1214");
  }, [theme]);

  useEffect(() => {
    setMore(false);
    setPalette(false);
  }, [path]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="no-print sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-bg/90 px-3 backdrop-blur lg:px-5">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <img src="/brand/mc-logo.jpg" alt="" className="h-9 w-9 rounded-lg bg-paper object-contain" />
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-none text-fg">{company.name.replace(" Ltd", "")}</span>
            <span className="block text-xs text-muted">Property desk</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <label className="sr-only" htmlFor="branch">
            Branch
          </label>
          <select
            id="branch"
            className="field h-10 w-36 text-sm lg:w-52"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="all">All branches</option>
            {BRANCHES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="press inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            onClick={() => setPalette(true)}
            aria-label="Open search"
            title="Search (Ctrl/⌘ K)"
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded-md border border-line bg-bg px-1.5 py-0.5 font-mono text-[10px] text-faint lg:inline">
              ⌘K
            </kbd>
          </button>
          <button
            type="button"
            className="press inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            onClick={() => setTheme(theme === "day" ? "night" : "day")}
            aria-label={theme === "day" ? "Switch to night theme" : "Switch to day theme"}
            title={theme === "day" ? "Night mode" : "Day mode"}
          >
            {theme === "day" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="no-print sticky top-14 hidden h-[calc(100dvh-3.5rem)] flex-col gap-1 overflow-y-auto border-r border-line p-3 lg:flex">
          <p className="px-2 pt-1 pb-2 text-xs tracking-widest text-faint uppercase">Estate</p>
          {NAV.slice(0, 6).map((item) => (
            <NavLink key={item.to} {...item} active={path === item.to} />
          ))}
          <p className="px-2 pt-4 pb-2 text-xs tracking-widest text-faint uppercase">House</p>
          {NAV.slice(6).map((item) => (
            <NavLink key={item.to} {...item} active={path === item.to} />
          ))}
        </aside>
        <main className="min-w-0 px-4 pt-4 pb-24 lg:px-8 lg:pt-6 lg:pb-10">{children}</main>
      </div>

      <nav className="no-print fixed inset-x-0 bottom-0 z-30 grid h-16 grid-cols-5 border-t border-line bg-bg/95 backdrop-blur lg:hidden">
        {NAV.filter((n) => n.mobile).map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "relative flex flex-col items-center justify-center gap-0.5 text-xs",
              path === item.to ? "text-primary" : "text-muted",
            )}
          >
            {path === item.to ? (
              <span aria-hidden className="absolute top-0 h-0.5 w-8 rounded-full bg-primary" />
            ) : null}
            <item.icon className="size-5" />
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          className="flex flex-col items-center justify-center gap-0.5 text-xs text-muted"
          onClick={() => setMore(true)}
        >
          <Menu className="size-5" />
          More
        </button>
      </nav>

      <Drawer open={more} title="All modules" onClose={() => setMore(false)}>
        <div className="grid gap-2">
          {NAV.filter((n) => !n.mobile).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex h-12 items-center gap-3 rounded-xl border border-line px-3 text-sm"
            >
              <item.icon className="size-4 text-primary" />
              {item.label}
            </Link>
          ))}
        </div>
      </Drawer>

      {palette ? <Palette onClose={() => setPalette(false)} /> : null}
      <Toaster position="top-center" theme={theme === "day" ? "light" : "dark"} />
    </div>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof Users;
  active: boolean;
  mobile?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex h-10 items-center gap-2 rounded-xl px-2 text-sm",
        active ? "bg-primary/15 text-fg" : "text-muted hover:bg-surface",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

function Palette({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tenants = useErp((s) => s.tenants);
  const properties = useErp((s) => s.properties);
  const units = useErp((s) => s.units);
  const query = q.trim().toLowerCase();

  const pages = NAV.filter((n) => !query || n.label.toLowerCase().includes(query));
  const people = useMemo(() => {
    if (query.length < 1) return tenants.slice(0, 6);
    return tenants.filter((t) => `${t.name} ${t.code} ${t.unitCode} ${t.phone}`.toLowerCase().includes(query)).slice(0, 8);
  }, [query, tenants]);
  const places = useMemo(() => {
    if (!query) return [];
    return [
      ...properties.filter((p) => p.name.toLowerCase().includes(query)).map((p) => ({ id: p.id, label: p.name, hint: p.branch })),
      ...units.filter((u) => u.code.toLowerCase().includes(query)).map((u) => ({ id: u.id, label: u.code, hint: u.propertyName })),
    ].slice(0, 6);
  }, [query, properties, units]);

  const total = Math.min(pages.length, 6) + people.length + places.length;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    // Move focus between the input and result links, wrapping at the ends.
    const links = Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    const all: HTMLElement[] = links.length ? [inputRef.current as HTMLElement, ...links].filter(Boolean) : [];
    if (!all.length) return;
    const current = all.indexOf(document.activeElement as HTMLElement);
    const next = e.key === "ArrowDown" ? (current + 1) % all.length : (current - 1 + all.length) % all.length;
    all[next]?.focus();
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const links = Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
      const idx = links.indexOf(document.activeElement as HTMLAnchorElement);
      if (idx <= 0) inputRef.current?.focus();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="overlay-in fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-16 backdrop-blur-sm">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close search" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="palette-in relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-raised shadow-2xl"
      >
        <input
          ref={inputRef}
          onKeyDown={onInputKey}
          className="field rounded-none border-0 bg-transparent"
          placeholder="Jump to a tenant, unit, or module"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search the books"
        />
        <div ref={listRef} onKeyDown={onListKey} className="max-h-96 overflow-y-auto border-t border-line p-2">
          {pages.slice(0, 6).map((p) => (
            <Link key={p.to} to={p.to} className="flex h-11 items-center gap-2 rounded-lg px-2 text-sm transition-colors hover:bg-surface focus-visible:bg-surface">
              <p.icon className="size-4 shrink-0 text-primary" />
              {p.label}
            </Link>
          ))}
          {people.map((t) => (
            <Link
              key={t.id}
              to="/desk"
              search={{ tenant: t.id }}
              className="flex h-11 items-center justify-between gap-3 rounded-lg px-2 text-sm transition-colors hover:bg-surface focus-visible:bg-surface"
            >
              <span className="min-w-0 truncate">{t.name}</span>
              <span className="shrink-0 font-mono text-xs text-muted">{t.unitCode}</span>
            </Link>
          ))}
          {places.map((p) => (
            <Link key={p.id} to="/register" className="flex h-11 items-center justify-between gap-3 rounded-lg px-2 text-sm transition-colors hover:bg-surface focus-visible:bg-surface">
              <span className="min-w-0 truncate">{p.label}</span>
              <span className="shrink-0 text-xs text-muted">{p.hint}</span>
            </Link>
          ))}
          {!total ? <p className="px-2 py-6 text-center text-sm text-muted">Nothing matches.</p> : null}
        </div>
        <div className="flex items-center justify-between border-t border-line bg-surface/50 px-3 py-2 text-[11px] text-faint">
          <span className="hidden sm:inline">↑↓ navigate · ↵ open · esc close</span>
          <span>{total} result{total === 1 ? "" : "s"}</span>
        </div>
      </div>
    </div>
  );
}
