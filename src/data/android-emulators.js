// Android & Emulators catalogue — 10 slots (android-01 … android-10).
//
// EDITING: to publish a placeholder slot, set status:'published' and fill the
// fields from an official source. Never invent a value — use the string
// 'Not specified by developer' instead, and never add a download URL unless the
// licence or the rights holder expressly authorizes redistribution.
//
// downloadType: 'official-store' | 'authorized-apk' | 'authorized-rom'
//             | 'official-emulator' | 'none'
// sourceLinks[].kind: 'official-store' | 'developer-website' | 'authorized-download'
//                   | 'open-source' | 'homebrew-source' | 'compatibility'

const UNSPEC = 'Not specified by developer';

function placeholderSlots() {
  return [7, 8, 9, 10].map((n) => ({
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
  }));
}

export const androidGames = [
  {
    id: 'android-01',
    status: 'published',
    title: 'Shattered Pixel Dungeon',
    slug: 'shattered-pixel-dungeon',
    platformType: 'android',
    genre: 'Roguelike RPG',
    shortDescription:
      'An open-source traditional roguelike dungeon crawler, developed as an expanded take on Pixel Dungeon.',
    coverImage: null,
    screenshots: [],
    developer: 'Shattered Pixel',
    publisher: 'Shattered Pixel',
    releaseDate: UNSPEC,
    androidMinimumVersion: UNSPEC,
    minimumRam: UNSPEC,
    storageRequirement: UNSPEC,
    priceModel: 'Open-source (GPLv3). Store pricing varies — check the official page.',
    emulatorCompatibility: [],
    compatibilityNotes: '',
    sourceLinks: [
      { kind: 'developer-website', label: 'Developer website', url: 'https://shatteredpixel.com/' },
      {
        kind: 'open-source',
        label: 'Open-source project',
        url: 'https://github.com/00-Evan/shattered-pixel-dungeon',
      },
    ],
    downloadType: 'none',
    licenceOrPermissionNote:
      'Source code is released under the GPLv3. Game Archieves links to the developer and the official repository rather than hosting builds.',
    requirementsSource: 'Not verified — check the official page for current requirements.',
    imageSource: 'No press-kit artwork supplied; placeholder shown.',
    lastVerified: '2026-11-02',
  },
  {
    id: 'android-02',
    status: 'published',
    title: 'Mindustry',
    slug: 'mindustry',
    platformType: 'android',
    genre: 'Tower defence / factory automation',
    shortDescription:
      'A factory-building and tower-defence game where you mine resources, automate supply chains and defend your base.',
    coverImage: null,
    screenshots: [],
    developer: 'Anuke',
    publisher: 'AnukenDev',
    releaseDate: UNSPEC,
    androidMinimumVersion: UNSPEC,
    minimumRam: UNSPEC,
    storageRequirement: UNSPEC,
    priceModel: 'Open-source (GPLv3). Store pricing varies — check the official page.',
    emulatorCompatibility: [],
    compatibilityNotes: '',
    sourceLinks: [
      {
        kind: 'developer-website',
        label: 'Developer website',
        url: 'https://mindustrygame.github.io/',
      },
      { kind: 'open-source', label: 'Open-source project', url: 'https://github.com/Anuken/Mindustry' },
    ],
    downloadType: 'none',
    licenceOrPermissionNote:
      'Source is GPLv3. Official builds are distributed by the developer; Game Archieves links to them instead of mirroring files.',
    requirementsSource: 'Not verified — check the official page for current requirements.',
    imageSource: 'No press-kit artwork supplied; placeholder shown.',
    lastVerified: '2026-11-02',
  },
  {
    id: 'android-03',
    status: 'published',
    title: "Simon Tatham's Portable Puzzle Collection",
    slug: 'simon-tatham-portable-puzzle-collection',
    platformType: 'android',
    genre: 'Puzzle collection',
    shortDescription:
      'A collection of small one-player logic puzzle games, available for Android as well as desktop systems.',
    coverImage: null,
    screenshots: [],
    developer: 'Simon Tatham',
    publisher: 'Simon Tatham',
    releaseDate: UNSPEC,
    androidMinimumVersion: UNSPEC,
    minimumRam: UNSPEC,
    storageRequirement: UNSPEC,
    priceModel: 'Open-source (MIT licence).',
    emulatorCompatibility: [],
    compatibilityNotes: '',
    sourceLinks: [
      {
        kind: 'developer-website',
        label: 'Developer website',
        url: 'https://www.chiark.greenend.org.uk/~sgtatham/puzzles/',
      },
    ],
    downloadType: 'none',
    licenceOrPermissionNote:
      'Released under the MIT licence by the author. Links point to the author’s own page.',
    requirementsSource: 'Not verified — check the official page for current requirements.',
    imageSource: 'No press-kit artwork supplied; placeholder shown.',
    lastVerified: '2026-11-02',
  },
  {
    id: 'android-04',
    status: 'published',
    title: 'SuperTuxKart (Android)',
    slug: 'supertuxkart-android',
    platformType: 'android',
    genre: 'Kart racing',
    shortDescription:
      'A free and open-source 3D kart racing game with single-player, split-screen and online modes.',
    coverImage: null,
    screenshots: [],
    developer: 'SuperTuxKart Team',
    publisher: 'SuperTuxKart Team',
    releaseDate: UNSPEC,
    androidMinimumVersion: UNSPEC,
    minimumRam: UNSPEC,
    storageRequirement: UNSPEC,
    priceModel: 'Free and open-source (GPLv3).',
    emulatorCompatibility: [],
    compatibilityNotes:
      'Also available for Windows, Linux and macOS — see the Gaming Computers catalogue.',
    sourceLinks: [
      { kind: 'developer-website', label: 'Developer website', url: 'https://supertuxkart.net/' },
      {
        kind: 'open-source',
        label: 'Open-source project',
        url: 'https://github.com/supertuxkart/stk-code',
      },
    ],
    downloadType: 'none',
    licenceOrPermissionNote: 'GPLv3. Official builds are published by the project team.',
    requirementsSource: 'Not verified — check the official page for current requirements.',
    imageSource: 'No press-kit artwork supplied; placeholder shown.',
    lastVerified: '2026-11-02',
  },
  {
    id: 'android-05',
    status: 'published',
    title: 'OpenTTD (Android)',
    slug: 'openttd-android',
    platformType: 'android',
    genre: 'Business simulation',
    shortDescription:
      'An open-source transport-business simulation game, rebuilt from the ground up and playable on Android.',
    coverImage: null,
    screenshots: [],
    developer: 'OpenTTD Team',
    publisher: 'OpenTTD Team',
    releaseDate: UNSPEC,
    androidMinimumVersion: UNSPEC,
    minimumRam: UNSPEC,
    storageRequirement: UNSPEC,
    priceModel: 'Free and open-source (GPLv2).',
    emulatorCompatibility: [],
    compatibilityNotes:
      'OpenTTD ships with free replacement graphics and sound sets. Original Transport Tycoon Deluxe data files are not distributed and must be supplied lawfully by the player if preferred.',
    sourceLinks: [
      { kind: 'developer-website', label: 'Developer website', url: 'https://www.openttd.org/' },
      { kind: 'open-source', label: 'Open-source project', url: 'https://github.com/OpenTTD/OpenTTD' },
    ],
    downloadType: 'none',
    licenceOrPermissionNote: 'GPLv2. Builds are published by the OpenTTD project.',
    requirementsSource: 'Not verified — check the official page for current requirements.',
    imageSource: 'No press-kit artwork supplied; placeholder shown.',
    lastVerified: '2026-11-02',
  },
  {
    id: 'android-06',
    status: 'published',
    title: 'Micro Mages',
    slug: 'micro-mages',
    platformType: 'emulator-compatible',
    genre: 'Platformer',
    shortDescription:
      'A modern homebrew NES platformer for up to four players, sold directly by its developer for real hardware and emulators.',
    coverImage: null,
    screenshots: [],
    developer: 'Morphcat Games',
    publisher: 'Morphcat Games',
    releaseDate: UNSPEC,
    androidMinimumVersion: 'Not applicable — NES title played through an emulator.',
    minimumRam: UNSPEC,
    storageRequirement: UNSPEC,
    priceModel: 'Paid — purchase from the developer.',
    emulatorCompatibility: [
      { name: 'Mesen', url: 'https://www.mesen.ca/' },
      { name: 'FCEUX', url: 'https://fceux.com/' },
    ],
    compatibilityNotes:
      'Original system: Nintendo Entertainment System. Buy the ROM from the developer, then run it in an accurate NES emulator. Game Archieves does not host or link game files, BIOS or firmware — you must supply those lawfully yourself.',
    sourceLinks: [
      { kind: 'homebrew-source', label: 'Developer website', url: 'https://morphcat.de/micromages/' },
    ],
    downloadType: 'none',
    licenceOrPermissionNote:
      'Commercial homebrew. Only the developer may distribute the ROM; purchase it from them.',
    requirementsSource: 'Not verified — check the official page for current requirements.',
    imageSource: 'No press-kit artwork supplied; placeholder shown.',
    lastVerified: '2026-11-02',
  },
  ...placeholderSlots(),
];
