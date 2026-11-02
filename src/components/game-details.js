import { esc } from './chrome.js';
import { platformLabel, statusBadge } from './game-card.js';

function rows(pairs) {
  return `<dl class="spec-list">${pairs
    .filter(([, value]) => value)
    .map(([label, value]) => `<dt>${esc(label)}</dt><dd>${esc(value)}</dd>`)
    .join('')}</dl>`;
}

function requirements(game) {
  if (game.platformType === 'android') {
    return rows([
      ['Minimum Android version', game.androidMinimumVersion],
      ['Minimum RAM', game.minimumRam],
      ['Storage', game.storageRequirement],
    ]);
  }
  if (game.platformType) {
    return rows([
      ['Original system / platform', game.androidMinimumVersion],
      ['Minimum RAM', game.minimumRam],
      ['Storage', game.storageRequirement],
    ]);
  }
  return rows([
    ['Minimum OS', game.minimumOS],
    ['CPU', game.minimumCPU],
    ['RAM', game.minimumRAM],
    ['GPU', game.minimumGPU],
    ['Graphics API', game.graphicsAPI],
    ['Storage', game.minimumStorage],
    ['Recommended', game.recommendedRequirements],
  ]);
}

function gallery(game) {
  if (!game.screenshots?.length) {
    // Decorative skeleton tiles: aria-hidden so the sentence below is what
    // assistive tech reads, not ten empty boxes. Numbered to match the ten
    // commented screenshot slots in the data files, so you can see which is which.
    return `<ul class="shots shots--empty" aria-hidden="true">
        ${Array.from({ length: 10 }, (_, i) => `<li><span class="shot-ph">Shot ${i + 1}</span></li>`).join('')}
      </ul>
      <p class="muted">No screenshots have been supplied by the developer or press kit yet.</p>`;
  }
  return `<ul class="shots">${game.screenshots
    .map(
      (shot, i) => `<li><button type="button" class="shot" data-lightbox="${i}">
        <img src="${esc(shot.url)}" alt="${esc(shot.alt || `Screenshot ${i + 1} of ${game.title}`)}"
             loading="lazy" decoding="async" />
      </button></li>`,
    )
    .join('')}</ul>`;
}

function originalSource(game) {
  if (!game.originalSourceUrl) {
    return `<p class="notice notice--warn">Source not verified &mdash; no store or download action is shown.</p>`;
  }
  return `<a class="btn btn-ghost" href="${esc(game.originalSourceUrl)}"
      target="_blank" rel="noopener noreferrer">
      Open on ${esc(game.originalSource)}<span class="sr-only"> (opens in a new tab)</span>
    </a>`;
}

export function detailsMarkup(game) {
  const badge = statusBadge(game);
  const emulators = game.emulatorCompatibility || [];
  return `
    <button class="sheet-close" type="button" data-close-details aria-label="Close details">&times;</button>
    <header class="sheet-head">
      <div class="sheet-cover card-cover--placeholder" role="img" aria-label="No artwork supplied for ${esc(
        game.title,
      )}"><span aria-hidden="true">${esc(game.title.slice(0, 2).toUpperCase())}</span></div>
      <div>
        <div class="card-meta">
          <span class="chip">${esc(platformLabel(game))}</span>
          ${badge ? `<span class="chip chip--accent">${esc(badge)}</span>` : ''}
        </div>
        <h2 id="details-title">${esc(game.title)}</h2>
        <p class="muted">${esc(game.shortDescription)}</p>
      </div>
    </header>

    <section><h3>Overview</h3>
      ${rows([
        ['Genre', game.genre],
        ['Developer', game.developer],
        ['Publisher', game.publisher],
        ['Release', game.releaseDate],
        ['Platforms', platformLabel(game)],
      ])}
    </section>

    <section><h3>Minimum requirements</h3>
      ${requirements(game)}
      <p class="muted small">Requirements source: ${esc(game.requirementsSource)}</p>
    </section>

    ${
      emulators.length || game.compatibilityNotes
        ? `<section><h3>Compatibility</h3>
            ${
              emulators.length
                ? `<p>Compatible emulators: ${emulators
                    .map(
                      (e) =>
                        `<a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">${esc(
                          e.name,
                        )}</a>`,
                    )
                    .join(', ')}</p>`
                : ''
            }
            ${game.compatibilityNotes ? `<p class="muted">${esc(game.compatibilityNotes)}</p>` : ''}
          </section>`
        : ''
    }

    <section><h3>Screenshots</h3>${gallery(game)}
      <p class="muted small">Image source: ${esc(game.imageSource)}</p>
    </section>

    <section><h3>Original source</h3>
      ${rows([
        ['Price', game.price],
        ['Available from', game.originalSource],
      ])}
      ${originalSource(game)}
      <p class="muted small">Last verified: ${esc(game.lastVerified || 'not verified')}</p>
    </section>`;
}

/** Hash-linkable details dialog (#game=slug), so a detail view can be shared and refreshed. */
export function mountDetails(games) {
  const dialog = document.createElement('dialog');
  dialog.className = 'sheet details-dialog';
  dialog.setAttribute('aria-labelledby', 'details-title');
  document.body.append(dialog);

  const lightbox = document.createElement('dialog');
  lightbox.className = 'sheet lightbox';
  document.body.append(lightbox);

  let current = null;

  function open(slug, { pushHash = true } = {}) {
    const game = games.find((g) => g.slug === slug && g.status === 'published');
    if (!game) return;
    current = game;
    dialog.innerHTML = detailsMarkup(game);
    if (!dialog.open) dialog.showModal();
    if (pushHash) history.replaceState(null, '', `#game=${encodeURIComponent(slug)}`);
    dialog.scrollTop = 0;
  }

  dialog.addEventListener('click', (event) => {
    if (event.target.closest('[data-close-details]')) dialog.close();
    const shot = event.target.closest('[data-lightbox]');
    if (shot && current) {
      const image = current.screenshots[Number(shot.dataset.lightbox)];
      lightbox.innerHTML = `<form method="dialog">
          <button class="sheet-close" type="submit" aria-label="Close image">&times;</button>
        </form>
        <img src="${esc(image.url)}" alt="${esc(image.alt || current.title)}" />`;
      lightbox.showModal();
    }
  });

  dialog.addEventListener('close', () => {
    if (location.hash.startsWith('#game=')) history.replaceState(null, '', location.pathname);
  });

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-details]');
    if (trigger) open(trigger.dataset.details);
  });

  if (location.hash.startsWith('#game=')) {
    open(decodeURIComponent(location.hash.slice('#game='.length)), { pushHash: false });
  }
}
