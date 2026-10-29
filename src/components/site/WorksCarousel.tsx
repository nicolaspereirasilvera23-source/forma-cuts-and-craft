import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { works } from "@/data/demo";
import { SmartImage } from "./SmartImage";
import { Button } from "@/components/ui/button";

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
    return (
    <section id="trabajos" aria-roledescription="carrusel" aria-label="Trabajos de ejemplo" className="bg-ivory">
      <div className="forma-container grid gap-6 py-7 md:grid-cols-[1fr_2.4fr] md:py-8">
        <div className="flex flex-col justify-center">
          <p className="section-kicker">Nuestro trabajo</p>
          <h2 className="section-title mt-3 uppercase">Cortes reales,<br />estilos únicos</h2>
          <p className="mt-4 max-w-[250px] text-xs leading-relaxed text-muted-foreground">Cada corte refleja una persona, un estilo y una historia.</p>
          <div className="mt-3 flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => step(-1)} aria-label="Anterior" title="Anterior"><ChevronLeft /></Button>
            <Button variant="ghost" size="icon" onClick={() => step(1)} aria-label="Siguiente" title="Siguiente"><ChevronRight /></Button>
            <Button variant="ghost" size="icon" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? "Reproducir galería" : "Pausar galería"} title={paused ? "Reproducir" : "Pausar"}>{paused ? <Play /> : <Pause />}</Button>
          </div>
        </div>
        <div ref={track} tabIndex={0} aria-label="Galería de cortes" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} onFocus={() => setHovering(true)} onBlur={() => setHovering(false)} onTouchStart={() => setPaused(true)} onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); step(1); } if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); } }} className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto">
          {works.map((w, i) => <figure key={w.title} className="w-[65%] shrink-0 snap-start sm:w-[40%] md:w-[calc((100%-36px)/4)]" aria-label={`${i + 1} de ${works.length}`}><SmartImage src={w.src} alt={w.title} loading="lazy" width={768} height={1024} className="aspect-[3/4] w-full object-cover" /><figcaption className="mt-2 text-[9px] text-muted-foreground">{w.title}</figcaption></figure>)}
        </div>
      </div>
      <p className="forma-container pb-3 text-[9px] text-muted-foreground">Fotos ilustrativas de demostración.</p>
    </section>
  );
}
