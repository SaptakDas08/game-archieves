# Game Archieves

A minimal, dark, responsive gaming catalogue. Browse games, check screenshots and
system requirements, and find legitimate places to get them.

Built with **Vite + HTML + CSS + vanilla JavaScript**. No backend, no database, no accounts.

## Pages

| Page | File | Contents |
| --- | --- | --- |
| Home | `index.html` | Hero, category cards, featured games, entry explainer, about me |
| Android | `android.html` | 10 catalogue slots, platform-type filters |
| Emulators | `emulators.html` | 10 catalogue slots, entry-type filters |
| Personal Computer | `gaming-computers.html` | 10 catalogue slots, operating-system filters |

Game details open in a hash-linkable dialog (`…/android.html#game=your-game`),
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

All content lives in three plain data files — no layout changes are needed to edit it:

- `src/data/android.js` → `androidGames` (`android-01` … `android-10`)
- `src/data/emulators.js` → `emulatorGames` (`emulator-01` … `emulator-10`)
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
5. Set `price` to whatever the game's publisher asks (`'Free'`, `'$19.99'`, `'₹399'`), copied
   as published. On Android and Personal Computer, set `location` to the store page URL the game
   comes from; it shows under the price as a link when it is an `http(s)` URL, otherwise as plain
   text. Emulator entries have no `location` field.
6. Set `requirementsSource`, `imageSource` and `lastVerified` (`YYYY-MM-DD`).

Save, and the game appears immediately — a slot goes live as soon as it has a `title`. Run
`npm test`: it names any published slot still missing its `lastVerified` date, so a half-filled
entry cannot ship quietly. Order in the list is the order shown on the page, and a slot left as
`{}` renders as a visually distinct "Coming soon" card, excluded from featured games.

### The download section

Each detail dialog ends in a download section named after the file that source hands you:
**Download Torrent** on PC, **Download APK** on Android, **Download ROM** on Emulators. That
name comes from one field, `downloadFormat`, which each data file defaults for its catalogue —
change it per slot when it is wrong (`'Installer'`, `'Play Store install'`, `'ROM (.nes)'`).

Under that heading the section shows the files attached to the slot, then its price and its
location on Android and PC — the store page it comes from, linked when it is an `http(s)` URL,
and absent on emulator entries. The attached
files are still the only download an entry offers: the location link points at the store the
game comes from, never at a mirror, a tracker or a re-upload. A slot with nothing attached
says so plainly.

### Attaching your own files

To hand out a file yourself, drop it in `public/files/` and list it on the slot:

```js
attachments: [{ url: './files/your-game-patch.zip', label: 'Fan translation patch (.zip)' }],
```

Each one appears as a download button at the top of the download section, above the price.
`npm test` requires the path to stay inside `public/files` and the label to be filled in; it
cannot tell what the file contains. **These files are published publicly from this repo, and
they are the only download the site offers, so only attach something you have the right to hand
out** — your own build, patch, config or notes. A game file you do not own (a ROM dump,
somebody else's APK, an ISO, a crack, BIOS, firmware or keys) must never go in here.

### Adding more than 20 entries

Add more objects to either list and the grid simply grows. The grids, counters, search, filters
and the home page counts are all derived from the array length, so nothing else needs changing.

### Edit the "About me" section

It is static markup in `index.html`, in the `<section>` marked `aria-labelledby="about"`.
The paragraph tagged `<!-- EDIT ME -->` is yours to replace; the rest describes where this
catalogue's links go.

The button row below it (`<p class="about-links">`) holds the GitHub link plus a Discord and a
Buy Me a Coffee button. Those two ship **commented out** so no dead link is published: fill in
the invite code and the Buy Me a Coffee name, then delete the three comment-only lines around
them — the `EDIT ME` note, the bare `<!--` and the bare `-->`. Add another service the same way
— copy a link, keep `class="btn btn-ghost"`,
`target="_blank" rel="noopener noreferrer"` and the `sr-only` "opens in a new tab" note.

### Images

Create `public/images/games/`, put artwork there, and set
`coverImage: './images/games/your-game.webp'` and
`screenshots: [{ url: './images/games/shot-1.webp', alt: 'Descriptive alt text' }]`.
The `TEMPLATE` comment has ten numbered screenshot slots ready to uncomment — keep the ones you
use and delete the rest. Until a game has any, its detail dialog shows ten dashed
`Shot 1` … `Shot 10` tiles in the same positions, so you can see which slot is which. A game
can have fewer (or more) than ten; the gallery just renders whatever the list contains.
Keep the paths relative (`./`) so they still resolve when the site is hosted under a sub-path.
Leave `coverImage: null` to get the built-in placeholder tile. Images are lazy-loaded and
cropped with `object-fit: cover`. Only use artwork you are licensed to reuse (developer
supplied, official press kit, or an explicit licence) and record where it came from in
`imageSource`.

## Content and copyright rules

These rules are enforced by convention and partly by `npm test`:

- **Never** list pirated ROMs or ISOs, unauthorized torrents or magnet links, cracked APKs,
  re-uploaded paid games, or BIOS/firmware/keys.
- Never invent a title, requirement, price, screenshot or URL. `price` is whatever the game's
  publisher asks, copied as published.
- The files in `attachments` are the only download the site offers, and they are served from
  this repo, so each one may only be a file you have the right to distribute yourself — your
  own build, patch, config or notes. Never put a game file you do not own in `public/files/`.
  `npm test` keeps the path inside `public/files`, but it cannot see what a file contains.
- For emulator entries, the emulator and the game are separate: players supply the emulator,
  and any game files, BIOS, firmware or keys, themselves from lawful sources.

## Project structure

```text
index.html, android.html, emulators.html, gaming-computers.html
vite.config.js            multi-page build, relative base path
public/favicon.svg
public/files/              files you attach to a slot, served as-is
src/
  main.js                 home page
  android-page.js         Android entry
  emulator-page.js        Emulators entry
  pc-page.js              Personal Computer entry
  catalog.js              shared grid / search / filter / sort controller
  styles.css              design tokens + all styles
  components/
    chrome.js             nav, footer, "about download links" dialog, HTML escaping
    game-card.js          catalogue card + placeholder card
    game-details.js       detail dialog, requirements, gallery, download + source link
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
informational catalogue: the only files it serves are the ones you attach to an entry yourself.

The footer carries no contact address, so corrections and takedown requests have nowhere to go but
this repository. Add one to the footer note in `src/components/chrome.js` when you have an address
you are happy to publish.
