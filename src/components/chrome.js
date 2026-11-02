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
  { href: 'gaming-computers.html', key: 'pc', label: 'Gaming Computers' },
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
          <button class="link-button" type="button" data-open-legal>About the source links</button>
        </nav>
        <p class="muted footer-note">
          All game names, artwork and trademarks belong to their respective owners. Game Archieves is an
          informational catalogue and does not host game files. Corrections and takedown requests:
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
    <h2>Where the links here go</h2>
    <p>Each entry shows one link: the place the game actually comes from &mdash; its official store
      page, the developer's own site, or the project page of an open-source or homebrew title.
      Never a re-upload or a mirror, and Game Archieves hosts no game files itself.</p>
    <p>Where no such place could be confirmed you will see <strong>Source not verified</strong> and
      no link at all. The price shown is the one that source publishes; not every game here is free.</p>
    <p>For emulator entries the emulator application and the game are separate things. You must obtain
      any game files, BIOS, firmware or keys yourself from lawful sources &mdash; none are provided here.</p>
    <form method="dialog"><button class="btn btn-primary" type="submit">Close</button></form>`;
  document.body.append(dialog);

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-open-legal]')) dialog.showModal();
  });
}
