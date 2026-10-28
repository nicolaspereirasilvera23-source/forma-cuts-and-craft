import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import team from "@/assets/team.jpg";
import interior from "@/assets/interior.jpg";
import { Button } from "@/components/ui/button";
import { WorksCarousel } from "@/components/site/WorksCarousel";
import { SmartImage } from "@/components/site/SmartImage";
import { barbers, products, services } from "@/data/demo";
import { formatUYU } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FORMA. Barber Studio — El estilo te define" },
      { name: "description", content: "Barbería contemporánea en Montevideo (demo). Cortes, barba y productos de grooming. Reservá tu turno con tu barbero." },
      { property: "og:title", content: "FORMA. Barber Studio — El estilo te define" },
      { property: "og:description", content: "Barbería contemporánea. Cortes, barba y grooming. Sitio demo." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO full bleed */}
      <section className="relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-overlay text-ivory">
        <img
          src={hero}
          alt="Hombre joven con corte texturizado sentado en una silla de barbería"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_35%]"
        />
        <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto flex h-full max-w-[1440px] flex-col items-center justify-end px-5 pb-14 text-center md:px-10 md:pb-20">
          <h1 className="text-[clamp(3.4rem,13vw,12rem)] leading-[0.82]">
            El estilo
            <br />
            <em>te define.</em>
          </h1>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link to="/agenda">Reservá tu turno</Link>
            </Button>
            <Link to="/tienda" className="text-sm text-ivory/85 underline-offset-8 hover:underline">
              Ver The Grooming Shop
            </Link>
          </div>
        </div>
      </section>

      <WorksCarousel />

      {/* Lugar / equipo — editorial asimétrico */}
      <section className="bg-beige">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-12 md:gap-6 md:px-10 md:py-32">
          <div className="md:col-span-5 md:row-span-2">
            <SmartImage src={team} alt="Barbero trabajando con tijera" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-10">
            <h2 className="text-[clamp(2.5rem,5.5vw,5rem)]">
              Tres sillas.
              <br />
              Tres barberos.
              <br />
              <em className="text-olive">Cada uno con su agenda.</em>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-graphite/80">
              En FORMA. cada barbero tiene su silla fija y su propio calendario. Elegís con quién
              te atendés —o tomás el primer lugar libre— y el corte lo charlan en la silla.
            </p>
            <ul className="mt-10 divide-y divide-graphite/15 border-y border-graphite/15">
              {barbers.map((b) => (
                <li key={b.id} className="flex items-baseline justify-between py-4">
                  <span className="font-display text-3xl">{b.name}</span>
                  <span className="text-sm text-graphite/70">Silla {b.chair} · {b.specialty}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:-mt-4">
            <SmartImage src={interior} alt="Interior del estudio con dos sillas de barbero" loading="lazy" width={1536} height={1024} className="aspect-[3/2] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Servicios y precios — sobre verde */}
      <section className="bg-olive text-ivory">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-4">
            <h2 className="text-[clamp(2.75rem,6vw,5.5rem)]">Carta</h2>
            <p className="mt-6 max-w-xs text-sm text-ivory/75">
              Precios indicativos en pesos uruguayos. Al reservar no necesitás elegir servicio.
            </p>
          </div>
          <dl className="md:col-span-8">
            {services.map((s) => (
              <div key={s.name} className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-ivory/20 py-5 first:border-t">
                <dt className="font-display text-3xl md:text-4xl">{s.name}</dt>
                <dd className="self-end font-mono text-lg tabular-nums">{formatUYU(s.price)}</dd>
                <dd className="col-span-2 mt-1 text-sm text-ivory/70">{s.detail} · {s.minutes} min</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Fidelización + accesos */}
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1440px] gap-px bg-border px-0 md:grid-cols-2">
          <div className="bg-ivory px-5 py-16 md:px-10 md:py-24">
            <p className="label-tech text-olive">Próximamente</p>
            <h2 className="mt-4 text-[clamp(2.5rem,5vw,4.5rem)]">Club FORMA.</h2>
            <p className="mt-6 max-w-md leading-relaxed text-graphite/80">
              Espacio reservado para un programa de fidelidad o membresía mensual (por ejemplo,
              corte cada 15 días a precio fijo). No está activo en esta demo: se define con la
              barbería.
            </p>
            <div className="mt-8 flex gap-8 font-display text-5xl">
              <span>10<span className="align-top text-lg text-muted-foreground">º corte</span></span>
              <span className="text-stone">/</span>
              <span>2<span className="align-top text-lg text-muted-foreground"> al mes</span></span>
            </div>
          </div>
          <div className="grid bg-ivory md:grid-rows-2">
            <Link to="/agenda" className="group flex items-end justify-between border-b border-border bg-graphite px-5 py-12 text-ivory md:px-10">
              <span>
                <span className="block text-sm text-ivory/60">Agenda</span>
                <span className="font-display text-5xl md:text-6xl">Elegí silla y hora</span>
              </span>
              <ArrowUpRight className="size-8 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
            <Link to="/tienda" className="group flex items-end justify-between gap-6 bg-beige px-5 py-12 md:px-10">
              <span>
                <span className="block text-sm text-graphite/60">The Grooming Shop · {products.length} productos</span>
                <span className="font-display text-5xl md:text-6xl">Lo que usamos en la silla</span>
              </span>
              <ArrowRight className="size-8 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
