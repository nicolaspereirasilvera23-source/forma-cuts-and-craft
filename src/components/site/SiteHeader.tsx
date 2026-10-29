import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "./cart";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/tienda", label: "Tienda" },
  { to: "/agenda", label: "Agenda" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        overHero ? "bg-transparent text-ivory" : "bg-ivory/95 text-graphite border-b border-border backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-5 md:h-24 md:px-10">
        <Link to="/" className="flex flex-col items-start gap-1" aria-label="FORMA. Barber Studio, inicio">
          <span className="font-display text-3xl leading-none">FORMA.</span>
          <span className="text-[8px] uppercase opacity-70">Barber Studio</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="text-[10px] uppercase opacity-80 transition-opacity hover:opacity-100 data-[status=active]:opacity-100 data-[status=active]:underline data-[status=active]:underline-offset-8"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/tienda"
            aria-label={`Carrito, ${count} productos`}
            className="relative inline-flex h-10 w-10 items-center justify-center"
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-olive px-1 text-[10px] font-semibold text-ivory">
                {count}
              </span>
            )}
          </Link>
          <Button asChild variant={overHero ? "hero" : "ink"} size="sm" className="hidden h-9 px-5 sm:inline-flex">
            <Link to="/agenda">Reservar turno</Link>
          </Button>
          <Button variant="ghost" size="icon"
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Móvil" className="h-[calc(100dvh-4rem)] bg-ivory px-5 pb-10 pt-6 md:hidden">
          <ul className="flex flex-col">
            {nav.map((n) => (
              <li key={n.to} className="border-b border-border">
                <Link to={n.to} activeOptions={{ exact: true }} className="block py-5 font-display text-5xl data-[status=active]:text-olive">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="default" size="xl" className="mt-8 w-full uppercase tracking-[0.14em] text-xs">
            <Link to="/agenda">Reservar turno</Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
