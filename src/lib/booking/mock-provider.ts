import { barbers, type Barber } from "@/data/demo";
import type { BookingProvider, BookingRequest, BookingResult, Slot } from "./types";

const toMin = (t: string) => {
  const [h = 0, m = 0] = t.split(":").map(Number);
  return h * 60 + m;
};
const toTime = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Hash determinista para simular ocupación estable por barbero+fecha+hora. */
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function barberSlots(barber: Barber, date: string, taken: Set<string> = new Set()): string[] {
  const day = new Date(`${date}T12:00:00`).getDay();
  if (!barber.workDays.includes(day)) return [];
  const out: string[] = [];
  for (let m = toMin(barber.start); m + barber.slotMinutes <= toMin(barber.end); m += barber.slotMinutes) {
    const t = toTime(m);
    const key = `${barber.id}|${date}|${t}`;
    if (hash(key) % 10 < 4) continue; // ~40% ocupado (simulado)
    if (taken.has(key)) continue;
    out.push(t);
  }
  return out;
}

/** "Primera disponibilidad": todos los barberos, ordenado por hora; por hora, 1 sola opción. */
export function firstAvailable(date: string, taken: Set<string> = new Set()): Slot[] {
  const all = barbers.flatMap((b) => barberSlots(b, date, taken).map((time) => ({ barberId: b.id, time })));
  all.sort((a, b) => a.time.localeCompare(b.time));
  const seen = new Set<string>();
  return all.filter((s) => (seen.has(s.time) ? false : (seen.add(s.time), true)));
}

export function createMockProvider(): BookingProvider {
  const taken = new Set<string>(); // solo en memoria de la pestaña
  return {
    async getSlots(date, barberId) {
      if (barberId === "any") return firstAvailable(date, taken);
      const b = barbers.find((x) => x.id === barberId);
      return b ? barberSlots(b, date, taken).map((time) => ({ barberId: b.id, time })) : [];
    },
    async createBooking(req: BookingRequest): Promise<BookingResult> {
      if (!req.name.trim() || !req.contact.trim()) return { ok: false, reason: "invalid" };
      const key = `${req.barberId}|${req.date}|${req.time}`;
      if (taken.has(key)) return { ok: false, reason: "taken" };
      taken.add(key);
      return { ok: true, reference: `DEMO-${hash(key).toString(36).slice(0, 5).toUpperCase()}`, simulated: true };
    },
  };
}
