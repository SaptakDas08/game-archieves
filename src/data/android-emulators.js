// Android & Emulators catalogue — 10 slots (android-01 … android-10).
//
// ADD A GAME: copy the TEMPLATE block below into `myGames`, fill it from an
// official source, and save. Empty slots shrink automatically so the catalogue
// always shows 10. Order in `myGames` is the catalogue order.
//
// RULES: never invent a value — use UNSPEC where the developer publishes none.
// Never add a download URL unless the licence or the rights holder expressly
// authorizes redistribution; otherwise link the official store or developer page.
//
// downloadType: 'official-store' | 'authorized-apk' | 'authorized-rom'
//             | 'official-emulator' | 'none'
// sourceLinks[].kind: 'official-store' | 'developer-website' | 'authorized-download'
//                   | 'open-source' | 'homebrew-source' | 'compatibility'

const UNSPEC = 'Not specified by developer';

/* TEMPLATE — copy everything between the braces into myGames:
  {
    id: 'android-01',                   // keep ids unique
    status: 'published',
    title: 'Your Game',
    slug: 'your-game',                  // unique, URL-safe; used in the #game= link
    platformType: 'android',            // 'android' | 'homebrew' | 'emulator-compatible'
    genre: 'Genre',
    shortDescription: 'One or two factual lines.',
    coverImage: null,                   // './images/games/your-game.webp'
    screenshots: [],                    // [{ url: './images/games/shot-1.webp', alt: '…' }]
    developer: UNSPEC,
    publisher: UNSPEC,
    releaseDate: UNSPEC,
    androidMinimumVersion: UNSPEC,
    minimumRam: UNSPEC,
    storageRequirement: UNSPEC,
    priceModel: UNSPEC,
    emulatorCompatibility: [],          // [{ name: 'Emulator', url: 'https://…' }]
    compatibilityNotes: '',
    sourceLinks: [{ kind: 'official-store', label: 'Official store', url: 'https://…' }],
    downloadType: 'none',
    licenceOrPermissionNote: 'Why this link is lawful to show.',
    requirementsSource: 'Where the requirements above came from.',
    imageSource: 'Where the artwork came from.',
    lastVerified: '2026-11-02',         // YYYY-MM-DD
  },
*/

/** Your games. Empty by design — add entries using the template above. */
const myGames = [];

function placeholderSlots(from) {
  return Array.from({ length: Math.max(0, 10 - from) }, (_, i) => {
    const n = from + i + 1;
    return {
      id: `android-${String(n).padStart(2, '0')}`,
      status: 'placeholder',
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
      priceModel: UNSPEC,
      emulatorCompatibility: [],
      compatibilityNotes: '',
      sourceLinks: [],
      downloadType: 'none',
      licenceOrPermissionNote: 'Source not verified.',
      requirementsSource: 'Not verified.',
      imageSource: 'Placeholder artwork.',
      lastVerified: null,
    };
  });
}

export const androidGames = [...myGames, ...placeholderSlots(myGames.length)];
