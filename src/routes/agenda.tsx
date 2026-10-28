import { createFileRoute, Link } from "@tanstack/react-router";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DemoNotice } from "@/components/site/DemoNotice";
import { barbers } from "@/data/demo";
import { createMockProvider } from "@/lib/booking/mock-provider";
import type { BookingResult, Slot } from "@/lib/booking/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda — Reservá tu turno | FORMA. Barber Studio" },
      { name: "description", content: "Elegí barbero o primera disponibilidad, fecha y hora. Agenda de demostración con disponibilidad simulada." },
      { property: "og:title", content: "Agenda — FORMA. Barber Studio" },
      { property: "og:description", content: "Elegí tu barbero, día y hora. Demo con disponibilidad simulada." },
    ],
  }),
  component: Agenda,
});

const steps = ["Barbero", "Día", "Hora", "Tus datos"] as const;

function Agenda() {
  const provider = useMemo(() => createMockProvider(), []);
  const [step, setStep] = useState(0);
  const [barberId, setBarberId] = useState<string | "any" | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const [result, setResult] = useState<BookingResult | null>(null);
  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
    const today = new Date();
    setDays(Array.from({ length: 14 }, (_, i) => addDays(today, i + 1)));
  }, []);

  useEffect(() => {
    if (!date || !barberId) return;
    setSlots(null);
    provider.getSlots(date, barberId).then(setSlots);
  }, [date, barberId, provider]);

  const barberName = (id?: string | null) => barbers.find((b) => b.id === id)?.name;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (name.trim().length < 2) errs.name = "Ingresá tu nombre.";
    if (contact.trim().length < 6) errs.contact = "Ingresá un celular o email para contactarte.";
    setErrors(errs);
    if (Object.keys(errs).length || !slot || !date) return;
    const r = await provider.createBooking({ barberId: slot.barberId, date, time: slot.time, name, contact });
    setResult(r);
    if (!r.ok && r.reason === "taken") {
      setSlot(null);
      setStep(2);
      provider.getSlots(date, barberId!).then(setSlots);
    }
  }

  function reset() {
    setStep(0); setBarberId(null); setDate(null); setSlot(null); setName(""); setContact(""); setResult(null);
  }

  if (result?.ok && slot && date) {
    return (
      <div className="bg-olive pt-16 text-ivory md:pt-20">
        <div className="mx-auto max-w-3xl px-5 py-20 md:py-32" role="status" aria-live="polite">
          <span className="label-tech text-beige">Simulación · {result.reference}</span>
          <h1 className="mt-4 text-[clamp(3rem,9vw,7rem)] leading-[0.9]">Así quedaría tu turno.</h1>
          <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 border-y border-ivory/25 py-6 text-lg">
            <dt className="text-ivory/60">Barbero</dt><dd>{barberName(slot.barberId)}</dd>
            <dt className="text-ivory/60">Día</dt><dd className="first-letter:uppercase">{format(new Date(`${date}T12:00`), "EEEE d 'de' MMMM", { locale: es })}</dd>
            <dt className="text-ivory/60">Hora</dt><dd className="font-mono">{slot.time}</dd>
          </dl>
          <p className="mt-8 max-w-lg text-ivory/80">
            Esto es una demostración: <strong>no se registró ninguna reserva</strong> y tus datos no se enviaron ni
            guardaron. Con la agenda conectada, acá llegaría la confirmación real.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="hero" size="lg" onClick={reset}>Probar otra reserva</Button>
            <Button asChild variant="heroOutline" size="lg"><Link to="/">Volver al inicio</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory pt-16 md:pt-20">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 md:px-10 md:py-20 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="text-[clamp(3rem,8vw,6rem)] leading-[0.9]">Reservá tu turno</h1>
          <DemoNotice className="mt-6 max-w-2xl">
            Agenda de demostración: la disponibilidad es simulada y la confirmación no genera una reserva real.
          </DemoNotice>

          <ol className="mt-10 grid grid-cols-4 gap-2" aria-label="Pasos">
            {steps.map((s, i) => (
              <li key={s}>
                <button
                  type="button"
                  disabled={i > step}
                  onClick={() => setStep(i)}
                  aria-current={i === step ? "step" : undefined}
                  className={cn("w-full border-t-2 pt-2 text-left text-xs sm:text-sm", i <= step ? "border-olive text-graphite" : "border-border text-muted-foreground")}
                >
                  <span className="font-mono">{i + 1}</span> <span className="hidden sm:inline">{s}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            {step === 0 && (
              <fieldset>
                <legend className="font-display text-4xl">¿Con quién?</legend>
                <p className="mt-2 text-sm text-muted-foreground">Cada barbero tiene su silla y su propia agenda.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[{ id: "any", name: "Primera disponibilidad", sub: "El primer lugar libre, con cualquiera" }, ...barbers.map((b) => ({ id: b.id, name: b.name, sub: `Silla ${b.chair} · ${b.specialty}` }))].map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={barberId === o.id}
                      onClick={() => { setBarberId(o.id); setSlot(null); setStep(1); }}
                      className={cn("flex min-h-20 items-center justify-between border px-5 py-4 text-left transition-colors", barberId === o.id ? "border-olive bg-olive text-ivory" : "border-graphite/20 hover:border-graphite", o.id === "any" && barberId !== o.id && "bg-beige/60")}
                    >
                      <span>
                        <span className="block font-display text-3xl">{o.name}</span>
                        <span className="text-sm opacity-75">{o.sub}</span>
                      </span>
                      {barberId === o.id && <Check className="size-5" />}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend className="font-display text-4xl">¿Qué día?</legend>
                <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-7">
                  {days.map((d) => {
                    const iso = format(d, "yyyy-MM-dd");
                    const b = barbers.find((x) => x.id === barberId);
                    const off = b ? !b.workDays.includes(d.getDay()) : d.getDay() === 0;
                    return (
                      <button
                        key={iso}
                        type="button"
                        disabled={off}
                        aria-pressed={date === iso}
                        aria-label={`${format(d, "EEEE d 'de' MMMM", { locale: es })}${off ? ", sin atención" : ""}`}
                        onClick={() => { setDate(iso); setSlot(null); setStep(2); }}
                        className={cn("flex h-20 flex-col items-center justify-center border text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-35", date === iso ? "border-olive bg-olive text-ivory" : "border-graphite/20 hover:border-graphite")}
                      >
                        <span className="text-xs capitalize opacity-70">{format(d, "EEE", { locale: es })}</span>
                        <span className="font-display text-3xl leading-none">{format(d, "d")}</span>
                        <span className="text-[10px] uppercase opacity-60">{format(d, "MMM", { locale: es })}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend className="font-display text-4xl">¿A qué hora?</legend>
                {result && !result.ok && result.reason === "taken" && (
                  <p role="alert" className="mt-4 text-sm text-destructive">Ese horario se acaba de ocupar. Elegí otro.</p>
                )}
                {slots === null ? (
                  <p className="mt-6 text-muted-foreground" aria-live="polite">Buscando horarios…</p>
                ) : slots.length === 0 ? (
                  <div className="mt-6 border border-dashed border-graphite/30 p-8 text-center">
                    <p>No hay horarios libres ese día.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setStep(1)}>Elegir otro día</Button>
                  </div>
                ) : (
                  <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                    {slots.map((s) => {
                      const on = slot?.time === s.time && slot.barberId === s.barberId;
                      return (
                        <button
                          key={`${s.barberId}-${s.time}`}
                          type="button"
                          aria-pressed={on}
                          onClick={() => { setSlot(s); setStep(3); }}
                          className={cn("flex h-14 flex-col items-center justify-center border transition-colors", on ? "border-olive bg-olive text-ivory" : "border-graphite/20 hover:border-graphite")}
                        >
                          <span className="font-mono">{s.time}</span>
                          {barberId === "any" && <span className="text-[11px] opacity-70">{barberName(s.barberId)}</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </fieldset>
            )}

            {step === 3 && (
              <form onSubmit={submit} noValidate className="max-w-md">
                <h2 className="text-4xl">Tus datos</h2>
                <div className="mt-6 space-y-5">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} className="mt-2 h-12 rounded-sm bg-card" />
                    {errors.name && <p id="name-err" className="mt-1 text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="contact">Celular o email</Label>
                    <Input id="contact" autoComplete="tel" value={contact} onChange={(e) => setContact(e.target.value)} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "contact-err" : "contact-help"} className="mt-2 h-12 rounded-sm bg-card" />
                    {errors.contact ? <p id="contact-err" className="mt-1 text-sm text-destructive">{errors.contact}</p> : <p id="contact-help" className="mt-1 text-xs text-muted-foreground">En la demo no se guarda ni se envía.</p>}
                  </div>
                </div>
                <Button type="submit" size="xl" className="mt-8 w-full uppercase tracking-[0.14em] text-xs">Confirmar (simulación)</Button>
              </form>
            )}
          </div>
        </div>

        <aside aria-label="Resumen" className="h-fit bg-beige p-6 lg:sticky lg:top-28">
          <h2 className="text-3xl">Resumen</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <Row k="Barbero" v={barberId === "any" ? (slot ? `${barberName(slot.barberId)} (primera disp.)` : "Primera disponibilidad") : barberName(barberId)} />
            <Row k="Día" v={date ? format(new Date(`${date}T12:00`), "EEE d MMM", { locale: es }) : undefined} />
            <Row k="Hora" v={slot?.time} />
            <Row k="Servicio" v="Lo definís en la silla" />
          </dl>
          {step > 0 && <button onClick={reset} className="mt-6 text-sm underline underline-offset-4">Empezar de nuevo</button>}
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v?: string | undefined }) {
  return (
    <div className="flex justify-between gap-4 border-b border-graphite/15 pb-2">
      <dt className="text-graphite/60">{k}</dt>
      <dd className="text-right first-letter:uppercase">{v ?? "—"}</dd>
    </div>
  );
}
