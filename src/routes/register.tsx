import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, Empty, Page, Pill, SearchBox, Stat, toneForStatus } from "@/components/ui";
import { useBooks } from "@/lib/portfolio";
import { kes, prettyConfig } from "@/lib/utils";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  const books = useBooks();
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return books.properties;
    return books.properties.filter((p) => `${p.name} ${p.code} ${p.branch} ${p.county} ${p.type}`.toLowerCase().includes(needle));
  }, [books.properties, q]);

  const occupied = books.units.filter((u) => u.status === "OCCUPIED").length;
  const vacant = books.units.length - occupied;

  return (
    <Page
      kicker="Estate register"
      title="Properties and units"
      lede="Every building we manage, its landlord mandate, and the unit mix behind it."
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Properties" value={String(books.properties.length)} hint="In the current branch scope" />
        <Stat label="Units" value={String(books.units.length)} hint={`${occupied} occupied · ${vacant} vacant`} />
        <Stat label="Occupancy" value={books.units.length ? `${Math.round((occupied / books.units.length) * 100)}%` : "—"} hint="Against the scoped portfolio" tone="good" />
        <Stat label="Rent roll" value={kes(books.units.reduce((s, u) => s + u.rent, 0))} hint="Nominal, all units" />
      </div>

      <div className="mt-3 max-w-md">
        <SearchBox value={q} onChange={setQ} placeholder="Search by name, code, branch…" />
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {filtered.map((p) => {
          const units = books.units.filter((u) => u.propertyId === p.id);
          const mandate = books.mandates.find((m) => m.propertyId === p.id);
          const expanded = openId === p.id;
          return (
            <Card key={p.id} className="fade-slide">
              <button
                type="button"
                onClick={() => setOpenId(expanded ? null : p.id)}
                aria-expanded={expanded}
                className="press flex w-full flex-wrap items-start justify-between gap-3 text-left"
              >
                <span>
                  <span className="block font-display text-xl">{p.name}</span>
                  <span className="block text-sm text-muted">
                    {p.code} · {p.type === "COMMERCIAL" ? "Commercial" : "Residential"} · {p.branch} · {p.county}
                  </span>
                  <span className="block text-xs text-faint">
                    Landlord: {mandate?.landlordName || "—"} · Officer: {p.officer}
                    {p.caretaker ? ` · Caretaker: ${p.caretaker}` : ""}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <Pill tone={toneForStatus(mandate?.status || "Neutral")}>{mandate?.status || "No mandate"}</Pill>
                  <Pill tone="neutral">
                    {units.filter((u) => u.status === "OCCUPIED").length}/{units.length} let
                  </Pill>
                  <span aria-hidden className="text-muted">{expanded ? "▾" : "▸"}</span>
                </span>
              </button>

              {expanded ? (
                units.length ? (
                  <div className="mt-3 overflow-x-auto rounded-xl border border-line">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-line bg-surface-2 text-left text-xs text-muted">
                          <th className="px-3 py-2 font-medium">Unit</th>
                          <th className="px-3 py-2 font-medium">Floor</th>
                          <th className="px-3 py-2 font-medium">Config</th>
                          <th className="px-3 py-2 text-right font-medium">Plinth</th>
                          <th className="px-3 py-2 text-right font-medium">Rent</th>
                          <th className="px-3 py-2 text-right font-medium">Service</th>
                          <th className="px-3 py-2 font-medium">Meter</th>
                          <th className="px-3 py-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {units.map((u) => (
                          <tr key={u.id} className="border-b border-line/60 last:border-0 transition-colors hover:bg-surface-2/60">
                            <td className="px-3 py-2 font-mono">{u.code}</td>
                            <td className="px-3 py-2">{u.floor}</td>
                            <td className="px-3 py-2">{prettyConfig(u.config)}</td>
                            <td className="px-3 py-2 text-right font-mono">{u.plinth} m²</td>
                            <td className="px-3 py-2 text-right font-mono">{kes(u.rent)}</td>
                            <td className="px-3 py-2 text-right font-mono">{kes(u.sc)}</td>
                            <td className="px-3 py-2 font-mono text-xs text-muted">{u.meter}</td>
                            <td className="px-3 py-2">
                              <Pill tone={toneForStatus(u.status)}>{u.status === "OCCUPIED" ? "Occupied" : "Vacant"}</Pill>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-muted">No units captured for this property yet.</p>
                )
              ) : null}
            </Card>
          );
        })}
        {!filtered.length ? (
          <Card>
            <Empty title="Nothing matches" body={`No property answers to “${q}” in this branch scope.`} />
          </Card>
        ) : null}
      </div>
    </Page>
  );
}
