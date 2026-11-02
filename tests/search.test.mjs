// Self-check for the catalogue search/filter/sort logic: node tests/search.test.mjs
import assert from 'node:assert/strict';
import { filterGames, chipsFor, matchesQuery } from '../src/utils/search.js';
import { androidGames } from '../src/data/android-emulators.js';
import { pcGames } from '../src/data/gaming-computers.js';

assert.equal(androidGames.length, 10, 'Android & Emulators must have 10 slots');
assert.equal(pcGames.length, 10, 'Gaming Computers must have 10 slots');
assert.equal(new Set([...androidGames, ...pcGames].map((g) => g.slug)).size, 20, 'slugs unique');

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
  if (game.status !== 'published') {
    assert.equal(game.sourceLinks.length, 0, `${game.id}: placeholders must not link sources`);
  }
}

assert.deepEqual(chipsFor(androidGames[5]), ['all', 'emulator-compatible']);
assert.deepEqual(chipsFor(pcGames[0]), ['all', 'windows', 'linux', 'macos']);

assert.ok(matchesQuery(pcGames[0], '0 a.d.'));
assert.ok(matchesQuery(pcGames[0], 'STRATEGY'), 'query matches genre, case-insensitively');
assert.ok(matchesQuery(pcGames[0], '   '), 'blank query matches everything');
assert.equal(matchesQuery(pcGames[0], 'nonexistent-title'), false);

assert.equal(filterGames(androidGames, { chip: 'emulator-compatible' }).length, 1);
assert.equal(filterGames(pcGames, { chip: 'linux' }).length, 6, 'only published PC slots list an OS');
assert.equal(filterGames(pcGames, { query: 'zzz' }).length, 0, 'empty state is reachable');

const sorted = filterGames(pcGames, { sort: 'az' }).map((g) => g.title);
assert.deepEqual(sorted, [...sorted].sort((a, b) => a.localeCompare(b)));
assert.equal(pcGames[0].title, '0 A.D.', 'sorting must not mutate the source array');

console.log('search/catalogue self-check passed');
