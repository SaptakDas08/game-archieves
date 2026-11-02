import './styles.css';
import { initCatalogPage } from './catalog.js';
import { pcGames } from './data/gaming-computers.js';

initCatalogPage({
  activeKey: 'pc',
  games: pcGames,
  chips: [
    { value: 'all', label: 'All' },
    { value: 'windows', label: 'Windows' },
    { value: 'linux', label: 'Linux' },
    { value: 'macos', label: 'macOS' },
  ],
});
