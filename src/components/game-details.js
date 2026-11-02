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
      ['Original system / platform', game.system || game.androidMinimumVersion],
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

/** Steam-style strip: the tiles scroll sideways and the arrows page through them. */
function strip(tiles, { decorative = false } = {}) {
  const list = decorative
    ? `<ul class="shots shots--empty">${tiles}</ul>`
    : `<ul class="shots" tabindex="0" aria-label="Screenshots">${tiles}</ul>`;
  return `<div class="shots-strip"${decorative ? ' aria-hidden="true"' : ''}>
      <button class="shots-nav" type="button" data-shots="-1" aria-label="Previous screenshots">&lsaquo;</button>
      ${list}
      <button class="shots-nav shots-nav--next" type="button" data-shots="1" aria-label="Next screenshots">&rsaquo;</button>
    </div>`;
}

function gallery(game) {
  if (!game.screenshots?.length) {
    // Decorative skeleton tiles: aria-hidden so the sentence below is what
    // assistive tech reads, not ten empty boxes. Numbered to match the ten
    // commented screenshot slots in the data files, so you can see which is which.
    const tiles = Array.from(
      { length: 10 },
      (_, i) => `<li><span class="shot-ph">Shot ${i + 1}</span></li>`,
    ).join('');
    return `${strip(tiles, { decorative: true })}
      <p class="muted">No screenshots have been supplied by the developer or press kit yet.</p>`;
  }
  return strip(
    game.screenshots
      .map(
        (shot, i) => `<li><button type="button" class="shot" data-lightbox="${i}">
        <img src="${esc(shot.url)}" alt="${esc(shot.alt || `Screenshot ${i + 1} of ${game.title}`)}"
             loading="lazy" decoding="async" />
      </button></li>`,
      )
      .join(''),
  );
}

/** Files kept in this repo (public/files) — the only download an entry offers. */
function attached(game) {
  if (!game.attachments?.length) {
    return `<p class="notice notice--warn">No file has been attached to this entry yet.</p>`;
  }
  return `<ul class="files">${game.attachments
    .map(
      (file) => `<li><a class="btn btn-ghost" href="${esc(file.url)}" download>${esc(
        file.label,
      )}</a></li>`,
    )
    .join('')}</ul>`;
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

    <section><h3>${esc(game.downloadFormat ? `Download ${game.downloadFormat}` : 'Download')}</h3>
      ${attached(game)}
      ${rows([['Price', game.price]])}
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
    wireShots(); // after showModal: the strip has no measurable width until it is laid out
    if (pushHash) history.replaceState(null, '', `#game=${encodeURIComponent(slug)}`);
    dialog.scrollTop = 0;
  }

  // Grey out an arrow once the strip has reached that end, so neither one is ever a dead button.
  function wireShots() {
    const list = dialog.querySelector('.shots');
    if (!list) return;
    const sync = () => {
      const end = list.scrollWidth - list.clientWidth - 1;
      dialog.querySelectorAll('[data-shots]').forEach((btn) => {
        btn.disabled =
          Number(btn.dataset.shots) < 0 ? list.scrollLeft <= 0 : list.scrollLeft >= end;
      });
    };
    list.addEventListener('scroll', sync, { passive: true });
    sync();
  }

  dialog.addEventListener('click', (event) => {
    if (event.target.closest('[data-close-details]')) dialog.close();
    const nav = event.target.closest('[data-shots]');
    if (nav) {
      const list = nav.parentElement.querySelector('.shots');
      list.scrollBy({ left: Number(nav.dataset.shots) * list.clientWidth });
    }
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
