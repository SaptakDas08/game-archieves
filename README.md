# Game Archieves

A minimal, dark, responsive gaming catalogue. Browse games, check screenshots and
system requirements, and find legitimate places to get them.

Built with **Vite + HTML + CSS + vanilla JavaScript**. No backend, no database, no accounts.

## Pages

| Page | File | Contents |
| --- | --- | --- |
| Home | `index.html` | Hero, category cards, featured games, entry explainer |
| Android & Emulators | `android-emulators.html` | 10 catalogue slots, platform-type filters |
| Gaming Computers | `gaming-computers.html` | 10 catalogue slots, operating-system filters |

Game details open in a hash-linkable dialog (`…/android-emulators.html#game=micro-mages`),
so a detail view can be shared and refreshed without any server-side routing.

## Run it

```bash
npm install
npm run dev      # development server
npm run build    # production build into dist/
npm run preview  # serve the production build
npm test         # catalogue + search/filter self-check
```

## Editing the catalogue

All content lives in two plain data files — no layout changes are needed to edit it:

- `src/data/android-emulators.js` → `androidGames` (`android-01` … `android-10`)
- `src/data/gaming-computers.js` → `pcGames` (`pc-01` … `pc-10`)

### Add a game

Both catalogues ship **empty** — 10 reserved slots each, no games. To add one:

1. Open the data file and find the `TEMPLATE` comment block near the top.
2. Copy everything between its braces into the `myGames` array below it.
3. Fill `title`, `slug` (unique, URL-safe), `genre`, `shortDescription`, `developer`,
   `publisher`, `priceModel`.
4. Fill the requirement fields **only** from an official source. Leave the literal string
   `'Not specified by developer'` (the `UNSPEC` constant) anywhere the developer does not
   publish a value — never guess.
5. Add `sourceLinks` entries (see below) and a `licenceOrPermissionNote`.
6. Set `requirementsSource`, `imageSource` and `lastVerified` (`YYYY-MM-DD`).

Save, and the game appears immediately — the empty slots shrink to keep each catalogue at 10.
Order in `myGames` is the order shown on the page. A remaining empty slot renders as a visually
distinct "Coming soon" card and is excluded from featured games.

### Adding more than 20 entries

Add more than 10 objects to either `myGames` array; the padding stops once the array is full,
so the grid simply grows. The grids, counters, search, filters and the home page counts are all
derived from the array length, so nothing else needs changing.

### Images

Create `public/images/games/`, put artwork there, and set
`coverImage: './images/games/your-game.webp'` and
`screenshots: [{ url: './images/games/shot-1.webp', alt: 'Descriptive alt text' }]`.
Keep the paths relative (`./`) so they still resolve when the site is hosted under a sub-path.
Leave `coverImage: null` to get the built-in placeholder tile. Images are lazy-loaded and
cropped with `object-fit: cover`. Only use artwork you are licensed to reuse (developer
supplied, official press kit, or an explicit licence) and record where it came from in
`imageSource`.

## Content and copyright rules

These rules are enforced by convention and partly by `npm test`:

- **Never** list pirated ROMs or ISOs, unauthorized torrents or magnet links, cracked APKs,
  re-uploaded paid games, or BIOS/firmware/keys.
- A direct download link may only appear when the rights holder expressly authorizes
  redistribution, or the licence (open-source, public domain, creator-authorized homebrew)
  permits it. Otherwise link the official store or developer page.
- If nothing can be verified, leave `sourceLinks: []` — the detail view then shows
  **Source not verified** and no download action.
- Never invent a title, requirement, price, licence, screenshot or URL.
- For emulator entries, the emulator and the game are separate: link the emulator's official
  site and state that players must supply game files themselves from lawful sources.

`sourceLinks[].kind` controls the label shown next to each link, so an external link is never
mislabelled as a download:

`official-store` · `developer-website` · `authorized-download` · `open-source` ·
`homebrew-source` · `compatibility`

## Project structure

```text
index.html, android-emulators.html, gaming-computers.html
vite.config.js            multi-page build, relative base path
public/favicon.svg
src/
  main.js                 home page
  android-page.js         Android & Emulators entry
  pc-page.js              Gaming Computers entry
  catalog.js              shared grid / search / filter / sort controller
  styles.css              design tokens + all styles
  components/
    chrome.js             nav, footer, "about download links" dialog, HTML escaping
    game-card.js          catalogue card + placeholder card
    game-details.js       detail dialog, requirements, gallery, source links
  utils/search.js         search, filter and sort logic
tests/search.test.mjs     self-check (slot counts, link rules, filtering, sorting)
```

## Deployment

`npm run build` outputs a fully static `dist/`. `vite.config.js` sets `base: './'`, so the
build works from a domain root **or** a sub-path such as GitHub Pages
(`https://user.github.io/repo/`) with no further configuration.

Because every page is a real `.html` file and detail views use the URL hash, direct links and
refreshes work on any static host — no SPA rewrite rules needed.

Upload `dist/` to GitHub Pages, Netlify, Cloudflare Pages, or any static web server.

## Licence and contact

All game names, artwork and trademarks belong to their respective owners. Game Archieves is an
informational catalogue and does not host game files. Replace the placeholder contact address
in `src/components/chrome.js` with a real address for corrections and takedown requests.
