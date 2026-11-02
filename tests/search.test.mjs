// Self-check for the catalogue search/filter/sort logic: node tests/search.test.mjs
import assert from 'node:assert/strict';
import { filterGames, chipsFor, matchesQuery } from '../src/utils/search.js';
import { detailsMarkup } from '../src/components/game-details.js';
import { androidGames } from '../src/data/android.js';
import { emulatorGames } from '../src/data/emulators.js';
import { pcGames } from '../src/data/gaming-computers.js';

const catalogue = [...androidGames, ...emulatorGames, ...pcGames];

// --- invariants the real catalogue must always hold, however it is filled in ---

assert.equal(androidGames.length, 10, 'Android must have 10 slots');
assert.equal(emulatorGames.length, 10, 'Emulators must have 10 slots');
assert.equal(pcGames.length, 10, 'Personal Computer must have 10 slots');
assert.equal(new Set(catalogue.map((g) => g.slug)).size, 30, 'slugs unique');
assert.equal(new Set(catalogue.map((g) => g.id)).size, 30, 'ids unique');

// Emulator entries deliberately carry no location, so no link out renders on that page.
assert.ok(
  emulatorGames.every((g) => g.location === undefined),
  'emulator slots must not have a location field',
);

for (const game of catalogue) {
  // Attachments are the only download an entry offers, so the path must stay inside
  // public/files (no off-site URL, no ../ escape) and say what the file is. Whether the file
  // may lawfully be there is on whoever adds it.
  for (const file of game.attachments) {
    assert.ok(
      /^\.\/files\/[\w.-]+$/.test(file.url),
      `${game.id}: an attachment must be a file in public/files, not ${file.url}`,
    );
    assert.ok(file.label, `${game.id}: ${file.url} needs a label saying what the file is`);
  }
  if (game.status === 'published') {
    assert.ok(game.title && game.slug, `${game.id}: a published entry needs a title and slug`);
    assert.ok(game.lastVerified, `${game.id}: a published entry needs a lastVerified date`);
  } else {
    assert.equal(game.attachments.length, 0, `${game.id}: placeholders must not attach files`);
  }
}

// --- `location` is the one link an entry renders, so only http(s) may reach an href ---

const linked = detailsMarkup({ title: 'T', location: 'https://store.steampowered.com/app/1/' });
assert.ok(
  linked.includes(
    '<a href="https://store.steampowered.com/app/1/" target="_blank" rel="noopener noreferrer">',
  ),
  'a store URL in location must render as a new-tab link',
);
for (const hostile of ['javascript:alert(1)', 'data:text/html,<script>x</script>', 'Steam']) {
  const markup = detailsMarkup({ title: 'T', location: hostile });
  assert.ok(!markup.includes('<a '), `location ${hostile} must stay plain text, not a link`);
}

// --- search/filter/sort logic, on fixtures so it holds whatever the catalogue contains ---

const fixtures = [
  { title: 'Zebra Quest', genre: 'Strategy', platformType: 'android', status: 'published' },
  { title: 'Alpha Run', genre: 'Platformer', platformType: 'official-release', status: 'published' },
  { title: 'PC slot 3', genre: 'Not specified by developer', supportedOS: ['Windows', 'Linux'], status: 'placeholder' },
];

assert.deepEqual(chipsFor(fixtures[1]), ['all', 'official-release']);
assert.deepEqual(chipsFor(fixtures[2]), ['all', 'windows', 'linux']);

assert.ok(matchesQuery(fixtures[0], 'zebra quest'), 'title match is case-insensitive');
assert.ok(matchesQuery(fixtures[0], 'STRATEGY'), 'query matches genre, case-insensitively');
assert.ok(matchesQuery(fixtures[0], '   '), 'blank query matches everything');
assert.equal(matchesQuery(fixtures[0], 'nonexistent-title'), false);

assert.equal(filterGames(fixtures, { chip: 'official-release' }).length, 1);
assert.equal(filterGames(fixtures, { chip: 'linux' }).length, 1);
assert.equal(filterGames(fixtures, { query: 'zzz' }).length, 0, 'empty state is reachable');

const sorted = filterGames(fixtures, { sort: 'az' }).map((g) => g.title);
assert.deepEqual(sorted, [...sorted].sort((a, b) => a.localeCompare(b)));
assert.equal(fixtures[0].title, 'Zebra Quest', 'sorting must not mutate the source array');

console.log('search/catalogue self-check passed');
