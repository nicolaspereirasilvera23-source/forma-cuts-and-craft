/**
 * Contrato de disponibilidad/reservas. Hoy lo implementa `mockProvider` (todo en
 * memoria, sin guardar datos personales). Para producción, implementar un
 * `BookingProvider` que llame a server functions sobre PostgreSQL:
 *  - tabla `appointments(barber_id, starts_at, ...)` con
 *    UNIQUE (barber_id, starts_at) o EXCLUDE USING gist sobre tstzrange
 *  - `createBooking` hace INSERT dentro de una transacción; si choca la
 *    restricción devuelve { ok: false, reason: "taken" } → reserva atómica.
 * Regla de negocio: 1 barbero = 1 silla = 1 calendario. No se exige servicio.
 */
export type Slot = { barberId: string; time: string }; // time "HH:mm"

export type BookingRequest = {
  barberId: string;
  date: string; // "yyyy-MM-dd"
  time: string;
  name: string;
  contact: string;
  note?: string;
};

export type BookingResult =
  | { ok: true; reference: string; simulated: boolean }
  | { ok: false; reason: "taken" | "invalid" | "error" };

export interface BookingProvider {
  getSlots(date: string, barberId: string | "any"): Promise<Slot[]>;
  createBooking(req: BookingRequest): Promise<BookingResult>;
}
