import './styles.css';
import { initCatalogPage } from './catalog.js';
import { emulatorGames } from './data/emulators.js';

initCatalogPage({
  activeKey: 'emulator',
  games: emulatorGames,
  chips: [
    { value: 'all', label: 'All' },
    { value: 'homebrew', label: 'Homebrew' },
    { value: 'official-release', label: 'Official re-release' },
    { value: 'emulator-app', label: 'Emulator app' },
  ],
});
