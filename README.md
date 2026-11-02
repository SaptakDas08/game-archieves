# Game Archieves

A minimal, dark, responsive gaming catalogue. Browse games, check screenshots and
system requirements, and find legitimate places to get them.

Built with **Vite + HTML + CSS + vanilla JavaScript**. No backend, no database, no accounts.

## Pages

| Page | File | Contents |
| --- | --- | --- |
| Home | `index.html` | Hero, category cards, featured games, entry explainer, about me |
| Android & Emulators | `android-emulators.html` | 10 catalogue slots, platform-type filters |
| Gaming Computers | `gaming-computers.html` | 10 catalogue slots, operating-system filters |

Game details open in a hash-linkable dialog (`…/android-emulators.html#game=your-game`),
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

Both catalogues ship **empty** — 10 reserved slots each, no games. Every slot is editable
in place:

1. Open the data file. At the bottom is a list of ten `{}` objects, one per slot.
2. Pick any one and fill in the fields you have, copying their names from the `TEMPLATE`
   comment just above. `id` and `status` are filled in for you.
3. Anything you leave out keeps its placeholder value, so the smallest useful entry is a
   `title`, a `slug` (unique, URL-safe) and a `shortDescription`.
4. Fill the requirement fields **only** from an official source. Leave the literal string
   `'Not specified by developer'` (the `UNSPEC` constant) anywhere the developer does not
   publish a value — never guess.
5. Set `price` to whatever the source publishes (`'Free'`, `'$19.99'`, `'₹399'`), and set
   `originalSource` / `originalSourceUrl` to the place it comes from (see below).
6. Set `requirementsSource`, `imageSource` and `lastVerified` (`YYYY-MM-DD`).

Save, and the game appears immediately — a slot goes live as soon as it has a `title`. Run
`npm test`: it names any published slot still missing its `lastVerified` date, so a half-filled
entry cannot ship quietly. Order in the list is the order shown on the page, and a slot left as
`{}` renders as a visually distinct "Coming soon" card, excluded from featured games.

### Adding more than 20 entries

Add more objects to either list and the grid simply grows. The grids, counters, search, filters
and the home page counts are all derived from the array length, so nothing else needs changing.

### Edit the "About me" section

It is static markup in `index.html`, in the `<section>` marked `aria-labelledby="about"`.
The paragraph tagged `<!-- EDIT ME -->` is yours to replace; the rest describes where this
catalogue's links go.

The button row below it (`<p class="about-links">`) holds the GitHub link plus a Discord and a
Buy Me a Coffee button. Those two ship **commented out** so no dead link is published: fill in
the invite code and the Buy Me a Coffee name, then delete the `<!-- EDIT ME …` line and the
`-->` after them. Add another service the same way — copy a link, keep `class="btn btn-ghost"`,
`target="_blank" rel="noopener noreferrer"` and the `sr-only` "opens in a new tab" note.

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
- Each entry shows exactly one link, `originalSourceUrl`, and it must point at the place the
  game actually comes from: its official store page, the developer's own site, or the project
  page of an open-source or homebrew title. Never a re-upload or a mirror.
- If no such place can be confirmed, leave `originalSourceUrl: null` — the detail view then
  shows **Source not verified** and no link. `npm test` also rejects a non-https URL, and a URL
  without an `originalSource` name to go with it.
- Never invent a title, requirement, price, screenshot or URL. `price` is whatever that source
  publishes, copied as published.
- For emulator entries, the emulator and the game are separate: link the emulator's official
  site and state that players must supply game files themselves from lawful sources.

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
