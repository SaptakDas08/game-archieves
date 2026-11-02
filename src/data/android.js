// Android catalogue — 10 slots (android-01 … android-10). Emulator entries live in emulators.js.
//
// ADD A GAME: every slot is editable. Pick one of the ten objects in the list at
// the bottom and fill in the fields you have, copying names from the TEMPLATE.
// A slot goes live as soon as it has a `title`; left as `{}` it stays a reserved
// "Coming soon" card. Anything you omit keeps its placeholder default, so you
// never have to write all the fields. Order in the list is the catalogue order.
//
// RULES: never invent a value — use UNSPEC where the developer publishes none.
// `originalSourceUrl` is the one link an entry shows, and it must point at the place the
// game actually comes from: its official store page, the developer's own site, or the
// project page of an open-source or homebrew title. An APK only counts if the developer
// publishes it there themselves (F-Droid, GitHub releases, their own site). Never an APK
// re-upload site, a mirror or a cracked build.

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
    downloadFormat: 'APK',              // what the source hands you: 'APK', 'Play Store install'
    originalSource: 'Google Play',      // the place the game comes from
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
    downloadFormat: 'APK',
    originalSource: UNSPEC,
    originalSourceUrl: null,
    requirementsSource: 'Not verified.',
    imageSource: 'Placeholder artwork.',
    lastVerified: null,
    ...game,
  };
}

/** The ten slots, in catalogue order — edit any of them in place. */
export const androidGames = [
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
