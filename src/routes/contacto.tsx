import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import interior from "@/assets/interior.jpg";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/site/SmartImage";
import { DemoNotice } from "@/components/site/DemoNotice";
import { site, whatsappLink } from "@/config/site";
import { barbers } from "@/data/demo";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y visita — FORMA. Barber Studio" },
      { name: "description", content: "Cómo llegar, horarios y redes de FORMA. Barber Studio. Datos de demostración pendientes de configurar." },
      { property: "og:title", content: "Contacto — FORMA. Barber Studio" },
      { property: "og:description", content: "Ubicación, horarios y redes. Sitio demo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const hours = [
  ["Lunes", "A confirmar"],
  ["Martes a viernes", "A confirmar"],
  ["Sábado", "A confirmar"],
  ["Domingo", "A confirmar"],
];

function Contact() {
  const wa = whatsappLink("Hola FORMA., tengo una consulta.");
  const channels = [
    { label: "WhatsApp", href: wa, env: "VITE_WHATSAPP_NUMBER" },
    { label: "Instagram", href: site.instagramUrl, env: "VITE_INSTAGRAM_URL" },
    { label: "TikTok", href: site.tiktokUrl, env: "VITE_TIKTOK_URL" },
  ];

  return (
    <div className="bg-ivory pt-16 md:pt-24">
      {/* Fachada: imagen arquitectónica con título anclado abajo */}
      <section className="relative">
        <SmartImage src={interior} alt="Interior de FORMA. con sillas de barbero y paredes verde oliva" width={1536} height={1024} className="h-[42svh] min-h-[280px] w-full object-cover" />
        <div className="mx-auto max-w-[1360px] px-5 md:px-10">
          <h1 className="mt-6 text-6xl md:text-8xl leading-[0.85] text-graphite">
            Pasá <em className="text-olive">por casa.</em>
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1360px] gap-14 px-5 py-16 md:grid-cols-12 md:px-10 md:py-14">
        <div className="md:col-span-5">
          <p className="text-lg leading-relaxed">
            Un estudio chico, de tres sillas, con luz natural y música baja. Venís, te sentás con
            tu barbero de siempre y salís con el corte que charlaron. Preferimos trabajar con turno
            para no hacerte esperar.
          </p>
          <DemoNotice className="mt-8">
            Dirección, horarios y redes son marcadores de posición de esta demo: se completan con los datos reales de la barbería.
          </DemoNotice>
        </div>

        <div className="grid gap-12 md:col-span-6 md:col-start-7 sm:grid-cols-2">
          <div>
            <h2 className="text-3xl">Ubicación</h2>
            <address className="mt-4 not-italic text-graphite/80">
              {site.address ?? "Dirección a confirmar"}
              <br />
              {site.city}
            </address>
          </div>
          <div>
            <h2 className="text-3xl">Horarios</h2>
            <dl className="mt-4 space-y-2 text-sm">
              {hours.map(([d, h]) => (
                <div key={d} className="flex justify-between border-b border-border pb-2">
                  <dt>{d}</dt>
                  <dd className="text-muted-foreground">{h}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-olive text-ivory">
        <div className="mx-auto max-w-[1360px] px-5 py-16 md:px-10 md:py-14">
          <h2 className="text-[clamp(2.5rem,6vw,5rem)]">Escribinos</h2>
          <ul className="mt-10 divide-y divide-ivory/20 border-y border-ivory/20">
            {channels.map((c) => (
              <li key={c.label}>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-6">
                    <span className="font-display text-4xl md:text-6xl">{c.label}</span>
                    <ArrowUpRight className="size-8 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                ) : (
                  <div className="flex flex-col justify-between gap-1 py-6 sm:flex-row sm:items-center">
                    <span className="font-display text-4xl text-ivory/50 md:text-6xl">{c.label}</span>
                    <span className="text-sm text-ivory/70">Configuración pendiente · <code className="font-mono text-xs">{c.env}</code></span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1360px] gap-10 px-5 py-16 md:grid-cols-3 md:px-10 md:py-14">
        <div>
          <h2 className="text-3xl">Si es tu primera vez</h2>
          <p className="mt-3 text-sm text-graphite/80">Traé una foto de referencia si tenés. Si no, lo resolvemos en la silla.</p>
        </div>
        <div>
          <h2 className="text-3xl">Puntualidad</h2>
          <p className="mt-3 text-sm text-graphite/80">Cada barbero tiene su agenda; llegar a tiempo cuida el turno del que sigue.</p>
        </div>
        <div>
          <h2 className="text-3xl">El equipo</h2>
          <p className="mt-3 text-sm text-graphite/80">{barbers.map((b) => b.name).join(", ")} — una silla cada uno.</p>
          <Button asChild variant="ink" size="lg" className="mt-6"><Link to="/agenda">Reservá tu turno</Link></Button>
        </div>
      </section>
    </div>
  );
}
