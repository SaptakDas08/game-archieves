import './styles.css';
import { initCatalogPage } from './catalog.js';
import { androidGames } from './data/android-emulators.js';

initCatalogPage({
  activeKey: 'android',
  games: androidGames,
  chips: [
    { value: 'all', label: 'All' },
    { value: 'android', label: 'Android' },
    { value: 'homebrew', label: 'Homebrew' },
    { value: 'emulator-compatible', label: 'Emulator-compatible' },
  ],
});
