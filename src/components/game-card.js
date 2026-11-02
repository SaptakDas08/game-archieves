import { esc } from './chrome.js';

/** Badge derived from the recorded price — never invented. */
export function statusBadge(game) {
  if (game.status !== 'published') return null;
  const price = String(game.price || '');
  if (/open-source/i.test(price)) return 'Open-source';
  if (/^free/i.test(price)) return 'Free';
  if (/^paid/i.test(price)) return 'Paid';
  return null;
}

export function platformLabel(game) {
  if (game.platformType) {
    return (
      {
        android: 'Android',
        homebrew: 'Homebrew',
        'official-release': 'Official re-release',
        'emulator-app': 'Emulator app',
      }[game.platformType] || game.platformType
    );
  }
  return (game.supportedOS || []).join(' · ') || 'Platform not specified';
}

function cover(game) {
  if (game.coverImage) {
    return `<img class="card-cover" src="${esc(game.coverImage)}" alt="Cover artwork for ${esc(
      game.title,
    )}" loading="lazy" decoding="async" />`;
  }
  const initials = game.status === 'published' ? esc(game.title.slice(0, 2).toUpperCase()) : '?';
  return `<div class="card-cover card-cover--placeholder" role="img"
    aria-label="${
      game.status === 'published'
        ? `No artwork supplied for ${esc(game.title)}`
        : 'Empty catalogue slot'
    }"><span aria-hidden="true">${initials}</span></div>`;
}

export function gameCard(game) {
  if (game.status !== 'published') {
    return `<article class="card card--empty" aria-label="${esc(game.title)}: empty slot">
      ${cover(game)}
      <div class="card-body">
        <p class="chip chip--muted">Coming soon</p>
        <h3 class="card-title">${esc(game.title)}</h3>
        <p class="card-desc muted">${esc(game.shortDescription)}</p>
      </div>
    </article>`;
  }

  const badge = statusBadge(game);
  return `<article class="card">
    ${cover(game)}
    <div class="card-body">
      <div class="card-meta">
        <span class="chip">${esc(platformLabel(game))}</span>
        ${badge ? `<span class="chip chip--accent">${esc(badge)}</span>` : ''}
      </div>
      <h3 class="card-title">${esc(game.title)}</h3>
      <p class="card-genre muted">${esc(game.genre)}</p>
      <p class="card-desc">${esc(game.shortDescription)}</p>
      <button class="btn btn-ghost card-action" type="button" data-details="${esc(game.slug)}">
        View details<span class="sr-only"> for ${esc(game.title)}</span>
      </button>
    </div>
  </article>`;
}
