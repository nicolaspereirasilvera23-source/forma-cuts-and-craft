import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SmartImage } from "@/components/site/SmartImage";
import { DemoNotice } from "@/components/site/DemoNotice";
import { useCart } from "@/components/site/cart";
import { categories, products, type Category, type Product } from "@/data/demo";
import { formatUYU, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tienda")({
  head: () => ({
    meta: [
      { title: "The Grooming Shop — FORMA. Barber Studio" },
      { name: "description", content: "Arcilla, pomada, shampoo, aceite para barba y más. Precios en pesos uruguayos. Consultas por WhatsApp." },
      { property: "og:title", content: "The Grooming Shop — FORMA." },
      { property: "og:description", content: "Productos de grooming que usamos en la silla. Precios en UYU." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<Category | "Todo">("Todo");
  const [detail, setDetail] = useState<Product | null>(null);
  const cart = useCart();
  const list = cat === "Todo" ? products : products.filter((p) => p.category === cat);
  const [feature, ...rest] = list;

  const waMsg =
    cart.lines.length > 0
      ? `Hola FORMA., quiero consultar por: ${cart.lines.map((l) => `${l.qty}× ${l.product.name}`).join(", ")} (total ${formatUYU(cart.total)}).`
      : "Hola FORMA., quiero consultar por productos de la tienda.";
  const wa = whatsappLink(waMsg);

  return (
    <div className="bg-ivory pt-16 md:pt-20">
      <header className="mx-auto grid max-w-[1440px] gap-8 px-5 pb-10 pt-14 md:grid-cols-12 md:px-10 md:pt-24">
        <h1 className="text-[clamp(3.2rem,10vw,9rem)] leading-[0.85] md:col-span-8">
          The Grooming
          <br />
          <em className="text-olive">Shop</em>
        </h1>
        <p className="max-w-sm self-end text-graphite/80 md:col-span-4">
          Una selección corta: lo que usamos todos los días en la silla, para que en casa te quede igual.
        </p>
      </header>

      <div className="sticky top-16 z-30 border-y border-border bg-ivory/95 backdrop-blur-sm md:top-20">
        <div role="group" aria-label="Filtrar por categoría" className="no-scrollbar mx-auto flex max-w-[1440px] gap-2 overflow-x-auto px-5 py-3 md:px-10">
          {(["Todo", ...categories] as const).map((c) => (
            <button
              key={c}
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn("h-10 shrink-0 border px-5 text-sm transition-colors", cat === c ? "border-graphite bg-graphite text-ivory" : "border-graphite/25 hover:border-graphite")}
            >
              {c}
              <span className="ml-2 font-mono text-xs opacity-60">{c === "Todo" ? products.length : products.filter((p) => p.category === c).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-12 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {!feature ? (
            <p className="py-20 text-center text-muted-foreground">No hay productos en esta categoría.</p>
          ) : (
            <>
              {/* Producto destacado, formato editorial */}
              <article className="grid gap-6 border-b border-border pb-12 md:grid-cols-2">
                <button onClick={() => setDetail(feature)} className="block overflow-hidden" aria-label={`Ver detalle de ${feature.name}`}>
                  <SmartImage src={feature.image} alt={feature.name} width={896} height={1120} className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
                </button>
                <div className="flex flex-col justify-end">
                  <span className="label-tech text-olive">{feature.category} · {feature.size}</span>
                  <h2 className="mt-3 text-5xl md:text-6xl">{feature.name}</h2>
                  <p className="mt-4 text-graphite/80">{feature.short}</p>
                  <p className="mt-6 font-mono text-2xl">{formatUYU(feature.price)}</p>
                  <div className="mt-6 flex gap-3">
                    <Button variant="ink" size="lg" onClick={() => cart.add(feature.id)}>Agregar</Button>
                    <Button variant="outline" size="lg" onClick={() => setDetail(feature)}>Ficha</Button>
                  </div>
                </div>
              </article>

              <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
                {rest.map((p) => (
                  <li key={p.id} className="flex flex-col">
                    <button onClick={() => setDetail(p)} className="block overflow-hidden bg-beige" aria-label={`Ver detalle de ${p.name}`}>
                      <SmartImage src={p.image} alt={p.name} loading="lazy" width={896} height={1120} className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
                    </button>
                    <div className="mt-3 flex flex-1 flex-col">
                      <span className="text-xs text-muted-foreground">{p.category} · {p.size}</span>
                      <h3 className="mt-1 font-display text-2xl leading-tight md:text-3xl">{p.name}</h3>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <span className="font-mono tabular-nums">{formatUYU(p.price)}</span>
                        <button onClick={() => cart.add(p.id)} className="h-10 px-2 text-sm underline underline-offset-4 hover:text-olive" aria-label={`Agregar ${p.name}`}>
                          Agregar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Carrito local */}
        <aside aria-labelledby="cart-title" className="lg:col-span-4">
          <div className="bg-beige p-6 lg:sticky lg:top-40">
            <h2 id="cart-title" className="text-4xl">Tu selección</h2>
            {cart.lines.length === 0 ? (
              <p className="mt-4 text-sm text-graphite/70">Todavía no agregaste productos.</p>
            ) : (
              <ul className="mt-6 divide-y divide-graphite/15">
                {cart.lines.map((l) => (
                  <li key={l.product.id} className="flex items-center gap-3 py-3">
                    <span className="flex-1 text-sm">{l.product.name}</span>
                    <div className="flex items-center">
                      <button className="grid h-9 w-9 place-items-center" aria-label={`Quitar uno de ${l.product.name}`} onClick={() => cart.setQty(l.product.id, l.qty - 1)}><Minus className="size-4" /></button>
                      <span className="w-6 text-center font-mono text-sm" aria-live="polite">{l.qty}</span>
                      <button className="grid h-9 w-9 place-items-center" aria-label={`Sumar uno de ${l.product.name}`} onClick={() => cart.setQty(l.product.id, l.qty + 1)}><Plus className="size-4" /></button>
                    </div>
                    <button className="grid h-9 w-9 place-items-center text-graphite/60" aria-label={`Eliminar ${l.product.name}`} onClick={() => cart.setQty(l.product.id, 0)}><X className="size-4" /></button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex items-baseline justify-between border-t border-graphite/20 pt-4">
              <span className="text-sm">Total estimado</span>
              <span className="font-mono text-xl">{formatUYU(cart.total)}</span>
            </div>
            {wa ? (
              <Button asChild size="lg" className="mt-6 w-full">
                <a href={wa} target="_blank" rel="noreferrer">Consultar por WhatsApp</a>
              </Button>
            ) : (
              <>
                <Button size="lg" className="mt-6 w-full" disabled>Consultar por WhatsApp</Button>
                <DemoNotice className="mt-4">
                  WhatsApp sin configurar. Definí <code className="font-mono text-xs">VITE_WHATSAPP_NUMBER</code> para activar la consulta prellenada.
                </DemoNotice>
              </>
            )}
            <p className="mt-4 text-xs text-graphite/60">Demo: no hay cobro online. La selección se pierde al cerrar la pestaña.</p>
          </div>
        </aside>
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden rounded-sm border-none bg-ivory p-0 sm:grid-cols-2 md:grid">
          {detail && (
            <>
              <SmartImage src={detail.image} alt={detail.name} className="aspect-square w-full object-cover md:aspect-auto md:h-full" />
              <div className="p-6 md:p-8">
                <span className="label-tech text-olive">{detail.category} · {detail.size}</span>
                <DialogTitle className="mt-2 font-display text-4xl font-normal">{detail.name}</DialogTitle>
                <DialogDescription className="mt-3 text-graphite/80">{detail.short}</DialogDescription>
                <dl className="mt-6 grid grid-cols-2 gap-y-3 border-y border-border py-4 text-sm">
                  {detail.hold && (<><dt className="text-muted-foreground">Fijación</dt><dd>{detail.hold}</dd></>)}
                  {detail.finish && (<><dt className="text-muted-foreground">Acabado</dt><dd>{detail.finish}</dd></>)}
                  <dt className="text-muted-foreground">Contenido</dt><dd>{detail.size}</dd>
                </dl>
                <h3 className="mt-5 font-sans text-sm font-semibold">Modo de uso</h3>
                <p className="mt-1 text-sm text-graphite/80">{detail.howTo}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-mono text-2xl">{formatUYU(detail.price)}</span>
                  <Button variant="ink" size="lg" onClick={() => { cart.add(detail.id); setDetail(null); }}>Agregar</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
