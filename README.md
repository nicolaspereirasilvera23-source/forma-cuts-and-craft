# FORMA. Barber Studio — demo NeztLabs

Sitio demo multipágina para barberías: `/` home, `/tienda` The Grooming Shop, `/agenda` reservas (simuladas), `/contacto`.

## Personalizar
- **Marca, ciudad, dirección**: `src/config/site.ts`
- **Barberos, servicios, precios, productos, trabajos**: `src/data/demo.ts`
- **Fotos**: `src/assets/` (reemplazar archivos manteniendo nombre, o cambiar imports en `demo.ts`)
- **Colores y tipografías**: `src/styles.css` (tokens) y links de fuentes en `src/routes/__root.tsx`

## Variables de entorno
| Variable | Uso |
|---|---|
| `VITE_WHATSAPP_NUMBER` | Número internacional sin `+` (ej. `598…`). Activa consultas prellenadas en tienda y contacto. |
| `VITE_INSTAGRAM_URL` | URL completa del perfil. |
| `VITE_TIKTOK_URL` | URL completa del perfil. |

Sin configurar, la UI muestra "Configuración pendiente". No se inventan datos.

## Agenda
- Regla: 1 barbero = 1 silla = 1 calendario. No se exige elegir servicio.
- Hoy: `src/lib/booking/mock-provider.ts` (disponibilidad simulada, nada se guarda).
- Producción: implementar `BookingProvider` (`src/lib/booking/types.ts`) con server functions sobre PostgreSQL,
  `UNIQUE (barber_id, starts_at)` y `INSERT` transaccional para reservas atómicas.

## Tests
`bunx vitest run`
