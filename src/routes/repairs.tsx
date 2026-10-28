import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button, Card, Drawer, Field, Page, Pill, SearchBox, toneForStatus } from "@/components/ui";
import { useBooks } from "@/lib/portfolio";
import { useErp } from "@/lib/store";
import type { Ticket } from "@/lib/types";
import { kes } from "@/lib/utils";

export const Route = createFileRoute("/repairs")({ component: RepairsPage });

function RepairsPage() {
  const books = useBooks();
  const tickets = books.tickets;
  const openTicket = useErp((s) => s.openTicket);
  const advanceTicket = useErp((s) => s.advanceTicket);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    propertyId: books.properties[0]?.id || "",
    unitCode: "",
    title: "",
    detail: "",
    urgency: "Normal" as Ticket["urgency"],
    reporter: "Caretaker",
    allocation: "Landlord" as Ticket["allocation"],
    estimate: "",
    vendor: "",
  });

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return tickets;
    return tickets.filter((t) => `${t.number} ${t.title} ${t.propertyName} ${t.unitCode} ${t.vendor}`.toLowerCase().includes(n));
  }, [q, tickets]);

  return (
    <Page
      kicker="Repairs"
      title="Work orders"
      lede="Log the fault, quote it, approve the spend, and close it against landlord, tenant, or the service pool."
      actions={<Button type="button" onClick={() => setOpen(true)}>Log fault</Button>}
    >
      <SearchBox value={q} onChange={setQ} placeholder="Search tickets" />
      <div className="grid gap-3">
        {filtered.map((t) => (
          <Card key={t.id}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-mono text-xs text-muted">{t.number}</p>
                <h2 className="font-display text-xl">{t.title}</h2>
                <p className="text-sm text-muted">{t.propertyName} · {t.unitCode}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                <Pill tone={toneForStatus(t.status)}>{t.status}</Pill>
                <Pill tone={t.urgency === "Urgent" ? "bad" : "neutral"}>{t.urgency}</Pill>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted">{t.detail}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-faint">{t.allocation} · {kes(t.actual || t.estimate)} · {t.vendor || "No vendor"}</p>
              {t.status !== "Done" ? (
                <Button type="button" variant="ghost" onClick={() => { advanceTicket(t.id); toast.success("Ticket advanced"); }}>
                  Advance
                </Button>
              ) : null}
            </div>
          </Card>
        ))}
      </div>

      <Drawer open={open} title="Log a fault" onClose={() => setOpen(false)}>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const property = books.properties.find((p) => p.id === form.propertyId);
            if (!property) return;
            openTicket({
              propertyId: property.id,
              propertyName: property.name,
              unitCode: form.unitCode || "Common",
              title: form.title,
              detail: form.detail,
              urgency: form.urgency,
              reporter: form.reporter,
              allocation: form.allocation,
              estimate: Number(form.estimate) || 0,
              vendor: form.vendor,
            });
            toast.success("Fault logged");
            setOpen(false);
          }}
        >
          <Field label="Property">
            <select className="field" value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })}>
              {books.properties.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Unit or common"><input className="field" value={form.unitCode} onChange={(e) => setForm({ ...form, unitCode: e.target.value })} placeholder="SPA-04 or Common" /></Field>
          <Field label="What failed"><input className="field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></Field>
          <Field label="Detail"><textarea className="field" rows={3} value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} /></Field>
          <Field label="Who pays">
            <select className="field" value={form.allocation} onChange={(e) => setForm({ ...form, allocation: e.target.value as Ticket["allocation"] })}>
              <option>Landlord</option>
              <option>Tenant</option>
              <option>Service pool</option>
            </select>
          </Field>
          <Field label="Urgency">
            <select className="field" value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value as Ticket["urgency"] })}>
              <option>Low</option>
              <option>Normal</option>
              <option>Urgent</option>
            </select>
          </Field>
          <Field label="Estimate"><input className="field font-mono" inputMode="decimal" value={form.estimate} onChange={(e) => setForm({ ...form, estimate: e.target.value })} /></Field>
          <Field label="Vendor"><input className="field" value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} placeholder="Nairobi Plumbing & Pipe Techs" /></Field>
          <Button type="submit">Save fault</Button>
        </form>
      </Drawer>
    </Page>
  );
}
