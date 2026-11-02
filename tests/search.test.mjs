// Self-check for the catalogue search/filter/sort logic: node tests/search.test.mjs
import assert from 'node:assert/strict';
import { filterGames, chipsFor, matchesQuery } from '../src/utils/search.js';
import { androidGames } from '../src/data/android.js';
import { emulatorGames } from '../src/data/emulators.js';
import { pcGames } from '../src/data/gaming-computers.js';

const catalogue = [...androidGames, ...emulatorGames, ...pcGames];

// --- invariants the real catalogue must always hold, however it is filled in ---

assert.equal(androidGames.length, 10, 'Android must have 10 slots');
assert.equal(emulatorGames.length, 10, 'Emulators must have 10 slots');
assert.equal(pcGames.length, 10, 'Gaming Computers must have 10 slots');
assert.equal(new Set(catalogue.map((g) => g.slug)).size, 30, 'slugs unique');
assert.equal(new Set(catalogue.map((g) => g.id)).size, 30, 'ids unique');

// The download sections are named after a file type, so the link must never be a tracker or
// a re-upload. shortcut: a substring denylist catches the obvious hosts only — if entries
// ever stop being hand-written, check the host against an allowlist of known sources instead.
const BANNED = ['1337x', 'piratebay', 'rarbg', 'fitgirl', 'skidrow', 'igg-games',
  'emuparadise', 'romsmania', 'coolrom', 'apkpure', 'apkmirror', 'aptoide'];

// No fabricated source URLs: a link may only appear alongside the name of the place it
// points at, and an unfilled slot may never link anywhere.
for (const game of catalogue) {
  if (game.originalSourceUrl) {
    assert.ok(
      /^https:\/\//.test(game.originalSourceUrl),
      `${game.id}: the original source must be an https URL`,
    );
    const host = new URL(game.originalSourceUrl).hostname.toLowerCase();
    assert.ok(
      !BANNED.some((banned) => host.includes(banned)),
      `${game.id}: ${host} is a re-upload or tracker, not the place the game comes from`,
    );
    assert.ok(
      game.originalSource && !/not specified/i.test(game.originalSource),
      `${game.id}: a source URL needs the name of the place it points at`,
    );
  }
  if (game.status === 'published') {
    assert.ok(game.title && game.slug, `${game.id}: a published entry needs a title and slug`);
    assert.ok(game.lastVerified, `${game.id}: a published entry needs a lastVerified date`);
  } else {
    assert.equal(game.originalSourceUrl, null, `${game.id}: placeholders must not link a source`);
  }
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
