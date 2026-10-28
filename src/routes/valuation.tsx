import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Card, Field, Page, Pill, toneForStatus } from "@/components/ui";
import { useErp } from "@/lib/store";
import { kes } from "@/lib/utils";

export const Route = createFileRoute("/valuation")({ component: ValuationPage });

function ValuationPage() {
  const appraisals = useErp((s) => s.appraisals);
  const advanceAppraisal = useErp((s) => s.advanceAppraisal);
  const addAppraisal = useErp((s) => s.addAppraisal);
  const [client, setClient] = useState("");
  const [asset, setAsset] = useState("");
  const [purpose, setPurpose] = useState("Mortgage");
  const [fee, setFee] = useState(35000);

  return (
    <Page kicker="Valuation" title="Instructions and certificates" lede="Track each instruction from the bank letter to the signed report.">
      <div className="grid gap-3 lg:grid-cols-[1fr_20rem]">
        <div className="flex flex-col gap-3">
          {appraisals.map((a) => (
            <Card key={a.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl">{a.client}</h2>
                  <p className="text-sm text-muted">{a.asset}</p>
                  <p className="mt-1 text-xs text-faint">{a.purpose} · {a.valuer} · {a.instructedOn}</p>
                </div>
                <Pill tone={toneForStatus(a.status)}>{a.status}</Pill>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="font-mono text-sm">{kes(a.fee)}</p>
                {a.status !== "Certified" ? (
                  <Button type="button" variant="ghost" onClick={() => { advanceAppraisal(a.id); toast.success("Moved forward"); }}>
                    Advance
                  </Button>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
        <Card>
          <h2 className="font-display text-xl">New instruction</h2>
          <form
            className="mt-3 flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              addAppraisal({ client, asset, purpose, fee });
              setClient("");
              setAsset("");
              toast.success("Instructed");
            }}
          >
            <Field label="Client"><input className="field" value={client} onChange={(e) => setClient(e.target.value)} required /></Field>
            <Field label="Asset"><input className="field" value={asset} onChange={(e) => setAsset(e.target.value)} required /></Field>
            <Field label="Purpose"><input className="field" value={purpose} onChange={(e) => setPurpose(e.target.value)} /></Field>
            <Field label="Fee"><input className="field font-mono" inputMode="decimal" value={fee} onChange={(e) => setFee(Number(e.target.value))} /></Field>
            <Button type="submit">Instruct</Button>
          </form>
        </Card>
      </div>
    </Page>
  );
}
