import { Link } from "@tanstack/react-router";
import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="bg-graphite text-ivory">
      <div className="mx-auto grid max-w-[1360px] gap-8 px-5 py-10 md:grid-cols-12 md:px-10 md:py-12">
        <div className="md:col-span-6">
          <p className="font-display text-6xl md:text-7xl leading-[0.8]">FORMA.</p>
          <p className="mt-6 max-w-sm text-xs text-ivory/70">
            Barber studio. Demo comercial — dirección, horarios y contacto pendientes de configuración.
          </p>
        </div>
        <nav aria-label="Pie" className="grid grid-cols-2 gap-6 text-xs md:col-span-6 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <span className="label-tech text-stone">Sitio</span>
            <Link to="/" className="hover:underline">Inicio</Link>
            <Link to="/tienda" className="hover:underline">Tienda</Link>
            <Link to="/agenda" className="hover:underline">Agenda</Link>
            <Link to="/contacto" className="hover:underline">Contacto</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="label-tech text-stone">Redes</span>
            {site.instagramUrl ? <a href={site.instagramUrl} className="hover:underline">Instagram</a> : <span className="text-ivory/50">Instagram · pendiente</span>}
            {site.tiktokUrl ? <a href={site.tiktokUrl} className="hover:underline">TikTok</a> : <span className="text-ivory/50">TikTok · pendiente</span>}
            {site.whatsappNumber ? <a href={`https://wa.me/${site.whatsappNumber}`} className="hover:underline">WhatsApp</a> : <span className="text-ivory/50">WhatsApp · pendiente</span>}
          </div>
          <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
            <span className="label-tech text-stone">Visitanos</span>
            <span className="text-ivory/70">{site.city}</span>
            <span className="text-ivory/50">Dirección a confirmar</span>
          </div>
        </nav>
      </div>
      <div className="border-t border-ivory/15">
        <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-2 px-5 py-5 text-xs text-ivory/50 md:flex-row md:px-10">
          <span>© {new Date().getFullYear()} {site.fullName} · Marca ficticia</span>
          <span>{site.credit}</span>
        </div>
      </div>
    </footer>
  );
}
