// Controller shared by both category pages: renders the grid, search, filter
// chips, sort and the empty state over a local data array.
import { renderChrome } from './components/chrome.js';
import { gameCard } from './components/game-card.js';
import { mountDetails } from './components/game-details.js';
import { filterGames } from './utils/search.js';

export function initCatalogPage({ activeKey, games, chips }) {
  renderChrome(activeKey);
  mountDetails(games);

  const grid = document.querySelector('[data-grid]');
  const status = document.querySelector('[data-result-status]');
  const search = document.querySelector('[data-search]');
  const sort = document.querySelector('[data-sort]');
  const chipBar = document.querySelector('[data-chips]');
  const reset = document.querySelector('[data-reset]');

  chipBar.innerHTML = chips
    .map(
      (chip, i) =>
        `<button class="chip chip--button" type="button" role="radio" data-chip="${chip.value}"
          aria-checked="${i === 0}">${chip.label}</button>`,
    )
    .join('');

  const state = { query: '', chip: 'all', sort: 'default' };
  let firstRender = true;

  function render() {
    const visible = filterGames(games, state);
    grid.innerHTML = visible.map(gameCard).join('');
    // Entrance stagger on the first paint only: the grid is rebuilt on every keystroke
    // and replaying the animation there would be noise, not polish.
    grid.classList.toggle('grid--enter', firstRender);
    firstRender = false;

    const empty = visible.length === 0;
    grid.hidden = empty;
    status.textContent = empty
      ? `No games match ${state.query ? `"${state.query}"` : 'this filter'}. Try clearing the filters.`
      : `${visible.length} of ${games.length} slots shown.`;
    status.classList.toggle('empty-state', empty);
    reset.hidden = state.query === '' && state.chip === 'all' && state.sort === 'default';
  }

  search.addEventListener('input', () => {
    state.query = search.value;
    render();
  });
  sort.addEventListener('change', () => {
    state.sort = sort.value;
    render();
  });
  chipBar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-chip]');
    if (!button) return;
    state.chip = button.dataset.chip;
    chipBar
      .querySelectorAll('[data-chip]')
      .forEach((el) => el.setAttribute('aria-checked', String(el === button)));
    render();
  });
  reset.addEventListener('click', () => {
    state.query = '';
    state.chip = 'all';
    state.sort = 'default';
    search.value = '';
    sort.value = 'default';
    chipBar
      .querySelectorAll('[data-chip]')
      .forEach((el, i) => el.setAttribute('aria-checked', String(i === 0)));
    render();
    search.focus();
  });

  render();
}
