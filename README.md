## M-Investment – One-page premium site

Single-page site for M-Investment (conseil & accompagnement immobilier, sécurisation juridique, gestion post-achat).

### Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

### Structure

- `app/page.tsx`: sections `#hero, #intro, #services, #why, #zones, #about, #cta, #contact`
- `components/`: `Header`, `SectionTitle`, `ServiceCard`, `ContactForm`
- `utils/scroll.ts`: active section + smooth scroll
- `app/api/contact/route.ts`: API stub (mock)
- `public/`: `logo.svg`, `hero.jpg`, `founder.jpg`, `icons/`

### Notes

- Tokens: see `app/globals.css` (`--cream`, `--black`, `--gold`, `--gray600`)
- Accessibility: visible focus, aria-live on form, semantic landmarks
- Performance: lightweight, images with width/height, animations respect prefers-reduced-motion
