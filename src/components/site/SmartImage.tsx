import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Imagen con fallback elegante (bloque beige con monograma) si falla la carga. */
export function SmartImage({ className, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div role="img" aria-label={alt} className={cn("grid place-items-center bg-beige text-graphite/40", className)}>
        <span className="font-display text-4xl">F.</span>
      </div>
    );
  return <img alt={alt} onError={() => setFailed(true)} className={className} {...props} />;
}
