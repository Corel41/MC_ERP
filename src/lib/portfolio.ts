import { useMemo } from "react";
import { useErp, type DataState } from "@/lib/store";

export function useBooks() {
  const state = useErp();
  return useMemo(() => scopeBooks(state), [state]);
}

export function scopeBooks(s: DataState) {
  const properties = s.properties.filter((p) => s.branch === "all" || p.branch === s.branch);
  const ids = new Set(properties.map((p) => p.id));
  return {
    ...s,
    properties,
    units: s.units.filter((u) => ids.has(u.propertyId)),
    tenants: s.tenants.filter((t) => ids.has(t.propertyId)),
    leases: s.leases.filter((l) => ids.has(l.propertyId)),
    invoices: s.invoices.filter((i) => ids.has(i.propertyId)),
    receipts: s.receipts.filter((r) => ids.has(r.propertyId)),
    tickets: s.tickets.filter((t) => ids.has(t.propertyId)),
    mandates: s.mandates.filter((m) => ids.has(m.propertyId)),
    deductions: s.deductions.filter((d) => ids.has(d.propertyId)),
    otherIncome: s.otherIncome.filter((d) => ids.has(d.propertyId)),
    payouts: s.payouts.filter((d) => ids.has(d.propertyId)),
    deposits: s.deposits.filter((d) => ids.has(d.propertyId)),
    statements: s.statements.filter((d) => ids.has(d.propertyId)),
  };
}
