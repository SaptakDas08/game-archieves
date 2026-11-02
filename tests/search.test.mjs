// Self-check for the catalogue search/filter/sort logic: node tests/search.test.mjs
import assert from 'node:assert/strict';
import { filterGames, chipsFor, matchesQuery } from '../src/utils/search.js';
import { androidGames } from '../src/data/android-emulators.js';
import { pcGames } from '../src/data/gaming-computers.js';

// --- invariants the real catalogue must always hold, however it is filled in ---

assert.equal(androidGames.length, 10, 'Android & Emulators must have 10 slots');
assert.equal(pcGames.length, 10, 'Gaming Computers must have 10 slots');
assert.equal(new Set([...androidGames, ...pcGames].map((g) => g.slug)).size, 20, 'slugs unique');
assert.equal(new Set([...androidGames, ...pcGames].map((g) => g.id)).size, 20, 'ids unique');

// No fabricated download URLs: a link may only appear with a recorded source entry,
// and no entry may claim an authorized download without a licence note.
for (const game of [...androidGames, ...pcGames]) {
  for (const link of game.sourceLinks) {
    assert.ok(/^https:\/\//.test(link.url), `${game.id}: source links must be https`);
    assert.ok(link.kind && link.label, `${game.id}: source links need a kind and label`);
  }
  if (game.downloadType !== 'none') {
    assert.ok(
      game.licenceOrPermissionNote && !/not verified/i.test(game.licenceOrPermissionNote),
      `${game.id}: a download type requires a permission note`,
    );
  }
  if (game.status === 'published') {
    assert.ok(game.title && game.slug, `${game.id}: a published entry needs a title and slug`);
    assert.ok(game.lastVerified, `${game.id}: a published entry needs a lastVerified date`);
  } else {
    assert.equal(game.sourceLinks.length, 0, `${game.id}: placeholders must not link sources`);
  }
}

// --- search/filter/sort logic, on fixtures so it holds whatever the catalogue contains ---

const fixtures = [
  { title: 'Zebra Quest', genre: 'Strategy', platformType: 'android', status: 'published' },
  { title: 'Alpha Run', genre: 'Platformer', platformType: 'emulator-compatible', status: 'published' },
  { title: 'PC slot 3', genre: 'Not specified by developer', supportedOS: ['Windows', 'Linux'], status: 'placeholder' },
];

assert.deepEqual(chipsFor(fixtures[1]), ['all', 'emulator-compatible']);
assert.deepEqual(chipsFor(fixtures[2]), ['all', 'windows', 'linux']);

assert.ok(matchesQuery(fixtures[0], 'zebra quest'), 'title match is case-insensitive');
assert.ok(matchesQuery(fixtures[0], 'STRATEGY'), 'query matches genre, case-insensitively');
assert.ok(matchesQuery(fixtures[0], '   '), 'blank query matches everything');
assert.equal(matchesQuery(fixtures[0], 'nonexistent-title'), false);

assert.equal(filterGames(fixtures, { chip: 'emulator-compatible' }).length, 1);
assert.equal(filterGames(fixtures, { chip: 'linux' }).length, 1);
assert.equal(filterGames(fixtures, { query: 'zzz' }).length, 0, 'empty state is reachable');

const sorted = filterGames(fixtures, { sort: 'az' }).map((g) => g.title);
assert.deepEqual(sorted, [...sorted].sort((a, b) => a.localeCompare(b)));
assert.equal(fixtures[0].title, 'Zebra Quest', 'sorting must not mutate the source array');

console.log('search/catalogue self-check passed');
