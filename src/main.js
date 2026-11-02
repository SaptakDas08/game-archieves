// Home page: hero, category cards and featured entries from the catalogue data.
import './styles.css';
import { renderChrome, esc } from './components/chrome.js';
import { gameCard } from './components/game-card.js';
import { mountDetails } from './components/game-details.js';
import { androidGames } from './data/android-emulators.js';
import { pcGames } from './data/gaming-computers.js';

const all = [...androidGames, ...pcGames];
renderChrome('home');
mountDetails(all);

const featured = all.filter((game) => game.status === 'published').slice(0, 4);
const grid = document.querySelector('[data-featured]');
grid.classList.add('grid--enter'); // rendered once, so the entrance stagger never replays
grid.innerHTML = featured.length
  ? featured.map(gameCard).join('')
  : `<p class="muted">Featured entries appear here once catalogue records are published.</p>`;

document.querySelectorAll('[data-count]').forEach((el) => {
  const key = el.dataset.count;
  el.textContent = `${(key === 'android' ? androidGames : pcGames).length} entries`;
});

document.querySelector('[data-year]').textContent = esc(new Date().getFullYear());
