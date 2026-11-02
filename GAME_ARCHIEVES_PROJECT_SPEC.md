# GAME ARCHIEVES — Website Project Specification

> **Purpose:** Build a clean, catchy, minimal gaming catalogue called **Game Archieves**. This document is the source of truth for the coding agent.
>
> **Spelling note:** Use the brand name exactly as **Game Archieves** throughout the website, including the logo text, page titles, footer, and README.

---

## 1. Project overview

Create a responsive gaming discovery and information website that helps visitors browse games, check screenshots and system requirements, and find legitimate places to get them.

The site has **exactly 3 main pages**:

1. **Home** — featured games, a short introduction, and two clear category entry points.
2. **Android & Emulators** — a catalogue with 10 game slots initially.
3. **Gaming Computers** — a catalogue with 10 game slots initially.

That gives the first version **20 catalogue slots total**. Make the catalogue data-driven so more games can be added later without redesigning the pages.

### Main categories

- **Android & Emulators**: Android games, legally distributable emulator homebrew games, and game entries that explain emulator compatibility where relevant.
- **Gaming Computers**: games for Windows, Linux, and macOS computers. Show OS compatibility clearly.

Do not create separate emulator and Android pages in this first version. They belong together in the **Android & Emulators** category.

---

## 2. Important download and copyright rules

Game Archieves must be a **legal game catalogue**, not a piracy or cracked-download site.

### Allowed download/link types

Only show direct downloads, mirrors, APKs, ROMs, torrent files, or magnet links when the developer/publisher or rights holder has explicitly authorized redistribution, or when the files are clearly public-domain/open-source/homebrew and their licence permits redistribution.

Examples of acceptable sources include:

- Official developer or publisher websites.
- Google Play and other official app stores.
- Steam, Epic Games Store, GOG, itch.io, and other legitimate PC stores.
- F-Droid or a developer's official page for open-source Android apps.
- Official emulator websites for emulator software.
- Public-domain, open-source, or creator-authorized homebrew ROM repositories.
- Publisher/developer-hosted torrent files for authorized game releases.

### Do not provide or link

- Pirated commercial game ROMs or ISOs.
- Unauthorized game torrents or magnet links.
- Cracked, modded-to-bypass-payment, or otherwise unauthorized APKs.
- Paid games re-uploaded to third-party file hosts without permission.
- BIOS, firmware, keys, or copyrighted game files that the site is not authorized to distribute.

**Important implementation rule:** Never create fake download buttons or invent download URLs. If redistribution permission is unknown, show an **Official source** or **Store page** link instead of a direct download. If no reliable legal source can be verified, show **Source not verified** and omit the download action.

For emulator entries, explain that users must provide any game files, BIOS, firmware, or keys themselves from lawful sources. Do not bundle copyrighted game files or console firmware with the emulator.

Add a short copyright/contact notice in the footer. Add a simple page section or modal explaining that download links are only listed when a legal source is available. Do not claim that every game is free.

---

## 3. Page map and navigation

Use a consistent top navigation bar on all three pages:

- Logo / wordmark: **GAME ARCHIEVES**
- Home
- Android & Emulators
- Gaming Computers
- Search icon or search field (optional, but preferred)

The active page should be visually clear. On mobile, convert the navigation into a compact menu.

### Page 1 — Home (`/`)

Purpose: introduce the project and direct visitors to the two catalogues.

Recommended sections:

1. **Hero section**
   - Large heading: `Discover. Explore. Play.`
   - Supporting text: `Game Archieves — game details, system requirements, screenshots, and trusted sources in one place.`
   - Primary actions: `Explore Android & Emulators` and `Explore PC Games`.
   - Use one tasteful gaming-themed visual, abstract background, or featured-game artwork with a verified image source.
2. **Browse categories**
   - Two prominent cards: Android & Emulators; Gaming Computers.
   - Show the initial count: `10 entries` for each category.
3. **Featured games**
   - Display up to 4 entries selected from the catalogue data.
   - Never invent titles or artwork. Use placeholders until real records are supplied.
4. **What each game entry includes**
   - Overview, genre, platform, minimum requirements, screenshots, and legal source links.
5. **Footer**
   - Brand name, navigation links, copyright/source note, and contact placeholder.

### Page 2 — Android & Emulators (`/android-emulators`)

Purpose: list 10 initial game slots for Android and lawful emulator/homebrew games.

- Page heading: `Android & Emulators`
- Intro: `Explore mobile games and games that can be enjoyed through compatible emulators.`
- Show **10 game cards** in a responsive grid.
- Include category filters or chips where useful: `All`, `Android`, `Homebrew`, `Emulator-compatible`.
- Each card should show a title, cover image, platform badge, genre, short description, and a `View details` action.
- If a game has an APK download, show it only when the developer or rights holder authorizes that distribution. Otherwise link to its official store/developer page.
- For emulator-compatible games, distinguish the **game** from the **emulator application**. Link to the emulator's official website, not to unauthorized game files.

### Page 3 — Gaming Computers (`/gaming-computers`)

Purpose: list 10 initial game slots for computer games.

- Page heading: `Gaming Computers`
- Intro: `Check PC game details, screenshots, operating-system support, and hardware requirements before you play.`
- Show **10 game cards** in a responsive grid.
- Include platform filters/chips: `All`, `Windows`, `Linux`, `macOS`.
- Each card should show a title, cover image, genre, supported OS badges, short description, and a `View details` action.
- Link to official store or publisher pages. A direct installer or torrent may appear only where redistribution is expressly authorized.

---

## 4. Game cards and game details

Use reusable components. Cards should be consistent across both category pages.

### Game card fields

- Cover image
- Game title
- Platform/category badge
- Genre
- Short description (1–2 lines)
- Optional status badge: `Free`, `Paid`, `Open-source`, `Homebrew`, or `Source unverified` — only when verified
- `View details` link/button

### Game detail view

Use a dedicated detail route or a clean modal/drawer, whichever is simpler and works reliably with the chosen stack. Do not add a fourth top-level navigation page. A detail route such as `/game/example-game` is acceptable as a subpage.

A detail view should contain:

1. Game title and cover image.
2. A short, factual overview.
3. Genre, developer/publisher, release year/date, price model, and supported platforms where verified.
4. **Minimum system requirements**.
5. Recommended requirements when reliably available.
6. Screenshot gallery (prefer 3–5 screenshots where available).
7. Compatibility notes, including emulator and OS notes when relevant.
8. Legal source/download area.
9. Sources and last-verified date.

### Requirements display

For PC games, display available fields such as:

- Minimum OS
- CPU / processor
- RAM
- GPU / graphics card
- DirectX or graphics API, if applicable
- Storage space
- Additional notes

For Android games, display available fields such as:

- Minimum Android version
- Minimum RAM, when published
- Approximate storage requirement, with a note that updates may change it
- Required architecture or device compatibility, if specified
- Controller support, if verified

For emulator/homebrew games, display:

- Game platform / original system
- Compatible emulator(s), with official links
- Known compatibility notes
- Any lawful file/source information

Do not guess missing minimum requirements. Use `Not specified by developer` when a reliable source does not publish a value. Distinguish **official minimum requirements** from **community-tested estimates**.

---

## 5. Screenshots and artwork

- Use screenshots that are supplied by the developer/publisher, available through an authorized press kit, or otherwise licensed for reuse.
- Keep image credits or source links in each game record.
- Do not scrape random images and assume they are reusable.
- Provide a tasteful placeholder image when artwork is unavailable.
- Use consistent image ratios and `object-fit: cover` for cards.
- In the detail view, allow screenshots to open in a larger lightbox/gallery.
- Add descriptive `alt` text for accessibility.
- Optimize images and use lazy loading below the fold.

---

## 6. Visual design direction

The site should look **minimal, modern, clean, and catchy**. Avoid a cluttered arcade aesthetic.

### Visual identity

- Brand: `Game Archieves`
- Mood: modern gaming archive / editorial catalogue.
- Background: very dark charcoal or deep navy.
- Surfaces: slightly lighter charcoal panels.
- Text: off-white with muted grey secondary text.
- Accent: choose one electric blue, cyan, or violet accent and use it consistently.
- Borders: subtle, low-contrast lines.
- Cards: clean, image-led, rounded but not excessively pill-shaped.
- Typography: a bold, distinctive heading font paired with a highly readable body font. Use locally available/system fallbacks if external fonts fail.

### UI details

- Comfortable whitespace and consistent spacing.
- Strong hierarchy: title, subtitle, card title, metadata.
- Subtle hover lift/glow, not distracting animation.
- Clear focus states for keyboard users.
- Smooth but restrained transitions.
- No autoplay audio or video.
- Avoid excessive gradients, neon outlines, giant cursors, or heavy particle effects.
- Design for desktop first but make the mobile layout equally polished.

### Responsive layout

- Desktop: 3–4 cards per row depending on available width.
- Tablet: 2 cards per row.
- Mobile: 1 card per row on narrow screens, 2 only when cards remain readable.
- Avoid horizontal scrolling.
- Ensure navigation, filters, buttons, and screenshots work on touch screens.

---

## 7. Search, filters, and sorting

For the first version, implement client-side search and filters using local catalogue data.

- Search by game title.
- Optional search by genre or platform.
- Filters should work on the relevant category page.
- Add a sort control only if it can be implemented cleanly (e.g. A–Z or recently added).
- Show a useful empty state when no games match the search/filter.
- Add a clear/reset filters action.

Do not add accounts, comments, ratings, user uploads, payments, or a backend in version 1.

---

## 8. Initial catalogue: 20 slots

Create exactly 10 initial entries in each category. Use clearly labelled placeholder data if game titles have not yet been selected. Do not fabricate specifications, screenshots, licences, prices, or download links.

### Android & Emulators — 10 slots

Use stable IDs such as `android-01` through `android-10`.

Each slot should support:

- `id`
- `title`
- `slug`
- `platformType` (`android`, `homebrew`, or `emulator-compatible`)
- `genre`
- `shortDescription`
- `coverImage`
- `screenshots[]`
- `developer`
- `publisher`
- `releaseDate`
- `androidMinimumVersion`
- `minimumRam`
- `storageRequirement`
- `priceModel`
- `emulatorCompatibility[]`
- `sourceLinks[]`
- `downloadType` (`official-store`, `authorized-apk`, `authorized-rom`, `official-emulator`, `none`)
- `licenceOrPermissionNote`
- `requirementsSource`
- `imageSource`
- `lastVerified`

### Gaming Computers — 10 slots

Use stable IDs such as `pc-01` through `pc-10`.

Each slot should support:

- `id`
- `title`
- `slug`
- `genre`
- `shortDescription`
- `coverImage`
- `screenshots[]`
- `developer`
- `publisher`
- `releaseDate`
- `supportedOS[]`
- `minimumOS`
- `minimumCPU`
- `minimumRAM`
- `minimumGPU`
- `graphicsAPI`
- `minimumStorage`
- `recommendedRequirements`
- `priceModel`
- `sourceLinks[]`
- `downloadType` (`official-store`, `authorized-direct-download`, `authorized-torrent`, `none`)
- `licenceOrPermissionNote`
- `requirementsSource`
- `imageSource`
- `lastVerified`

### Placeholder behaviour

- Display a polished `Coming soon` or `Details being added` state for empty slots.
- Do not create fake game names or pretend placeholder entries are real releases.
- Keep the 10 slots per category visible in the catalogue layout, but make empty slots visually distinct from published games.
- Make it easy to replace a placeholder by editing one data object.

---

## 9. Recommended project structure

Use the existing project structure if one already exists. Do not overwrite unrelated files.

A possible structure for a Vite + vanilla JavaScript project:

```text
 game-archieves/
 ├── index.html
 ├── android-emulators.html
 ├── gaming-computers.html
 ├── package.json
 ├── README.md
 ├── public/
 │   ├── images/
 │   │   ├── placeholders/
 │   │   └── games/
 │   └── favicon.svg
 └── src/
     ├── main.js
     ├── styles/
     │   ├── tokens.css
     │   ├── global.css
     │   ├── components.css
     │   └── pages.css
     ├── data/
     │   ├── android-emulators.js
     │   └── gaming-computers.js
     ├── components/
     │   ├── navbar.js
     │   ├── footer.js
     │   ├── game-card.js
     │   ├── game-details.js
     │   ├── search-filter.js
     │   └── screenshot-gallery.js
     └── utils/
         ├── search.js
         └── source-validation.js
```

This is a suggestion, not a requirement. Keep the project simpler if the current setup makes that appropriate.

---

## 10. Technical requirements

Preferred stack:

- Vite
- HTML
- CSS
- Vanilla JavaScript

Use React only if the current project already uses it or there is a clear technical reason. Avoid unnecessary frameworks and dependencies.

Requirements:

- The site must run locally using the project's documented development command.
- All three main pages must work when directly opened/refreshed.
- Navigation links must resolve correctly.
- Use semantic HTML.
- Meet basic accessibility expectations: labels, keyboard navigation, visible focus, contrast, and alt text.
- Keep page performance good; lazy-load below-the-fold images.
- Add a custom favicon and page titles/meta descriptions.
- Do not expose private tokens or secrets in frontend code.
- No database or server is required for version 1.

If deployed to GitHub Pages or another static host, configure Vite's base path and routing so refreshes and nested links work correctly. Prefer simple HTML pages or hash-based/detail routing if that avoids static-hosting 404 problems.

---

## 11. Accuracy and source verification

Game information, platform compatibility, release details, minimum requirements, price model, and download permissions can change.

For every published game entry:

1. Prefer the official developer/publisher page or official store listing.
2. Verify the minimum requirements against an official source where possible.
3. Use a reputable secondary source only when the official source does not publish the information; label it as a secondary/community estimate.
4. Record the source URL and `lastVerified` date in the data.
5. Never invent a value to fill an empty field.
6. Never claim a game is free unless the current official source confirms it.
7. Never claim an APK, ROM, torrent, or direct download is authorized without evidence of permission or a licence that allows redistribution.

The UI should make it clear whether a link is:

- `Official store`
- `Developer website`
- `Authorized direct download`
- `Open-source project`
- `Public-domain / homebrew source`
- `Compatibility information`

Do not label every external link as a download.

---

## 12. Build sequence for the coding agent

Work in small, testable stages. Do not generate the entire project in one opaque step.

### Stage 1 — Inspect and plan

- Inspect the current folder and package files.
- Identify the existing stack and preserve working code.
- Explain the implementation plan and intended file changes.
- Confirm that the 3-page structure and 10 + 10 catalogue slots are represented.

### Stage 2 — Build the design foundation

- Create colour, spacing, typography, radius, and shadow tokens.
- Build the shared navigation and footer.
- Implement responsive layout foundations and accessible interactions.

### Stage 3 — Build the three pages

- Home page with hero, category cards, and featured games.
- Android & Emulators page with 10 data slots.
- Gaming Computers page with 10 data slots.

### Stage 4 — Build reusable catalogue features

- Game cards.
- Search and filters.
- Game detail view.
- Requirements tables.
- Screenshot gallery/lightbox.
- Legal-source/download button rules.

### Stage 5 — Add verified content

- Keep unselected entries as placeholders.
- Populate only games whose factual details and image/source permissions can be checked.
- Record sources and verification dates.
- Do not add pirated ROMs, torrents, or APKs.

### Stage 6 — Test and polish

- Run the development server.
- Test all three pages and direct navigation.
- Test search, filters, empty states, and detail views.
- Test keyboard use and mobile layouts.
- Check missing images, broken links, console errors, and build errors.
- Run the production build and fix all errors.

### Stage 7 — Document deployment

- Update `README.md` with setup, run, build, content-editing, and deployment instructions.
- Explain how to replace a placeholder game by editing its data object.
- Explain how to add more entries without changing the layout.
- Document any static-hosting configuration.

---

## 13. Definition of done

The first version is complete when:

- [ ] The brand appears exactly as **Game Archieves**.
- [ ] There are exactly 3 main pages: Home, Android & Emulators, Gaming Computers.
- [ ] Android & Emulators contains 10 initial slots.
- [ ] Gaming Computers contains 10 initial slots.
- [ ] The homepage links clearly to both categories.
- [ ] Shared navigation and footer work on all pages.
- [ ] Cards show the agreed metadata and a clear placeholder state where data is missing.
- [ ] Game detail views can show minimum requirements, screenshots, and sources.
- [ ] Search and category filters work.
- [ ] Only authorized downloads are linked.
- [ ] No fake download URLs or fabricated requirements are present.
- [ ] The site is responsive and accessible.
- [ ] The production build completes without errors.
- [ ] README explains how to run, edit, and deploy the project.

---

## 14. Master prompt to give Claude

Copy the prompt below after placing this file in the project root.

```text
Read GAME_ARCHIEVES_PROJECT_SPEC.md completely and treat it as the source of truth for this project.

I am building a gaming catalogue website named exactly "Game Archieves".

Before coding:
1. Inspect the existing project and identify its stack.
2. Summarize the website structure: exactly 3 main pages — Home, Android & Emulators, and Gaming Computers.
3. Confirm there will be 10 initial slots in Android & Emulators and 10 initial slots in Gaming Computers.
4. Give me a concise implementation plan and list the files you intend to create or modify.

Then implement the site in stages. Build a polished, minimal, dark, clean, catchy, responsive UI. Use reusable components and data-driven game cards. Include search, filters, game detail views, minimum/recommended system requirements where verified, screenshot galleries, source links, and a clear empty/placeholder state.

IMPORTANT CONTENT RULES:
- Do not provide or link pirated ROMs, commercial game torrents, cracked APKs, unauthorized downloads, or copyrighted BIOS/firmware.
- Only expose direct APK/ROM/torrent/magnet downloads when redistribution is expressly authorized or the licence permits it.
- Otherwise link to the official developer, publisher, or store page.
- Never invent game information, minimum requirements, screenshots, prices, licence permissions, or download URLs.
- Record factual sources and last-verified dates for published entries.

Do not add a database, login system, user uploads, comments, ratings, or payment system in version 1. Keep the project easy to maintain and easy to expand beyond 20 slots.

After implementation, run the project and production build, test all pages and interactions, fix errors, and update README.md with setup, editing, and deployment instructions. Do not stop after writing a plan; proceed with implementation unless a real blocker prevents it.
```

---

**End of specification — Game Archieves**
