import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { works } from "@/data/demo";
import { SmartImage } from "./SmartImage";

export function WorksCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) setPaused(true);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("figure");
    const w = card ? card.getBoundingClientRect().width + 20 : 300;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: reduced ? "auto" : "smooth" });
    else el.scrollBy({ left: dir * w, behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  useEffect(() => {
    if (paused || hovering) return;
    const id = setInterval(() => step(1), 4000);
    return () => clearInterval(id);
  }, [paused, hovering, step]);

  return (
    <section aria-roledescription="carrusel" aria-label="Trabajos de ejemplo" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 md:flex-row md:items-end md:justify-between md:px-10">
        <h2 className="text-[clamp(2.75rem,7vw,6rem)]">
          Silla, tijera <em className="text-olive">y criterio.</em>
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={() => setPaused((p) => !p)} className="inline-flex h-11 items-center gap-2 border border-graphite/30 px-4 text-xs uppercase tracking-[0.14em] hover:bg-graphite hover:text-ivory" aria-pressed={paused}>
            {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            {paused ? "Reproducir" : "Pausar"}
          </button>
          <button onClick={() => step(-1)} aria-label="Anterior" className="grid h-11 w-11 place-items-center border border-graphite/30 hover:bg-graphite hover:text-ivory"><ChevronLeft className="size-5" /></button>
          <button onClick={() => step(1)} aria-label="Siguiente" className="grid h-11 w-11 place-items-center border border-graphite/30 hover:bg-graphite hover:text-ivory"><ChevronRight className="size-5" /></button>
        </div>
      </div>

      <div
        ref={track}
        tabIndex={0}
        aria-label="Galería, desplazable con flechas del teclado"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        onTouchStart={() => setPaused(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
        }}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 md:scroll-px-10 md:px-10"
      >
        {works.map((w, i) => (
          <figure key={w.title} className={`shrink-0 snap-start ${i % 2 ? "md:mt-16" : ""} w-[72vw] sm:w-[44vw] md:w-[30vw] lg:w-[24vw]`} aria-label={`${i + 1} de ${works.length}`}>
            <SmartImage src={w.src} alt={w.title} loading="lazy" width={768} height={1024} className="aspect-[3/4] w-full object-cover" />
            <figcaption className="mt-3 flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium">{w.title}</span>
              <span className="label-tech text-muted-foreground">{w.by}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-[1440px] px-5 text-xs text-muted-foreground md:px-10">Fotos ilustrativas de demostración.</p>
    </section>
  );
}
