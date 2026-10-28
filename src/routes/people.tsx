import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Card, Page, Pill, Tabs, toneForStatus } from "@/components/ui";
import { useErp } from "@/lib/store";
import { kes } from "@/lib/utils";

export const Route = createFileRoute("/people")({ component: PeoplePage });

function PeoplePage() {
  const staff = useErp((s) => s.staff);
  const fleet = useErp((s) => s.fleet);
  const assets = useErp((s) => s.assets);
  const requestLeave = useErp((s) => s.requestLeave);
  const toggleVehicle = useErp((s) => s.toggleVehicle);
  const [tab, setTab] = useState("people");
  const [days, setDays] = useState<Record<string, string>>({});

  return (
    <Page kicker="Administration" title="People, fleet, assets" lede="Who is in, which car is out, and what the office actually owns.">
      <Tabs
        value={tab}
        onChange={setTab}
        options={[
          { id: "people", label: "People" },
          { id: "fleet", label: "Fleet" },
          { id: "assets", label: "Assets" },
        ]}
      />
      {tab === "people" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {staff.map((person) => (
            <Card key={person.id}>
              <p className="text-xs text-muted">{person.branch}</p>
              <h2 className="font-display text-xl">{person.name}</h2>
              <p className="text-sm text-muted">{person.role}</p>
              <p className="mt-2 text-sm">{person.leaveDays} leave days left</p>
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const n = Number(days[person.id] || 0);
                  if (!n || n > person.leaveDays) {
                    toast.error("Not enough leave days");
                    return;
                  }
                  requestLeave(person.id, n);
                  setDays({ ...days, [person.id]: "" });
                  toast.success("Leave booked");
                }}
              >
                <input className="field" inputMode="numeric" placeholder="Days" value={days[person.id] || ""} onChange={(e) => setDays({ ...days, [person.id]: e.target.value })} aria-label={`Leave days for ${person.name}`} />
                <Button type="submit" variant="ghost">Book</Button>
              </form>
            </Card>
          ))}
        </div>
      ) : null}
      {tab === "fleet" ? (
        <div className="grid gap-3">
          {fleet.map((v) => (
            <Card key={v.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono">{v.plate}</p>
                  <h2 className="font-display text-xl">{v.name}</h2>
                  <p className="text-sm text-muted">{v.driver} · {v.odometer.toLocaleString("en-KE")} km</p>
                </div>
                <Pill tone={toneForStatus(v.status)}>{v.status}</Pill>
              </div>
              <Button type="button" variant="ghost" className="mt-3" onClick={() => toggleVehicle(v.id)}>
                {v.status === "Out" ? "Check in" : "Check out"}
              </Button>
            </Card>
          ))}
        </div>
      ) : null}
      {tab === "assets" ? (
        <div className="grid gap-2">
          {assets.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3">
              <div>
                <p className="font-mono text-xs text-muted">{a.tag}</p>
                <p>{a.name}</p>
                <p className="text-xs text-muted">{a.holder} · {a.branch}</p>
              </div>
              <p className="font-mono text-sm">{kes(a.cost)}</p>
            </div>
          ))}
        </div>
      ) : null}
    </Page>
  );
}
