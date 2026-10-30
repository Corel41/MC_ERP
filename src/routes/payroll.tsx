import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Banknote, Printer, Send, Sparkles } from "lucide-react";
import { Button, Card, Page, Pill, Stat, Tabs, toneForStatus } from "@/components/ui";
import { useErp } from "@/lib/store";
import { kes, monthName } from "@/lib/utils";
import type { PaySlip } from "@/lib/types";

export const Route = createFileRoute("/payroll")({ component: PayrollPage });

const MONTHS = [10, 9, 8, 7, 6, 5]; // prototype months of the showcase period
const YEAR = 2026;

function PayrollPage() {
  const staff = useErp((s) => s.staff);
  const runs = useErp((s) => s.payrollRuns);
  const generatePayrollDraft = useErp((s) => s.generatePayrollDraft);
  const postPayrollRun = useErp((s) => s.postPayrollRun);
  const payStaffViaMpesa = useErp((s) => s.payStaffViaMpesa);
  const recalculatePayrollDraft = useErp((s) => s.recalculatePayrollDraft);

  const [tab, setTab] = useState("current");
  const [month, setMonth] = useState(10);
  const [openSlip, setOpenSlip] = useState<PaySlip | null>(null);

  const current = useMemo(() => runs.find((r) => r.month === month && r.year === YEAR), [runs, month]);
  const posted = runs.filter((r) => r.status === "Posted");
  const ytd = posted.reduce(
    (a, r) => ({ gross: a.gross + r.totals.gross, net: a.net + r.totals.net, paye: a.paye + r.totals.paye }),
    { gross: 0, net: 0, paye: 0 },
  );

  return (
    <Page
      kicker="Administration"
      title="Payroll & statutory"
      lede="Kenyan PAYE, SHIF, NSSF and Housing Levy computed per payslip; posting books statutory liabilities to expenses."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Headcount" value={String(staff.length)} hint="Active employees" />
        <Stat label="Monthly gross" value={kes(staff.reduce((a, e) => a + e.basicSalary * 1.25, 0))} hint="Basic + allowances est." />
        <Stat label="YTD net paid" value={kes(ytd.net)} hint={`${posted.length} posted runs`} />
        <Stat label="YTD PAYE" value={kes(ytd.paye)} hint="Payable to KRA monthly" />
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        options={[
          { id: "current", label: "Run" },
          { id: "history", label: "History" },
          { id: "staff", label: "Staff file" },
        ]}
      />

      {tab === "current" ? (
        <Card>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-end gap-3">
              <label className="text-sm text-muted">
                <span className="mb-1 block">Month</span>
                <select className="field" value={month} onChange={(e) => setMonth(Number(e.target.value))} aria-label="Payroll month">
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{monthName(m)}</option>
                  ))}
                </select>
              </label>
              {current ? <Pill tone={toneForStatus(current.status)}>{current.status}</Pill> : <Pill tone="neutral">Not generated</Pill>}
            </div>
            {!current ? (
              <Button onClick={() => generatePayrollDraft(month, YEAR)}>
                <Sparkles size={14} /> Generate draft
              </Button>
            ) : (
              <div className="flex gap-2">
                {current.status === "Draft" ? (
                  <>
                    <Button variant="ghost" onClick={() => payStaffViaMpesa(current.id)}>
                      <Send size={14} /> M-Pesa batch
                    </Button>
                    <Button variant="ghost" onClick={() => recalculatePayrollDraft(current.id)}>
                      <Sparkles size={14} /> Recalculate
                    </Button>
                    <Button onClick={() => { postPayrollRun(current.id); toast.success("Payroll posted — statutory booked to expenses"); }}>
                      <Banknote size={14} /> Post to ledger
                    </Button>
                  </>
                ) : (
                  <p className="text-xs text-muted">Posted {current.postedAt?.slice(0, 10)} · ref {current.paymentRef}</p>
                )}
              </div>
            )}
          </div>

          {current ? (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                    <th className="py-2 pr-3 font-medium">Staff</th>
                    <th className="py-2 pr-3 font-medium">Branch</th>
                    <th className="py-2 pr-3 text-right font-medium">Gross</th>
                    <th className="py-2 pr-3 text-right font-medium">PAYE</th>
                    <th className="py-2 pr-3 text-right font-medium">NSSF+SHIF+HALP</th>
                    <th className="py-2 pr-3 text-right font-medium">Net</th>
                    <th className="py-2 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {current.slips.map((sl) => {
                    const social = sl.deductions.filter((d) => !d.label.startsWith("PAYE") && !d.label.startsWith("Staff loan")).reduce((a, d) => a + d.amount, 0);
                    return (
                      <tr key={sl.employeeId} className="lift border-b border-line/60">
                        <td className="py-2 pr-3">
                          <p className="font-medium">{sl.name}</p>
                          <p className="text-xs text-muted">{sl.role} · via {sl.method}</p>
                        </td>
                        <td className="py-2 pr-3 text-muted">{sl.branch}</td>
                        <td className="tnum py-2 pr-3 text-right">{kes(sl.gross)}</td>
                        <td className="tnum py-2 pr-3 text-right">{kes(sl.paye)}</td>
                        <td className="tnum py-2 pr-3 text-right">{kes(social)}</td>
                        <td className="tnum py-2 pr-3 text-right font-semibold">{kes(sl.net)}</td>
                        <td className="py-2 text-right">
                          <Button size="sm" variant="ghost" onClick={() => setOpenSlip(sl)}>Payslip</Button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={2} className="pt-2 font-semibold">Totals</td>
                    <td className="tnum pt-2 text-right font-semibold">{kes(current.totals.gross)}</td>
                    <td className="tnum pt-2 text-right font-semibold">{kes(current.totals.paye)}</td>
                    <td className="tnum pt-2 text-right font-semibold">{kes(current.totals.nssf + current.totals.nhif + current.totals.halp)}</td>
                    <td className="tnum pt-2 text-right font-bold">{kes(current.totals.net)}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">
              Draft generation applies the statutory engine: PAYE bands after personal relief, NSSF Tier I+II at 6%,
              SHIF at 2.75% (floor 300), Housing Levy 1.5%. Posting creates expense lines for KRA/NSSF/SHA/NHC so the
              Finance module shows the liabilities.
            </p>
          )}
        </Card>
      ) : null}

      {tab === "history" ? (
        <div className="grid gap-3">
          {posted.length === 0 ? <p className="text-sm text-muted">No posted runs yet.</p> : null}
          {posted.map((r) => (
            <Card key={r.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-display text-xl">{monthName(r.month)} {r.year}</h2>
                  <p className="text-sm text-muted">{r.number} · {r.slips.length} staff · prepared by {r.preparedBy}</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="tnum">{kes(r.totals.gross)} gross</span>
                  <span className="tnum font-semibold">{kes(r.totals.net)} net</span>
                  <Pill tone={toneForStatus(r.status)}>{r.status}</Pill>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      {tab === "staff" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {staff.map((e) => (
            <Card key={e.id}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-display text-lg">{e.name}</h2>
                  <p className="text-sm text-muted">{e.role} · {e.branch}</p>
                </div>
                <Pill tone={e.mpesaPaybill ? "info" : "neutral"}>{e.mpesaPaybill ? "M-Pesa" : "Bank"}</Pill>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <dt className="text-muted">Basic salary</dt><dd className="tnum text-right">{kes(e.basicSalary)}</dd>
                <dt className="text-muted">KRA PIN</dt><dd className="font-mono text-right">{e.payePin}</dd>
                <dt className="text-muted">NSSF no.</dt><dd className="font-mono text-right">{e.nssfNo}</dd>
                <dt className="text-muted">SHIF no.</dt><dd className="font-mono text-right">{e.shifNo}</dd>
                <dt className="text-muted">Onboarded</dt><dd className="text-right">{e.startedOn}</dd>
                <dt className="text-muted">Leave balance</dt><dd className="tnum text-right">{e.leaveDays} days</dd>
              </dl>
            </Card>
          ))}
        </div>
      ) : null}

      {openSlip ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm overlay-in" role="dialog" aria-modal="true" onClick={() => setOpenSlip(null)}>
          <div className="fade-slide w-full max-w-md rounded-xl border border-line bg-bg p-5 shadow-xl" onClick={(ev) => ev.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl">{openSlip.name}</h3>
                <p className="text-xs text-muted">{openSlip.role} · {openSlip.branch}</p>
              </div>
              <Button size="sm" variant="ghost" aria-label="Print payslip" onClick={() => window.print()}><Printer size={14} /></Button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Earnings</p>
                {openSlip.earnings.map((l) => (
                  <p key={l.label} className="flex justify-between"><span className="text-muted">{l.label}</span><span className="tnum">{kes(l.amount)}</span></p>
                ))}
                <p className="mt-1 flex justify-between font-semibold"><span>Gross</span><span className="tnum">{kes(openSlip.gross)}</span></p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Deductions</p>
                {openSlip.deductions.map((l) => (
                  <p key={l.label} className="flex justify-between"><span className="text-muted">{l.label}</span><span className="tnum">{kes(l.amount)}</span></p>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <p className="text-sm text-muted">Taxable pay: <span className="tnum text-fg">{kes(openSlip.taxablePay)}</span></p>
              <p className="font-display text-2xl">{kes(openSlip.net)}</p>
            </div>
            <p className="mt-1 text-right text-xs text-muted">net pay · via {openSlip.method}</p>
            <Button className="mt-4 w-full" variant="ghost" onClick={() => setOpenSlip(null)}>Close</Button>
          </div>
        </div>
      ) : null}
    </Page>
  );
}
