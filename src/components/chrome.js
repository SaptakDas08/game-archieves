// Shared navigation, footer and the "how download links work" dialog.

export const esc = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

const PAGES = [
  { href: 'index.html', key: 'home', label: 'Home' },
  { href: 'android.html', key: 'android', label: 'Android' },
  { href: 'emulators.html', key: 'emulator', label: 'Emulators' },
  { href: 'gaming-computers.html', key: 'pc', label: 'Personal Computer' },
];

export function renderChrome(activeKey) {
  const header = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');

  if (header) {
    header.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="nav">
        <a class="brand" href="index.html">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-text">GAME ARCHIEVES</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
          <span class="nav-toggle-bars" aria-hidden="true"></span>
          <span class="sr-only">Menu</span>
        </button>
        <nav id="primary-nav" class="nav-links" aria-label="Primary">
          ${PAGES.map(
            (page) =>
              `<a href="${page.href}"${page.key === activeKey ? ' aria-current="page"' : ''}>${esc(
                page.label,
              )}</a>`,
          ).join('')}
        </nav>
      </div>`;

    const toggle = header.querySelector('.nav-toggle');
    const links = header.querySelector('.nav-links');
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  if (footer) {
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-about">
          <p class="footer-brand">GAME ARCHIEVES</p>
          <p class="muted">Game details, system requirements, screenshots and trusted sources in one place.</p>
        </div>
        <nav class="footer-links" aria-label="Footer">
          ${PAGES.map((page) => `<a href="${page.href}">${esc(page.label)}</a>`).join('')}
          <button class="link-button" type="button" data-open-legal>About the downloads</button>
        </nav>
        <p class="muted footer-note">
          All game names, artwork and trademarks belong to their respective owners. Game Archieves is an
          informational catalogue: the only files it serves are the ones attached to an entry by its
          owner, never a re-upload of somebody else's game. Corrections and takedown requests:
          <span class="mono">contact@example.com</span> (placeholder).
          <br />&copy; ${new Date().getFullYear()} Game Archieves.
        </p>
      </div>`;
  }

  mountLegalDialog();
}

function mountLegalDialog() {
  const dialog = document.createElement('dialog');
  dialog.className = 'sheet legal-dialog';
  dialog.innerHTML = `
    <h2>About the downloads here</h2>
    <p>Game Archieves is a hand-written catalogue: titles, requirements, screenshots and prices.
      An entry offers a download only when a file has been attached to it, and that file is served
      from this site &mdash; it is never a re-upload of someone else's game, and no trackers,
      mirrors or ROM sites are listed here.</p>
    <p>Where nothing has been attached you will see <strong>No file has been attached to this entry
      yet</strong>. The price shown is the one the game's own publisher asks; not every game here
      is free.</p>
    <p>For emulator entries the emulator application and the game are separate things. You must obtain
      any game files, BIOS, firmware or keys yourself from lawful sources &mdash; none are provided here.</p>
    <form method="dialog"><button class="btn btn-primary" type="submit">Close</button></form>`;
  document.body.append(dialog);

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-open-legal]')) dialog.showModal();
  });
}
