import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Card, Field, Page, SearchBox } from "@/components/ui";
import { useErp } from "@/lib/store";

export const Route = createFileRoute("/ops")({ component: OpsPage });

function OpsPage() {
  const bookings = useErp((s) => s.bookings);
  const documents = useErp((s) => s.documents);
  const addBooking = useErp((s) => s.addBooking);
  const [q, setQ] = useState("");
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [room, setRoom] = useState("Boardroom — Mirage");
  const docs = documents.filter((d) => `${d.title} ${d.kind} ${d.ref} ${d.location}`.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <Page kicker="Workplace" title="Rooms and the archive" lede="Book the boardroom, then find the deed without opening the strongroom.">
      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-xl">Diary</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {bookings.map((b) => (
              <li key={b.id} className="rounded-xl bg-surface-2 px-3 py-2">
                <p className="text-sm">{b.title}</p>
                <p className="text-xs text-muted">{b.when} · {b.room} · {b.host}</p>
              </li>
            ))}
          </ul>
          <form
            className="mt-4 flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              addBooking({ room, title, when });
              setTitle("");
              setWhen("");
              toast.success("Booked");
            }}
          >
            <Field label="Room">
              <select className="field" value={room} onChange={(e) => setRoom(e.target.value)}>
                <option>Boardroom — Mirage</option>
                <option>Client lounge</option>
                <option>Thika meeting room</option>
              </select>
            </Field>
            <Field label="What"><input className="field" value={title} onChange={(e) => setTitle(e.target.value)} required /></Field>
            <Field label="When"><input className="field" value={when} onChange={(e) => setWhen(e.target.value)} placeholder="Mon 2 Nov · 09:00" required /></Field>
            <Button type="submit">Book</Button>
          </form>
        </Card>
        <Card>
          <h2 className="font-display text-xl">Archive</h2>
          <div className="mt-3">
            <SearchBox value={q} onChange={setQ} placeholder="Search documents" />
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {docs.map((d) => (
              <li key={d.id} className="rounded-xl border border-line px-3 py-2">
                <p className="text-sm">{d.title}</p>
                <p className="text-xs text-muted">{d.kind} · {d.ref} · {d.location}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
}
