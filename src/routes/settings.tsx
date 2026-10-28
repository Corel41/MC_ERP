import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Card, Field, Page } from "@/components/ui";
import { useErp } from "@/lib/store";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const company = useErp((s) => s.company);
  const setCompany = useErp((s) => s.setCompany);
  const officer = useErp((s) => s.officer);
  const setOfficer = useErp((s) => s.setOfficer);
  const tariff = useErp((s) => s.tariff);
  const setTariff = useErp((s) => s.setTariff);
  const theme = useErp((s) => s.theme);
  const setTheme = useErp((s) => s.setTheme);
  const audit = useErp((s) => s.audit);
  const resetDemo = useErp((s) => s.resetDemo);
  const [confirm, setConfirm] = useState(false);

  return (
    <Page kicker="Settings" title="House style" lede="The company on receipts, the water tariff, and a log of everything posted in this browser.">
      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-xl">Company</h2>
          <form
            className="mt-3 flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Profile saved on this device");
            }}
          >
            <Field label="Name"><input className="field" value={company.name} onChange={(e) => setCompany({ name: e.target.value })} /></Field>
            <Field label="Line under the name"><input className="field" value={company.slogan} onChange={(e) => setCompany({ slogan: e.target.value })} /></Field>
            <Field label="Address"><input className="field" value={company.address} onChange={(e) => setCompany({ address: e.target.value })} /></Field>
            <Field label="KRA PIN"><input className="field" value={company.pin} onChange={(e) => setCompany({ pin: e.target.value })} /></Field>
            <Field label="Paybill"><input className="field font-mono" value={company.paybill} onChange={(e) => setCompany({ paybill: e.target.value })} /></Field>
            <Field label="You are posting as"><input className="field" value={officer} onChange={(e) => setOfficer(e.target.value)} /></Field>
            <Button type="submit" variant="ghost">Saved as you type</Button>
          </form>
        </Card>
        <div className="flex flex-col gap-3">
          <Card>
            <h2 className="font-display text-xl">Appearance</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setTheme("night")} className={`rounded-2xl border p-3 text-left ${theme === "night" ? "border-primary" : "border-line"}`}>
                <span className="block h-8 rounded-lg bg-fg/90" />
                <span className="mt-2 block text-sm">Night ledger</span>
              </button>
              <button type="button" onClick={() => setTheme("day")} className={`rounded-2xl border p-3 text-left ${theme === "day" ? "border-primary" : "border-line"}`}>
                <span className="block h-8 rounded-lg bg-surface-2" />
                <span className="mt-2 block text-sm">Day ledger</span>
              </button>
            </div>
            <form
              className="mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success(`Water is KES ${tariff} per cubic metre`);
              }}
            >
              <Field label="Water tariff, KES per m³">
                <input className="field font-mono" inputMode="decimal" value={tariff} onChange={(e) => setTariff(Number(e.target.value))} />
              </Field>
            </form>
          </Card>
          <Card>
            <h2 className="font-display text-xl">Demo data</h2>
            <p className="mt-1 text-sm text-muted">Restores the six-month showcase. Your theme stays.</p>
            {confirm ? (
              <div className="mt-3 flex gap-2">
                <Button type="button" variant="danger" onClick={() => { resetDemo(); setConfirm(false); toast.success("Portfolio restored"); }}>
                  Restore showcase
                </Button>
                <Button type="button" variant="ghost" onClick={() => setConfirm(false)}>Cancel</Button>
              </div>
            ) : (
              <Button type="button" variant="ghost" className="mt-3" onClick={() => setConfirm(true)}>
                Reset portfolio
              </Button>
            )}
          </Card>
        </div>
      </div>
      <Card>
        <h2 className="font-display text-xl">Audit</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {audit.map((row) => (
            <li key={row.id} className="flex flex-col gap-0.5 border-b border-line py-2 text-sm sm:flex-row sm:items-baseline sm:justify-between">
              <span>
                <span className="font-medium">{row.action}</span>
                <span className="block text-muted sm:inline sm:pl-2">{row.detail}</span>
              </span>
              <span className="text-xs text-faint">{row.by} · {row.at.slice(0, 16).replace("T", " ")}</span>
            </li>
          ))}
        </ul>
      </Card>
    </Page>
  );
}
