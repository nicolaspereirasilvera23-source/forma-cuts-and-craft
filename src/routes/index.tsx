import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Scissors, CalendarDays, ShoppingBag, Check, Users, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero-reference.jpg";
import studio from "@/assets/studio-reference.jpg";
import team from "@/assets/team.jpg";
import { Button } from "@/components/ui/button";
import { WorksCarousel } from "@/components/site/WorksCarousel";
import { SmartImage } from "@/components/site/SmartImage";
import { useCart } from "@/components/site/cart";
import { barbers, products, works, services } from "@/data/demo";
import { formatUYU, site } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "FORMA. Barber Studio — El estilo te define" },
    { name: "description", content: "FORMA. Barber Studio en Montevideo: cortes, barba y grooming. Descubrí el estudio y su agenda de demostración." },
    { property: "og:title", content: "FORMA. Barber Studio — El estilo te define" },
    { property: "og:description", content: "Cortes con personalidad, barbería y grooming. Demo comercial de NeztLabs." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Home,
});

function Home() {
  const { add } = useCart();
  const [added, setAdded] = useState<string[]>([]);
  const featured = [products[0], products[3], products[1], products[5]].filter((p) => p !== undefined);
  return <>
    <section className="forma-hero relative isolate overflow-hidden bg-overlay text-ivory">
      <img src={hero} alt="Corte texturizado con rulos y degradado en una silla del estudio" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />
      <div className="forma-container relative flex h-full items-end pb-12 pt-28 md:items-center md:pb-8">
        <div className="hero-copy">
          <p className="mb-5 text-[10px] uppercase">{site.city} · UY</p>
          <h1 className="hero-title uppercase">El estilo<br /><span className="text-beige">te define.</span></h1>
          <p className="mt-5 text-xs uppercase text-ivory/85">Cortes con personalidad.</p>
          <p className="mt-4 max-w-[280px] text-xs leading-relaxed text-ivory/75">Más que un corte, una forma de expresarte.<br />Barbería, cultura y cuidado personal.</p>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <Button asChild variant="hero"><Link to="/agenda">Reservar turno <ArrowRight /></Link></Button>
            <Button variant="ghost" className="hidden px-0 text-[10px] uppercase text-ivory hover:bg-transparent hover:text-beige sm:inline-flex" onClick={() => document.getElementById("trabajos")?.scrollIntoView({ behavior: "smooth" })}><span className="grid size-8 place-items-center rounded-full border border-ivory/35"><ArrowRight /></span>Ver nuestro trabajo</Button>
          </div>
        </div>
        <div className="absolute right-10 top-1/2 hidden flex-col items-end gap-7 text-right text-[10px] uppercase leading-relaxed text-ivory/75 lg:flex"><span>Barber<br />Studio</span><span>Cortes<br />Barba<br />Estilo<br />Cuidado</span><span className="border-t border-ivory/30 pt-3">FORMA.</span></div>
      </div>
    </section>

    <WorksCarousel />

    <section className="studio-band relative isolate bg-overlay text-ivory">
      <SmartImage src={studio} alt="Silla de barbería de cuero negro, espejos y plantas en el estudio" width={1920} height={768} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="studio-scrim absolute inset-0 -z-10" aria-hidden />
      <div className="forma-container py-10 md:py-12"><h2 className="section-title max-w-[290px] uppercase">Un espacio<br />pensado<br />para vos</h2><p className="mt-4 max-w-[240px] text-xs leading-relaxed text-ivory/75">Una silla, tu barbero y tiempo para darle forma a tu estilo.</p><Button asChild variant="heroOutline" className="mt-6"><Link to="/contacto">Conocé el estudio <ArrowRight /></Link></Button></div>
    </section>

    <section className="bg-ivory">
      <div className="forma-container grid gap-8 py-8 md:grid-cols-[1fr_1.25fr_0.6fr] md:gap-8 md:py-9">
        <div><p className="section-kicker">Servicios</p><h2 className="section-title mt-3 uppercase">Tu estilo,<br />nuestra especialidad</h2><p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">Cortes, barba y terminaciones. Elegís el servicio en la silla.</p><Button asChild className="mt-5"><Link to="/agenda">Elegí tu turno <ArrowRight /></Link></Button></div>
        <dl className="self-center">{services.map((s) => <div key={s.name} className="grid grid-cols-[1fr_auto] gap-3 border-b border-graphite/15 py-3.5"><dt className="text-[11px] uppercase">{s.name}</dt><dd className="font-mono text-xs">{formatUYU(s.price)}</dd></div>)}<p className="mt-3 text-[10px] text-muted-foreground">Precios y servicios de demostración · UYU</p></dl>
        <SmartImage src={team} alt="Trabajo de tijera de un barbero" width={1024} height={1280} loading="lazy" className="hidden h-full max-h-[280px] w-full object-cover md:block" />
      </div>
    </section>

    <section className="bg-beige">
      <div className="forma-container grid gap-7 py-8 md:grid-cols-[1fr_2.4fr] md:py-9">
        <div><p className="section-kicker">The Grooming Shop</p><h2 className="section-title mt-3 uppercase">Productos<br />que potencian<br />tu estilo</h2><p className="mt-4 max-w-[240px] text-xs leading-relaxed text-graphite/75">Lo que usamos en la silla, para tu rutina de todos los días.</p><Button asChild className="mt-5"><Link to="/tienda">Ver tienda <ArrowRight /></Link></Button></div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible">{featured.map((p) => <article key={p.id} className="w-[74%] shrink-0 snap-start bg-ivory/60 sm:w-[45%] md:w-auto"><Link to="/tienda" aria-label={`Ver ${p.name}`}><SmartImage src={p.image} alt={p.name} width={1024} height={1024} loading="lazy" className="aspect-square w-full object-cover" /></Link><div className="p-3"><h3 className="font-sans text-[10px] font-medium uppercase leading-normal">{p.name}</h3><p className="mt-1 text-[10px] text-muted-foreground">{p.category} · {p.size}</p><div className="mt-2 flex items-center justify-between"><span className="text-sm">{formatUYU(p.price)}</span><Button variant="ghost" size="icon" className="size-8" aria-label={`Agregar ${p.name} al carrito demo`} title="Agregar al carrito demo" onClick={() => { add(p.id); setAdded((ids) => [...ids, p.id]); }}>{added.includes(p.id) ? <Check /> : <ShoppingBag />}</Button></div></div></article>)}</div>
      </div>
    </section>

    <section className="bg-olive text-ivory">
      <div className="forma-container grid items-center gap-8 py-8 md:grid-cols-[1fr_0.8fr_1.4fr] md:py-0">
        <div className="md:py-9"><p className="section-kicker text-ivory/65">Club FORMA.</p><h2 className="section-title mt-3 uppercase">Cuidá tu estilo<br />todo el mes</h2><p className="mt-4 max-w-xs text-xs leading-relaxed text-ivory/75">Un espacio para volver. Membresías y beneficios, próximamente.</p><span className="mt-5 inline-block border-b border-ivory/35 pb-1 text-[10px] uppercase text-ivory/70">No activo · demostración</span></div>
        <SmartImage src={hero} alt="Detalle del corte texturizado" width={1920} height={1088} loading="lazy" className="hidden h-[245px] w-full object-cover object-[70%_center] md:block" />
        <div className="grid grid-cols-2 gap-6 md:gap-7">{[{ icon: CalendarDays, label: "Tu próxima visita" }, { icon: Scissors, label: "Cortes y barba" }, { icon: ShoppingBag, label: "Grooming" }, { icon: Users, label: "Tu barbero" }].map(({ icon: Icon, label }) => <div key={label} className="flex flex-col items-center gap-3 text-center"><Icon strokeWidth={1} className="size-8 text-beige/75" /><span className="text-[9px] uppercase text-ivory/75">{label}</span></div>)}</div>
      </div>
    </section>

    <section className="bg-ivory"><div className="forma-container grid gap-8 py-9 md:grid-cols-[1fr_1.4fr_0.6fr] md:items-center"><div><p className="section-kicker">Reservá tu turno</p><h2 className="section-title mt-3 uppercase">Elegí tu barbero,<br />el día y el horario</h2><p className="mt-4 text-xs text-muted-foreground">Tu silla. Tu momento. Agenda de demostración.</p></div><div className="grid grid-cols-3 gap-3">{barbers.map((b, i) => <Link to="/agenda" key={b.id} className="group border border-graphite/15 p-2 transition-colors hover:border-olive"><SmartImage src={works[i]?.src} alt={`Corte de ejemplo de ${b.name}`} width={768} height={1024} loading="lazy" className="aspect-[4/3] w-full object-cover" /><span className="mt-2 block text-[11px] uppercase">{b.name}</span><span className="mt-1 block text-[9px] text-muted-foreground">Silla {b.chair}</span></Link>)}</div><Button asChild className="w-full"><Link to="/agenda">Reservar turno <ArrowUpRight /></Link></Button></div></section>
  </>;
}
