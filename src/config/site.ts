/**
 * Configuración central de la marca. Editá este archivo para personalizar la demo
 * para otra barbería. Los datos de contacto reales NO se inventan: quedan en null
 * hasta que el negocio los provea (o vía variables VITE_*).
 */
export const site = {
  name: "FORMA.",
  fullName: "FORMA. Barber Studio",
  city: "Montevideo (demo)",
  /** Número en formato internacional sin "+", ej: 59899123456. Se lee de VITE_WHATSAPP_NUMBER. */
  whatsappNumber: (import.meta.env["VITE_WHATSAPP_NUMBER"] as string | undefined)?.trim() || null,
  instagramUrl: (import.meta.env["VITE_INSTAGRAM_URL"] as string | undefined)?.trim() || null,
  tiktokUrl: (import.meta.env["VITE_TIKTOK_URL"] as string | undefined)?.trim() || null,
  address: null as string | null,
  credit: "Demo comercial por NeztLabs",
};

export function whatsappLink(message: string): string | null {
  if (!site.whatsappNumber) return null;
  const digits = site.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const formatUYU = (n: number) =>
  new Intl.NumberFormat("es-UY", { style: "currency", currency: "UYU", maximumFractionDigits: 0 })
    .format(n)
    .replace("UYU", "$U");
