// Emulators catalogue — 10 slots (emulator-01 … emulator-10).
//
// ADD A GAME: every slot is editable. Pick one of the ten objects in the list at
// the bottom and fill in the fields you have, copying names from the TEMPLATE.
// A slot goes live as soon as it has a `title`; left as `{}` it stays a reserved
// "Coming soon" card. Anything you omit keeps its placeholder default, so you
// never have to write all the fields. Order in the list is the catalogue order.
//
// RULES: never invent a value — use UNSPEC where the developer publishes none.
// `originalSourceUrl` is the one link an entry shows, and it must point at the place the
// ROM actually comes from: the homebrew author's own page (itch.io, GitHub releases, their
// site) or the rights holder's official re-release. Never a ROM site, a re-upload or a
// mirror — and never BIOS, firmware or keys. The emulator and the game are separate
// things: players supply anything else themselves, from lawful sources.

//
// ATTACHMENTS: `attachments` publishes files out of this repo (drop them in public/files/)
// as extra buttons under the download section. Only attach a file you have the right to
// hand out yourself — your own build, patch, config or notes. Never a game file you do not
// own: no ROM dumps, no APKs of someone else's app, no ISOs, cracks, BIOS, firmware or keys.

const UNSPEC = 'Not specified by developer';

/* TEMPLATE — copy the fields you need into any slot below. `id` and `status` are
   filled in for you; every field is optional and falls back to a placeholder.
  {
    title: 'Your Game',
    slug: 'your-game',                  // unique, URL-safe; used in the #game= link
    platformType: 'homebrew',           // 'homebrew' | 'official-release' | 'emulator-app'
    system: 'NES',                      // the original system the ROM is for
    genre: 'Genre',
    shortDescription: 'One or two factual lines.',
    coverImage: null,                   // './images/games/your-game.webp'
    screenshots: [                      // ten slots — fill the ones you want, delete the rest
      // { url: './images/games/your-game-1.webp', alt: 'What shot 1 shows' },
      // { url: './images/games/your-game-2.webp', alt: 'What shot 2 shows' },
      // { url: './images/games/your-game-3.webp', alt: 'What shot 3 shows' },
      // { url: './images/games/your-game-4.webp', alt: 'What shot 4 shows' },
      // { url: './images/games/your-game-5.webp', alt: 'What shot 5 shows' },
      // { url: './images/games/your-game-6.webp', alt: 'What shot 6 shows' },
      // { url: './images/games/your-game-7.webp', alt: 'What shot 7 shows' },
      // { url: './images/games/your-game-8.webp', alt: 'What shot 8 shows' },
      // { url: './images/games/your-game-9.webp', alt: 'What shot 9 shows' },
      // { url: './images/games/your-game-10.webp', alt: 'What shot 10 shows' },
    ],
    developer: UNSPEC,
    publisher: UNSPEC,
    releaseDate: UNSPEC,
    minimumRam: UNSPEC,
    storageRequirement: UNSPEC,         // ROM file size, if the author publishes it
    price: 'Free',                      // as published, e.g. 'Free', 'Pay what you want'
    downloadFormat: 'ROM',              // what the source hands you: 'ROM', 'ROM (.nes)', 'Installer'
    attachments: [                      // your own files from public/files/, never someone else's game
      // { url: './files/your-game-patch.zip', label: 'What the file is (.zip)' },
    ],
    emulatorCompatibility: [],          // [{ name: 'Emulator', url: 'https://…' }]
    compatibilityNotes: '',
    originalSource: 'itch.io',          // the author's own page, or the official re-release
    originalSourceUrl: 'https://…',     // where that place is
    requirementsSource: 'Where the requirements above came from.',
    imageSource: 'Where the artwork came from.',
    lastVerified: '2026-11-02',         // YYYY-MM-DD — required once the slot is filled
  },
*/

/** Placeholder values for an unfilled slot. Whatever the slot itself sets wins. */
function fillSlot(game, i) {
  const n = i + 1;
  return {
    id: `emulator-${String(n).padStart(2, '0')}`,
    // A slot publishes as soon as it has a title; `npm test` then names it if the
    // lastVerified date is missing, so a half-filled entry can't go out quietly.
    status: game.title ? 'published' : 'placeholder',
    title: `Emulator slot ${n}`,
    slug: `emulator-slot-${n}`,
    platformType: 'homebrew',
    system: UNSPEC,
    genre: UNSPEC,
    shortDescription: 'Details being added. This slot is reserved and has no game assigned yet.',
    coverImage: null,
    screenshots: [],
    developer: UNSPEC,
    publisher: UNSPEC,
    releaseDate: UNSPEC,
    minimumRam: UNSPEC,
    storageRequirement: UNSPEC,
    price: UNSPEC,
    downloadFormat: 'ROM',
    attachments: [],
    emulatorCompatibility: [],
    compatibilityNotes: '',
    originalSource: UNSPEC,
    originalSourceUrl: null,
    requirementsSource: 'Not verified.',
    imageSource: 'Placeholder artwork.',
    lastVerified: null,
    ...game,
  };
}

/** The ten slots, in catalogue order — edit any of them in place. */
export const emulatorGames = [
  {}, // 1
  {}, // 2
  {}, // 3
  {}, // 4
  {}, // 5
  {}, // 6
  {}, // 7
  {}, // 8
  {}, // 9
  {}, // 10
].map(fillSlot);
