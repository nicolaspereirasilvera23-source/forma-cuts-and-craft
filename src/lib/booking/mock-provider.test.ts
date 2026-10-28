import { describe, expect, it } from "vitest";
import { barbers } from "@/data/demo";
import { barberSlots, createMockProvider, firstAvailable } from "./mock-provider";

// 2026-11-02 es lunes
describe("agenda demo", () => {
  it("un barbero que no trabaja ese día no tiene turnos", () => {
    const mateo = barbers.find((b) => b.id === "mateo")!; // no trabaja lunes
    expect(barberSlots(mateo, "2026-11-02")).toEqual([]);
  });

  it("primera disponibilidad no repite la misma hora", () => {
    const slots = firstAvailable("2026-11-04");
    const times = slots.map((s) => s.time);
    expect(new Set(times).size).toBe(times.length);
  });

  it("no se puede reservar dos veces el mismo turno del mismo barbero", async () => {
    const p = createMockProvider();
    const req = { barberId: "bruno", date: "2026-11-04", time: "09:00", name: "A", contact: "x" };
    expect((await p.createBooking(req)).ok).toBe(true);
    expect(await p.createBooking(req)).toEqual({ ok: false, reason: "taken" });
  });

  it("reservar no exige elegir servicio", async () => {
    const p = createMockProvider();
    const r = await p.createBooking({ barberId: "santi", date: "2026-11-05", time: "12:00", name: "B", contact: "y" });
    expect(r.ok).toBe(true);
  });
});
