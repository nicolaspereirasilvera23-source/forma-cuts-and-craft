<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Demo content lives in `src/data/demo.ts` and brand/contact config in `src/config/site.ts`; never hardcode business data in routes (keeps the demo re-skinnable per client).
- Booking goes through the `BookingProvider` interface in `src/lib/booking/`; swap the mock for a DB-backed provider instead of changing UI (enables atomic Postgres bookings later).
- Contact numbers/socials come only from `VITE_*` env vars; show a "pending configuration" state when missing (never invent contact data).

- Homepage composition uses shared editorial layout classes in `src/styles.css`; commerce and booking actions reuse the existing cart and BookingProvider flows to keep presentation independent of demo logic.
