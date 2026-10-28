import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Card, Field, Page, Pill, toneForStatus } from "@/components/ui";
import { useBooks } from "@/lib/portfolio";
import { useErp } from "@/lib/store";
import type { Lead } from "@/lib/types";
import { kes, prettyConfig } from "@/lib/utils";

const STAGES: Lead["stage"][] = ["New", "Viewing", "Offer", "Won", "Lost"];

export const Route = createFileRoute("/agency")({ component: AgencyPage });

function AgencyPage() {
  const leads = useErp((s) => s.leads);
  const listings = useErp((s) => s.listings);
  const properties = useBooks().properties;
  const moveLead = useErp((s) => s.moveLead);
  const addLead = useErp((s) => s.addLead);
  const [form, setForm] = useState({ name: "", phone: "", interest: "", propertyName: properties[0]?.name || "", budget: "" });

  return (
    <Page kicker="Agency" title="Lettings pipeline" lede="Live stock from vacant units, and every enquiry from first call to a let.">
      <Card>
        <form
          className="grid gap-2 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            addLead({ name: form.name, phone: form.phone, interest: form.interest, propertyName: form.propertyName, budget: Number(form.budget) || 0 });
            setForm({ ...form, name: "", phone: "", interest: "", budget: "" });
            toast.success("Enquiry captured");
          }}
        >
          <Field label="Name"><input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
          <Field label="Phone"><input className="field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></Field>
          <Field label="Looking for"><input className="field" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} required /></Field>
          <Field label="Budget">
            <input className="field font-mono" inputMode="decimal" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
          </Field>
          <div className="sm:col-span-2">
            <Button type="submit">Add enquiry</Button>
          </div>
        </form>
      </Card>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {STAGES.map((stage) => (
          <div key={stage} className="w-64 shrink-0">
            <p className="mb-2 text-xs tracking-widest text-faint uppercase">{stage}</p>
            <div className="flex flex-col gap-2">
              {leads
                .filter((l) => l.stage === stage)
                .map((lead) => (
                  <Card key={lead.id} className="p-3">
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-xs text-muted">{lead.phone} · {lead.interest}</p>
                    <p className="mt-1 text-xs text-faint">{lead.propertyName} · {kes(lead.budget)}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {STAGES.filter((s) => s !== stage).map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="rounded-lg border border-line px-2 py-1 text-xs text-muted"
                          onClick={() => { moveLead(lead.id, s); toast.success(`Moved to ${s}`); }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>

      <Card>
        <h2 className="font-display text-xl">Listings</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {listings.map((l) => (
            <li key={l.id} className="flex items-center justify-between rounded-xl bg-surface-2 px-3 py-2">
              <div>
                <p className="text-sm">{l.unitCode} · {l.propertyName}</p>
                <p className="text-xs text-muted">{prettyConfig(l.config)} · {l.purpose}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm">{kes(l.asking)}</p>
                <Pill tone={toneForStatus(l.status)}>{l.status}</Pill>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </Page>
  );
}
