// Client-side search + filter + sort over the local catalogue data.

/** Which filter chips a game matches, on either category page. */
export function chipsFor(game) {
  if (game.platformType) return ['all', game.platformType];
  return ['all', ...(game.supportedOS || []).map((os) => os.toLowerCase())];
}

export function matchesQuery(game, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [game.title, game.genre, game.platformType, ...(game.supportedOS || [])]
    .filter(Boolean)
    .some((field) => String(field).toLowerCase().includes(q));
}

export function filterGames(games, { query = '', chip = 'all', sort = 'default' } = {}) {
  const result = games.filter(
    (game) => matchesQuery(game, query) && (chip === 'all' || chipsFor(game).includes(chip)),
  );
  if (sort === 'az') return [...result].sort((a, b) => a.title.localeCompare(b.title));
  return result;
}
