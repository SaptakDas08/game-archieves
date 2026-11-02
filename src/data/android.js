// Android catalogue — 10 slots (android-01 … android-10). Emulator entries live in emulators.js.
//
// ADD A GAME: every slot is editable. Pick one of the ten objects in the list at
// the bottom and fill in the fields you have, copying names from the TEMPLATE.
// A slot goes live as soon as it has a `title`; left as `{}` it stays a reserved
// "Coming soon" card. Anything you omit keeps its placeholder default, so you
// never have to write all the fields. Order in the list is the catalogue order.
//
// RULES: never invent a value — use UNSPEC where the developer publishes none. Never invent
// a title, requirement, screenshot or price either; copy the price exactly as published.
//
// LOCATION: `location` is a link out. Point it at the store or developer page the game
// actually comes from, never a mirror, a tracker, a re-upload or a ROM site.
//
// ATTACHMENTS: `attachments` publishes files out of this repo (drop them in public/files/)
// as the download buttons in the download section. Only attach a file you have the right to
// hand out yourself — your own build, patch, config or notes. Never a game file you do not
// own: no ROM dumps, no APKs of someone else's app, no ISOs, cracks, BIOS, firmware or keys.

const UNSPEC = 'Not specified by developer';

/* TEMPLATE — copy the fields you need into any slot below. `id` and `status` are
   filled in for you; every field is optional and falls back to a placeholder.
  {
    title: 'Your Game',
    slug: 'your-game',                  // unique, URL-safe; used in the #game= link
    platformType: 'android',            // 'android' | 'homebrew'
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
    androidMinimumVersion: UNSPEC,
    minimumRam: UNSPEC,
    storageRequirement: UNSPEC,
    price: 'Free',                      // as published, e.g. 'Free', '$4.99', '₹399'
    location: UNSPEC,                   // store page URL, e.g. 'https://play.google.com/store/apps/details?id=…'
    downloadFormat: 'APK',              // what the source hands you: 'APK', 'Play Store install'
    attachments: [                      // your own files from public/files/, never someone else's game
      // { url: './files/your-game-patch.zip', label: 'What the file is (.zip)' },
    ],
    requirementsSource: 'Where the requirements above came from.',
    imageSource: 'Where the artwork came from.',
    lastVerified: '2026-11-02',         // YYYY-MM-DD — required once the slot is filled
  },
*/

/** Placeholder values for an unfilled slot. Whatever the slot itself sets wins. */
function fillSlot(game, i) {
  const n = i + 1;
  return {
    id: `android-${String(n).padStart(2, '0')}`,
    // A slot publishes as soon as it has a title; `npm test` then names it if the
    // lastVerified date is missing, so a half-filled entry can't go out quietly.
    status: game.title ? 'published' : 'placeholder',
    title: `Android slot ${n}`,
    slug: `android-slot-${n}`,
    platformType: 'android',
    genre: UNSPEC,
    shortDescription: 'Details being added. This slot is reserved and has no game assigned yet.',
    coverImage: null,
    screenshots: [],
    developer: UNSPEC,
    publisher: UNSPEC,
    releaseDate: UNSPEC,
    androidMinimumVersion: UNSPEC,
    minimumRam: UNSPEC,
    storageRequirement: UNSPEC,
    price: UNSPEC,
    location: UNSPEC,
    downloadFormat: 'APK',
    attachments: [],
    requirementsSource: 'Not verified.',
    imageSource: 'Placeholder artwork.',
    lastVerified: null,
    ...game,
  };
}

/** The ten slots, in catalogue order — edit any of them in place. */
export const androidGames = [
  // TEST DATA — three sample slots so the page is not empty. Delete them when real games go in.
  {
    title: 'Test Android Entry 1',
    slug: 'test-android-1',
    genre: 'Test data',
    shortDescription: 'Sample entry used to check the layout. Not a real game.',
    developer: 'Test data',
    publisher: 'Test data',
    price: 'Free',
    location: 'https://example.com/store/test-android-1',
    lastVerified: '2026-11-02',
  }, // 1
  {
    title: 'Test Android Entry 2',
    slug: 'test-android-2',
    genre: 'Test data',
    shortDescription: 'Sample paid entry, to check how a price reads. Not a real game.',
    developer: 'Test data',
    publisher: 'Test data',
    price: '$4.99',
    location: 'https://example.com/store/test-android-2',
    lastVerified: '2026-11-02',
  }, // 2
  {
    title: 'Test Android Entry 3',
    slug: 'test-android-3',
    platformType: 'homebrew',
    genre: 'Test data',
    shortDescription: 'Sample homebrew entry, to check the platform filter. Not a real game.',
    developer: 'Test data',
    price: 'Free (open-source)',
    location: 'https://example.com/project/test-android-3',
    lastVerified: '2026-11-02',
  }, // 3
  {}, // 4
  {}, // 5
  {}, // 6
  {}, // 7
  {}, // 8
  {}, // 9
  {}, // 10
].map(fillSlot);
