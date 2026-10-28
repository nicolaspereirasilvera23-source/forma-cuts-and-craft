/** Datos DEMO centralizados. Reemplazar por los reales de cada barbería. */
import cut1 from "@/assets/cut-1.jpg";
import cut2 from "@/assets/cut-2.jpg";
import cut3 from "@/assets/cut-3.jpg";
import cut4 from "@/assets/cut-4.jpg";
import cut5 from "@/assets/cut-5.jpg";
import pClay from "@/assets/p-clay.jpg";
import pPomade from "@/assets/p-pomade.jpg";
import pShampoo from "@/assets/p-shampoo.jpg";
import pOil from "@/assets/p-oil.jpg";
import pSpray from "@/assets/p-spray.jpg";
import pConditioner from "@/assets/p-conditioner.jpg";

export type Barber = {
  id: string;
  name: string;
  chair: number;
  specialty: string;
  /** Días que atiende: 0=domingo … 6=sábado */
  workDays: number[];
  start: string; // "10:00"
  end: string; // "19:00"
  slotMinutes: number;
};

export const barbers: Barber[] = [
  { id: "mateo", name: "Mateo", chair: 1, specialty: "Fades y texturas", workDays: [2, 3, 4, 5, 6], start: "10:00", end: "19:00", slotMinutes: 45 },
  { id: "bruno", name: "Bruno", chair: 2, specialty: "Tijera y clásicos", workDays: [1, 2, 3, 4, 5], start: "09:00", end: "17:00", slotMinutes: 45 },
  { id: "santi", name: "Santi", chair: 3, specialty: "Barba y perfilado", workDays: [3, 4, 5, 6], start: "12:00", end: "20:00", slotMinutes: 30 },
];

export type Service = { name: string; detail: string; price: number; minutes: number };

export const services: Service[] = [
  { name: "Corte", detail: "Máquina, tijera o ambos. Lavado incluido.", price: 650, minutes: 45 },
  { name: "Corte + barba", detail: "Corte completo y perfilado con navaja.", price: 900, minutes: 60 },
  { name: "Barba", detail: "Rebaje, diseño y toalla caliente.", price: 450, minutes: 30 },
  { name: "Corte niño", detail: "Hasta 12 años.", price: 500, minutes: 30 },
  { name: "Rapado + perfil", detail: "Una sola medida y terminación.", price: 400, minutes: 30 },
];

export type Work = { src: string; title: string; by: string };
export const works: Work[] = [
  { src: cut1, title: "Low taper texturizado", by: "Mateo" },
  { src: cut2, title: "Mid fade rulos + barba", by: "Santi" },
  { src: cut3, title: "Mullet moderno", by: "Bruno" },
  { src: cut4, title: "Side part con skin fade", by: "Mateo" },
  { src: cut5, title: "Buzz cut + barba esculpida", by: "Santi" },
];

export type Category = "Peinado" | "Lavado" | "Barba";
export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  size: string;
  image: string;
  short: string;
  hold?: string;
  finish?: string;
  howTo: string;
};

export const products: Product[] = [
  { id: "arcilla", name: "Arcilla texturizadora", category: "Peinado", price: 890, size: "80 g", image: pClay, short: "Fijación alta, acabado mate. Para cortes con volumen y movimiento.", hold: "Alta", finish: "Mate", howTo: "Sobre pelo seco, una porción chica entre las manos. Trabajá desde la raíz." },
  { id: "pomada", name: "Pomada clásica", category: "Peinado", price: 790, size: "100 g", image: pPomade, short: "Brillo medio y control para peinados prolijos.", hold: "Media", finish: "Brillo medio", howTo: "Pelo húmedo o seco. Peiná con peine fino para líneas marcadas." },
  { id: "spray-sal", name: "Spray sal marina", category: "Peinado", price: 690, size: "200 ml", image: pSpray, short: "Textura de playa sin endurecer. Ideal como pre-peinado.", hold: "Ligera", finish: "Natural", howTo: "4–6 pulverizaciones en pelo húmedo, secá con secador o al aire." },
  { id: "shampoo", name: "Shampoo diario", category: "Lavado", price: 750, size: "300 ml", image: pShampoo, short: "Limpieza suave para uso diario. Sin sensación pesada.", howTo: "Masajeá en cuero cabelludo húmedo y enjuagá. Repetí si usás producto." },
  { id: "acondicionador", name: "Acondicionador ligero", category: "Lavado", price: 750, size: "200 ml", image: pConditioner, short: "Desenreda y suaviza sin quitar cuerpo al pelo corto.", howTo: "Medios y puntas, dejá actuar 2 minutos y enjuagá." },
  { id: "aceite-barba", name: "Aceite para barba", category: "Barba", price: 820, size: "30 ml", image: pOil, short: "Hidrata piel y barba, reduce picazón. Aroma amaderado suave.", howTo: "3–5 gotas en la palma, distribuí en la barba y peiná." },
];

export const categories: Category[] = ["Peinado", "Lavado", "Barba"];
